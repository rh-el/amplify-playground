import { useCallback, useRef } from "react";
import { initSource, createLogarithmicCurve } from "../audio/sampleManagement";



export const useAudioManager = (
    audioContext: AudioContext | null,
) => {

    const globalFadeTime = 4

    // new map used for active sources storage
    const activeSources = useRef<Map<string, AudioBufferSourceNode>>(new Map());
    const activeGains = useRef<Map<string, GainNode>>(new Map());
    const fadingOut = useRef<Set<string>>(new Set());
    
    const stopAudio = useCallback((id: string) => {
        
        // get value (audioBuffer) of corresponding id
        const source = activeSources.current.get(id);
        const gainNode = activeGains.current.get(id)
        
        if (!source || !audioContext || !gainNode) return

        if (fadingOut.current.has(id)) return

        try {
            
            fadingOut.current.add(id);
            const currentGain = gainNode.gain.value

            gainNode.gain.cancelScheduledValues(audioContext.currentTime);
            gainNode.gain.setValueAtTime(currentGain, audioContext.currentTime);

            const fadeOutCurve = createLogarithmicCurve(-1, audioContext, currentGain);
            gainNode.gain.setValueCurveAtTime(
                fadeOutCurve, 
                audioContext.currentTime, 
                globalFadeTime
            );

            // Arrêter la source après le fade
            setTimeout(() => {
                try {

                    source.stop();

                } catch (error) {
                    console.error(error)
                }

                activeSources.current.delete(id);
                activeGains.current.delete(id);
                fadingOut.current.delete(id)

            }, globalFadeTime * 1000); // Convertir en millisecondes
            
            return

        } catch (error) {

            fadingOut.current.delete(id)
            console.error(`Error stoping audio for ${id}:`, error)

        }

    }, [audioContext]);


    const startAudio = useCallback(async (id: string) => {

        // if no context, or id's associated gain already to max level, return
        if (!audioContext || activeGains.current.get(id)?.gain.value === 1) return;

        // if audio is already playing, fade in to max level
        if (activeSources.current.has(id)) {
            
            const gainNode = activeGains.current.get(id)
            const currentGain = gainNode?.gain.value


            gainNode?.gain.cancelScheduledValues(audioContext.currentTime)
            const fadeInCurve = createLogarithmicCurve(1, audioContext, currentGain as number)
            gainNode?.gain.setValueCurveAtTime(fadeInCurve, audioContext.currentTime, globalFadeTime)
            return
            
        }
        console.log('start')
        
        
        // // get polygon associated with id
        // const polygon = drawedPolygons.find(p => p.id === id);

        // if (!polygon) return;
        
        try {
            
            // init audio, start playback, fade in audio
            const gainNode = audioContext.createGain()
            const source = await initSource(polygon.sample, gainNode, audioContext)
            const fadeInCurve = createLogarithmicCurve(1, audioContext, 0)

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            source.start(0);
            gainNode.gain.setValueCurveAtTime(fadeInCurve, audioContext.currentTime, globalFadeTime)
            
            // add source to sources map
            activeSources.current.set(id, source);
            activeGains.current.set(id, gainNode);

            // remove source from sources map once playback ended
            source.onended = () => {
                activeSources.current.delete(id);
            };

        } catch (error) {

            console.error(`Error playing audio for ${id}:`, error);

        }
    }, [ audioContext ]);

    return { startAudio, stopAudio };
};
