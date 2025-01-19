"use client"

import React, { useRef } from 'react'
import { SampleType } from '../model'
import { SampleListElement } from './SampleListElement'
import { useGlobalStates, useSampleStore } from '../stateManager'
import { createStorage, getConvertedFile, getFileIas, getToken, uploadFileApi } from '../amplify/storage'
import { getProcessedId, getProcessingInfos, processLoopExtractor, processStereoToSpatial, processTimeControl } from '../amplify/process'
import { saveSampleInfos } from '../lib/data'
import { initSource } from '../audio/sampleManagement'


export const SampleSelector = ({ trackInfos }: { trackInfos: SampleType[] }) => {


  const sampleStore = useSampleStore()
  const globalStates = useGlobalStates()
  const inputFile = useRef< HTMLInputElement | null >(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files || event.target.files.length <= 0) return    
    globalStates.setIsProcessingSound(true)
    
        try {

            globalStates.setCurrentProcess("getting token, creating storage space")

            const idToken = await getToken()            
            const fileId = await createStorage(idToken)
            const sampleFile = event.target.files[0]
  
            ////////////////////////////////////////////////////////////////////////    UPLOAD FILE TO AMPLIFY STORAGE    ////////////////////////////////////////////////////////////////////////

            globalStates.setCurrentProcess("uploading sample to storage")

            await uploadFileApi(idToken, fileId, sampleFile)
            console.log(sampleFile)
            const fileIas = await getFileIas(idToken, fileId)
            const savedSampleData = await saveSampleInfos("sample", sampleFile.name, fileId)
            console.log('savedSampleData in supabase:', savedSampleData)

            const audioData = await getConvertedFile(idToken, fileIas)
            const audioBuffer = await initSource(globalStates.audioContext as AudioContext, audioData.blob) 
            sampleStore.addSampleObject({
              audiobuffer: audioBuffer, 
              filename: audioData.fileName
            })


            //////////////////////////////////////////////////////////////////////// EXTRACT LOOPS FROM FILE    ////////////////////////////////////////////////////////////////////////
            // const loopExtractorJobId = await processLoopExtractor(idToken, fileIas)
            // let loopExtractorProcessStatus = "processing"
            // while (!['success', 'error'].includes(loopExtractorProcessStatus)) {
            //   console.log("extracting loops...")
            //   loopExtractorProcessStatus = await getProcessingInfos(idToken, loopExtractorJobId, "loopextractor")
            //   await new Promise(resolve => setTimeout(resolve, 5000))
            // }

            // const loopExtractorProcessedId = await getProcessedId(idToken, loopExtractorJobId, "loopextractor")
            // const convertedLoopData = JSON.stringify(loopExtractorProcessedId)
            // const savedLoopExtractorData = await saveSampleInfos("loop", "1", convertedLoopData, savedSampleData.savedInfos.id)
            // console.log('savedLoopExtractorData in supabase:', savedLoopExtractorData)


            ////////////////////////////////////////////////////////////////////////    STRECH FILE   ////////////////////////////////////////////////////////////////////////

            // SOUND STRETCHER
            globalStates.setCurrentProcess("stretching sound")

            const slowedTimeControlJobId = await processTimeControl(idToken, fileIas, 0.8)
            let slowedTimeControlProcessStatus = "processing"
            while (!['success', 'error'].includes(slowedTimeControlProcessStatus)) {
              console.log("stretching sounds...")
              slowedTimeControlProcessStatus = await getProcessingInfos(idToken, slowedTimeControlJobId, "timepitchcontrol")
              await new Promise(resolve => setTimeout(resolve, 5000))
            }

            const slowedTimeControlProcessedId = await getProcessedId(idToken, slowedTimeControlJobId, "timepitchcontrol")
            const savedSlowedTimeControlData = await saveSampleInfos("timecontrol", "0.2", slowedTimeControlProcessedId, savedSampleData.savedInfos.id)
            console.log("savedTimeControlData in supabase:", savedSlowedTimeControlData)

            const stretchedAudioData = await getConvertedFile(idToken, slowedTimeControlProcessedId)
            const stretchedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, stretchedAudioData.blob)  
            sampleStore.addSampleObject({
              audiobuffer: stretchedAudioBuffer, 
              filename: stretchedAudioData.fileName
            })



            ////////////////////////////////////////////////////////////////////////    SPATIALIZE FILE   ////////////////////////////////////////////////////////////////////////

            // // PROCESS 3 SPATIAL API PRESETS FROM SLOWED AND DRY SOUND
            let j = 1 // preset number
            // LOOP FOR SLOWED SOUND
            for (let i = 0; i < 3; i++) {
              globalStates.setCurrentProcess(`spatializing stretched sound, preset ${i+1}/3...`)

              const spatializedJobId = await processStereoToSpatial(idToken, slowedTimeControlProcessedId, j)
              let spatialProcessStatus = 'processing'
              while (!['success', 'error'].includes(spatialProcessStatus)) {
                  console.log(`spatializing stretched sound, preset ${i+1}/3...`)
                  spatialProcessStatus = await getProcessingInfos(idToken, spatializedJobId, "stereotospatial")
                  await new Promise(resolve => setTimeout(resolve, 5000))
              }

              const spatialProcessedId = await getProcessedId(idToken, spatializedJobId, "stereotospatial")
              const savedSpatializedData = await saveSampleInfos("stereotospatial", j, spatialProcessedId, savedSlowedTimeControlData.savedInfos.id)
              console.log("savedSpatializedData in supabase:", savedSpatializedData)

              const spatializedStretchedAudioData = await getConvertedFile(idToken, spatialProcessedId)
              const spatializedStretchedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, spatializedStretchedAudioData.blob) 
              
              sampleStore.addSampleObject({
                audiobuffer: spatializedStretchedAudioBuffer, 
                filename: spatializedStretchedAudioData.fileName
              })


              j += 2
            }


            j = 1
            // LOOP FOR DRY SOUND
            for (let i = 0; i < 3; i++) {
              globalStates.setCurrentProcess(`spatializing dry sound, preset ${i+1}/3...`)

              const spatializedJobId = await processStereoToSpatial(idToken, fileIas, j)
              let spatialProcessStatus = 'processing'
              while (!['success', 'error'].includes(spatialProcessStatus)) {
                  console.log(`spatializing dry sound, preset ${i+1}/3...`)
                  spatialProcessStatus = await getProcessingInfos(idToken, spatializedJobId, "stereotospatial")
                  await new Promise(resolve => setTimeout(resolve, 5000))
              }              

              const spatialProcessedId = await getProcessedId(idToken, spatializedJobId, "stereotospatial")
              const savedSpatializedData = await saveSampleInfos("stereotospatial", j, spatialProcessedId, savedSlowedTimeControlData.savedInfos.id)
              console.log("savedSpatializedData in supabase:", savedSpatializedData)

              const spatializedDryAudioData = await getConvertedFile(idToken, spatialProcessedId)
              const spatializedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, spatializedDryAudioData.blob) 

              sampleStore.addSampleObject({
                audiobuffer: spatializedAudioBuffer, 
                filename: spatializedDryAudioData.fileName
              })

              j += 2
            }


            ////////////////////////////////////////////////////////////////////////    SEPARATE STEMS   ////////////////////////////////////////////////////////////////////////



            ////////////////////////////////////////////////////////////////////////    GET BLOBS AND LOAD SAMPLERS   ////////////////////////////////////////////////////////////////////////

            // get all blobs from amplify storage
            // load buffers with blobs 
            // store blobs in statemanager?

            // const { blob, fileInfo, fileName } = await getConvertedFile(idToken, processedId)


            
            // console.log(fileName)
            // console.log(blob)

            // sampleStore.addSampleObject({
            //   blob: blob,
            //   filename: filename
            // })

            // console.log (savedData)

            // TODO ! send processed file to supabase
  
  
        } catch (error) {
            console.error(error)
        }
   
  
  
        
        
          // console.log(areaStore.areaMode)
        
          // const sampleFile = event.target.files[0]
          // const dataFromUpload = await handleSampleUpload(sampleFile)
          // console.log("dataFromUpload: ", dataFromUpload)
        
          // const basePath = "https://vznsbqlgpwpyuoopgvsf.supabase.co/storage/v1/object/public/"
          // const fullPath = `${basePath}${dataFromUpload.data.fullPath}`
        
          // const selectedPoly = compositionStore.drawedPolygons.filter(element => element.id === areaStore.selectedArea)
          // selectedPoly[0].sample = fullPath
          // const newPolyList = compositionStore.drawedPolygons.filter(element => element.id !== areaStore.selectedArea) 
          // newPolyList.push(selectedPoly[0])
          // compositionStore.setDrawedPolygons(newPolyList)
              
        
          // event.target.files = null
    }

  return (
    <>
    <h2 className="text-center text-8xl">loop extractor</h2>
          <div className="border-4 border-primary rounded-3xl overflow-hidden w-full">
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
              </label>
          
            </div>
          {sampleStore.selectedMode === "catalogue-sample" &&
            <div className="px-4">
              {trackInfos?.map((track, index) => (
                <SampleListElement track={track} key={index} />
              ))}
            </div>
          }
          </div>

          {sampleStore.selectedMode === "user-sample" && globalStates.isProcessingSound === false &&
          <label htmlFor="file" className='cursor-pointer border-4 border-primary px-12 py-6 rounded-full hover:bg-primary/10'>select a file
            <input type="file" id="file" ref={inputFile} className='hidden' onChange={handleFileChange} />
          </label>
          }

          {globalStates.isProcessingSound &&
            <div>
              {globalStates.currentProcess}
            </div>
          }

          {globalStates.isLoadingBuffer &&
          <div>
            loading buffers...
          </div>
          }

          <div className="text-center mt-6">
            <a href="#playground" className="border-4 border-primary rounded-full px-12 py-6 hover:bg-primary/10">
              go to playground
            </a>
          </div>
          </>
  )
}
