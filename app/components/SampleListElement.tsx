import React from 'react'
import { SampleType } from '../model'

export const SampleListElement = ({ track }: { track: SampleType}) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/20">
      <label className="w-full cursor-pointer">
        <input 
            type="radio"
            id="user-sample"
            name="mode-selector"
            className="hidden peer"
            // checked={areaStore.areaMode === "modulate"}
            // onChange={() => areaStore.setAreaMode("modulate")} 
        />
        <div className="flex justify-center items-center group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
            a sample
        </div>
      </label>
      <button className="text-xl">▷</button>
    </div>
  )
}
