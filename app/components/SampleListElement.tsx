"use client"

import React from 'react'
import { AllIasType, SampleType } from '../model'
import { useGlobalStates, useSampleStore } from '../stateManager'
import { getConvertedFile, getToken } from '../amplify/storage'
import { getAllIasFromSample } from '../lib/data'
import { initSource, playAudioBuffer } from '../audio/sampleManagement'

export const SampleListElement = ({ track }: { track: SampleType}) => {

  const { addSampleObject, storedSamplesObjects } = useSampleStore()
  const { isLoadingBuffer, setIsLoadingBuffer } = useGlobalStates()

  const globalStates = useGlobalStates()

  const getBlobsFromStorage = async (trackId: number) => {

    setIsLoadingBuffer(true)

    const allIas: AllIasType = await getAllIasFromSample(trackId)
    const idToken = await getToken()            
    
    console.log("GETTING RAW FILE")
    const audioData = await getConvertedFile(idToken, allIas.sampleIas.sample_url)
    const audioBuffer = await initSource(globalStates.audioContext as AudioContext, audioData.blob) 
    addSampleObject({
      audiobuffer: audioBuffer,
      filename: audioData.fileName
    })


    console.log("STRETCHED FILE")
    const stretchedAudioData = await getConvertedFile(idToken, allIas.timeIas[0].ias_time_url)
    const stretchedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, stretchedAudioData.blob) 
    addSampleObject({
      audiobuffer: stretchedAudioBuffer, 
      filename: stretchedAudioData.fileName
    })


    console.log("SPATIAL FILE")
    allIas.spatialIas.map(async (element) => {
      const spatializedStretchedAudioData = await getConvertedFile(idToken, element.ias_spatial_url)
      const spatializedStretchedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, spatializedStretchedAudioData.blob) 
      addSampleObject({
        audiobuffer: spatializedStretchedAudioBuffer, 
        filename: spatializedStretchedAudioData.fileName
      })
    })


    console.log("storedSampleobjects:", useSampleStore.getState().storedSamplesObjects)   

  }

  return (
    <div className="flex justify-between items-center py-2 border-b border-white/20 w-full">
      <label className="w-full cursor-pointer">
        <input 
            type="radio"
            id="user-sample"
            name="mode-selector"
            className="hidden peer"
            // checked={areaStore.areaMode === "modulate"}
            // onChange={() => areaStore.setAreaMode("modulate")} 
            onClick={() => getBlobsFromStorage(track.id)}
        />
        <div className="flex justify-center items-center group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
            {track.name}
        </div>
      </label>
      <button className="text-xl">▷</button>
    </div>
  )
}
