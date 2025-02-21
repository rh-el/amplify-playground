import { Sample, Spatial, Time } from "@prisma/client";


export interface SampleStoreType {
    selectedMode: string;
    setSelectedMode: (mode: string) => void
    storedSamplesObjects: SampleObjectType[]
    addSampleObject: (sampleObject: SampleObjectType) => void
    idToken: string
    setIdToken: (idToken: string) => void;
    timeControl: string
    setTimeControl: (control: string) => void;
    spatialPreset: string;
    setSpatialPreset: (preset: string) => void
    activeSource: AudioBufferSourceNode | null;
    setActiveSource: (buffer: AudioBufferSourceNode | null) => void;
    stopActiveSource: () => void;
    selectedTrack: string
    setSelectedTrack: (id: string) => void
    
}

export interface SampleType {
    id: number,
    name: string,
    sample_url: string,
    updated_at: Date,
    created_at: Date
}

export interface SampleObjectType {
    audiobuffer: AudioBuffer | null,
    filename: string,
    blob: Blob
}

export interface GlobalStateType {
    isProcessingSound: boolean;
    setIsProcessingSound: (bool: boolean) => void
    currentProcess: string
    setCurrentProcess: (processName: string) => void
    audioContext: AudioContext | null
    setAudioContext: (context: AudioContext | null) => void;
    isLoadingBuffer: boolean
    setIsLoadingBuffer: (bool: boolean) => void
}

export interface AllIasType {
    sampleIas: Sample;
    timeIas: Time[]
    spatialIas: Spatial[]
}