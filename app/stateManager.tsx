import { create } from 'zustand'
import { GlobalStateType, SampleObjectType, SampleStoreType } from './model'

export const useSampleStore = create<SampleStoreType>((set) => ({
    selectedMode: "catalogue-sample",
    setSelectedMode: (mode: string) => set(() => ({ selectedMode: mode })),
    storedSamplesObjects: [],
    addSampleObject: (sampleObject: SampleObjectType) => set((state) => ({ storedSamplesObjects: [...state.storedSamplesObjects, sampleObject] })),
    idToken: "",
    setIdToken: (idToken: string) => set(() => ({ idToken: idToken })),
    timeControl: "time-normal",
    setTimeControl: (control: string) => set(() => ({ timeControl: control})),
    spatialPreset: "spatial-one",
    setSpatialPreset: (preset: string) => set(() => ({ spatialPreset: preset })),
    activeSource: null,
    setActiveSource: (buffer: AudioBufferSourceNode | null) => set(() => ({ activeSource: buffer})),
    stopActiveSource: () => {
        set((state) => {
            if (state.activeSource) {
                try {
                    state.activeSource.stop();
                } catch (error) {
                    console.error('Error stopping active source:', error);
                }
            }
            return { activeSource: null };   
        })
    },
    selectedTrack: "",
    setSelectedTrack: (id: string) => set(() => ({ selectedTrack: id }))

}))

export const useGlobalStates = create<GlobalStateType>((set) => ({
    isProcessingSound: false,
    setIsProcessingSound: (bool: boolean) => set(() => ({ isProcessingSound: bool })),
    currentProcess: "",
    setCurrentProcess: (processName: string) => set(() => ({ currentProcess: processName })),
    audioContext: null,
    setAudioContext: (context: AudioContext | null) => set(() => ({ audioContext: context })),
    isLoadingBuffer: false,
    setIsLoadingBuffer: (bool: boolean) => set(() => ({ isLoadingBuffer: bool }))
}))