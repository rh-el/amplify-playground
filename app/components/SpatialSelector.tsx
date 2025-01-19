"use client"

import React from 'react'
import { useGlobalStates, useSampleStore } from '../stateManager'
import { useAudioManager } from '../hooks/useAudioManager'

export const SpatialSelector = () => {

    const sampleStore = useSampleStore()
    const { audioContext } = useGlobalStates()
    const { playAudio, stopAudio } = useAudioManager(audioContext)

    const handleChange = async (e) => {
        stopAudio()
        sampleStore.setSpatialPreset(e.target.id)
        await playAudio(sampleStore.timeControl, e.target.id)
    }

    return (
        <div className="flex gap-4 w-full justify-between">
            <label className="w-full cursor-pointer ">
                <input 
                    type="radio"
                    id="spatial-one"
                    name="spatial-selector"
                    className="hidden peer"
                    checked={sampleStore.spatialPreset === "spatial-one"}
                    onChange={handleChange} 
                />
                <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    1
                </div>
            </label>

            <label className="w-full cursor-pointer">
                <input 
                    type="radio"
                    id="spatial-three"
                    name="spatial-selector"
                    className="hidden peer"
                    checked={sampleStore.spatialPreset === "spatial-three"}
                    onChange={handleChange} 
                />
                <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    3
                </div>
            </label>

            <label className="w-full cursor-pointer">
                <input 
                    type="radio"
                    id="spatial-five"
                    name="spatial-selector"
                    className="hidden peer"
                    checked={sampleStore.spatialPreset === "spatial-five"}
                    onChange={handleChange} 
                />
                <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    5
                </div>
            </label>
        </div>
    )
}
