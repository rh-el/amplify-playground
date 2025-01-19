"use client"

import React from 'react'
import { AllIasType, SampleObjectType, SampleType } from '../model'
import { useGlobalStates, useSampleStore } from '../stateManager'
import { getConvertedFile, getToken } from '../amplify/storage'
import { getAllIasFromSample } from '../lib/data'

// single function with Promise.all in order to get all IAS related to spatialize module faster
const processSpatialIas = async (
  idToken: string, 
  allIas: AllIasType, 
  addSampleObject: (sampleObject: SampleObjectType) => void, 
) => {

  try {

      const promises = allIas.spatialIas.map(async (element) => {
          const spatializedStretchedAudioData = await getConvertedFile(idToken, element.ias_spatial_url);
          addSampleObject({
              audiobuffer: null,
              filename: spatializedStretchedAudioData.fileName,
              blob: spatializedStretchedAudioData.blob
          });
      });

      await Promise.all(promises);


  } catch (error) {
      console.error("Erreur lors du traitement des spatialIas :", error);
  }
};


export const SampleListElement = ({ track }: { track: SampleType}) => {

  const { addSampleObject } = useSampleStore()
  const { setIsLoadingBuffer } = useGlobalStates()

  // triggers all get functions in order to get blobs of selected track
  const getBlobsFromStorage = async (trackId: number) => {
    
    setIsLoadingBuffer(true)

    const allIas: AllIasType = await getAllIasFromSample(trackId)
    const idToken = await getToken()            
    
    console.log("GETTING RAW FILE")
    const audioData = await getConvertedFile(idToken, allIas.sampleIas.sample_url)
    addSampleObject({
      audiobuffer: null,
      filename: audioData.fileName,
      blob: audioData.blob
    })


    console.log("STRETCHED FILE")
    const stretchedAudioData = await getConvertedFile(idToken, allIas.timeIas[0].ias_time_url)
    addSampleObject({
      audiobuffer: null,
      filename: stretchedAudioData.fileName,
      blob: stretchedAudioData.blob      
    })


    console.log("SPATIAL FILE")
    await processSpatialIas(idToken, allIas, addSampleObject)

    setIsLoadingBuffer(false)

  }

  return (
    <div className="flex justify-between items-center py-2 border-b border-white/20 w-full peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
      <label className="w-full cursor-pointer">
        <input 
            type="radio"
            id={String(track.id)}
            name="mode-selector"
            className="hidden peer"
            onClick={() => getBlobsFromStorage(track.id)}
        />
        <div className="flex text-center justify-center items-center ">
            {track.name}
        </div>
      </label>
    </div>
  )
}
