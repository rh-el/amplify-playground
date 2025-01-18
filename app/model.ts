

export interface SampleStoreType {
    selectedMode: string;
    setSelectedMode: (mode: string) => void
    storedSamplesObjects: SampleObjectType[]
    addSampleObject: (sampleObject: SampleObjectType) => void
}

export interface SampleType {
    id: number,
    name: string,
    samle_url: string,
    updated_at: Date,
    created_at: Date
}

export interface SampleObjectType {
    blob: Blob,
    filename: string
}