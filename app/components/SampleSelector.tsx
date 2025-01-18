"use client"

import React, { useRef } from 'react'
import { SampleType } from '../model'
import { SampleListElement } from './SampleListElement'
import { useSampleStore } from '../stateManager'


export const SampleSelector = ({ trackInfos }: { trackInfos: SampleType[] }) => {

  const sampleStore = useSampleStore()
  const inputFile = useRef< HTMLInputElement | null >(null)

  

  return (
    <>
    <h2 className="text-center text-8xl">loop extractor</h2>
          <div className="border border-white rounded-3xl overflow-hidden w-full">
            <div className="flex h-16">
              <label className="w-full cursor-pointer">
                <input 
                    type="radio"
                    id="catalogue-sample"
                    name="mode-selector"
                    className="hidden peer"

                    checked={sampleStore.selectedMode === "catalogue-sample"}
                    onChange={(e) => sampleStore.setSelectedMode(e.target.id)} 
                />
                <div className="flex justify-center items-center text-center group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    select from your catalogue
                </div>
              </label>
              <label className="w-full cursor-pointer">
                <input 
                    type="radio"
                    id="user-sample"
                    name="mode-selector"
                    className="hidden peer"
                    
                    checked={sampleStore.selectedMode === "user-sample"}
                    onChange={(e) => sampleStore.setSelectedMode(e.target.id)} 
                />
                <div className="flex justify-center items-center group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                    use my own sample
                </div>
                {}

              </label>
          
            </div>
          </div>
          {sampleStore.selectedMode === "catalogue-sample" &&
            <div className="px-4">
              {trackInfos?.map((track, index) => (
                <SampleListElement track={track} key={index} />
              ))}
            </div>
          }

          {sampleStore.selectedMode === "user-sample" &&
            <div className="px-4">
              {trackInfos?.map((track, index) => (
                <SampleListElement track={track} key={index} />
              ))}
            </div>
          }
            <input type="file" id="file" ref={inputFile} className='hidden' />

          <div className="text-center mt-6">
            <a href="#playground" className="border border-white rounded-full px-12 py-6 hover:bg-primary/10">
              Go to playground
            </a>
          </div>
          </>
  )
}
