import { initSource } from "../audio/sampleManagement";
import { useSampleStore } from "../stateManager";

// custom hook for audio management
export const useAudioManager = (audioContext: AudioContext | null) => {
    const { activeSource, setActiveSource } = useSampleStore();
    const sampleStore = useSampleStore()


    let currentSource: AudioBufferSourceNode | null = null
    
    const stopAudio = () => {
        if (activeSource) {

            try {
                activeSource.stop()
                setActiveSource(null)
            } catch (error) {
                console.error("error stopping audio:", error)
            }
        }
    };

    const playAudio = async (timeControl?: string, spatialPreset?: string) => {
        
        if (!audioContext) return
        
        // double check if audio is stopped in order to avoid triggering two sources at the same time
        stopAudio();

        if (currentSource) {
            currentSource.stop()
            currentSource = null
        }

        try {
            let appendName;   

            // string formatting logic in order to get sample associated with button combination
            switch (timeControl) {
                case "time-slowed":

                    if (spatialPreset === "spatial-one") appendName = "_pitchstretch_1_binaural.mp3"
                    if (spatialPreset === "spatial-three") appendName = "_pitchstretch_3_binaural.mp3"
                    if (spatialPreset === "spatial-five") appendName = "_pitchstretch_5_binaural.mp3"
                    break;
                
                case "time-normal":

                    if (spatialPreset === "spatial-one") appendName = "_1_binaural.mp3"
                    if (spatialPreset === "spatial-three") appendName = "_3_binaural.mp3"
                    if (spatialPreset === "spatial-five") appendName = "_5_binaural.mp3"
                    break;    
                
                default:
                    break;
            }

            const prependName = sampleStore.storedSamplesObjects[0].filename.split('.')[0]
            const fullName = `${prependName}${appendName}`
            const sampleToPlay = sampleStore.storedSamplesObjects.find((sampleObject) => {
                return sampleObject.filename === fullName
            })

            if (!sampleToPlay) throw new Error('sample not found!');

            // audio initilization
            const buffer = await initSource(audioContext, sampleToPlay.blob)
            const source = audioContext.createBufferSource()
            source.buffer = buffer
            source.connect(audioContext.destination)

            source.start()

            currentSource = source
            setActiveSource(source)

            source.onended = () => {
                stopAudio()
            }

        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    return { playAudio, stopAudio };
};