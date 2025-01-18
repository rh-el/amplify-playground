import { create } from 'zustand'
import { SampleStoreType } from './model'

export const useSampleStore = create<SampleStoreType>((set) => ({
    selectedMode: "catalogue-sample",
    setSelectedMode: (mode: string) => set(() => ({ selectedMode: mode }))
    // center: INITIAL_CENTER,
    // setCenter: (lng: number, lat: number) => set(() => ({ center: [lng, lat]})),
    // zoom: INITIAL_ZOOM,
    // setZoom: (num: number) => set(() => ({ zoom: num })),
    // selectMode: false,
    // setSelectMode: (bool: boolean) => set(() => ({ selectMode: bool })),
    // selectedArea: null,
    // setSelectedArea: (arr: string[] | null) => set(() => ({ selectedArea: arr })),
    // sampleSelectionMode: false,
    // setSampleSelectionMode: (bool: boolean) => set(() => ({ sampleSelectionMode: bool })),
    // editMode: false,
    // setEditMode: (bool: boolean) => set(() => ({ editMode: bool })),
    // loadingPanel: false,
    // setLoadingPanel: (bool: boolean) => set(() => ({ loadingPanel: bool })),

    // audioContext: null,
    // setAudioContext: (context: AudioContext | null) => set(() => ({ audioContext: context }))
}))