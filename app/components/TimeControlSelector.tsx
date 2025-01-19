"use client"

import React from 'react'
import { useSampleStore } from '../stateManager'

export const TimeControlSelector = () => {

    const sampleStore = useSampleStore()

    return (
        <div className="flex gap-4 w-full justify-between">
            <label className="w-full cursor-pointer ">
                <input 
                    type="radio"
                    id="time-slowed"
                    name="time-selector"
                    className="hidden peer"
                    checked={sampleStore.timeControl === "time-slowed"}
                    onChange={(e) => sampleStore.setTimeControl(e.target.id)} 
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
                    onChange={(e) => sampleStore.setTimeControl(e.target.id)} 
                />
                <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    normal
                </div>
            </label>
        </div>
    )
}
