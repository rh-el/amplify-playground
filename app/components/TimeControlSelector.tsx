"use client"

import React from 'react'
import { useGlobalStates, useSampleStore } from '../stateManager'
import { useAudioManager } from '../hooks/useAudioManager'


export const TimeControlSelector = () => {

    const sampleStore = useSampleStore()
    const { audioContext } = useGlobalStates()
    const { playAudio, stopAudio } = useAudioManager(audioContext)

    // on button change: triggers corresponding sample
    const handleChange = async (e) => {
        stopAudio()
        sampleStore.setTimeControl(e.target.id)
        await playAudio(e.target.id, sampleStore.spatialPreset)
    }

    return (
        <div className="flex gap-4 w-full justify-between">
            <label className="w-full cursor-pointer ">
                <input 
                    type="radio"
                    id="time-slowed"
                    name="time-selector"
                    className="hidden peer"
                    checked={sampleStore.timeControl === "time-slowed"}
                    onChange={handleChange} 
                />
                <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    slowed
                </div>
            </label>

            <label className="w-full cursor-pointer">
                <input 
                    type="radio"
                    id="time-normal"
                    name="time-selector"
                    className="hidden peer"
                    checked={sampleStore.timeControl === "time-normal"}
                    onChange={handleChange} 
                />
                <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    normal
                </div>
            </label>
        </div>
    )
}
