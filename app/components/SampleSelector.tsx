"use client"

import React, { useRef } from 'react'
import { SampleType } from '../model'
import { SampleListElement } from './SampleListElement'
import { useGlobalStates, useSampleStore } from '../stateManager'
import { createStorage, getConvertedFile, getFileIas, getToken, uploadFileApi } from '../amplify/storage'
import { getProcessedId, getProcessingInfos, processStereoToSpatial, processTimeControl } from '../amplify/process'
import { saveSampleInfos } from '../lib/data'
import { Circles } from 'react-loader-spinner'


export const SampleSelector = ({ trackInfos }: { trackInfos: SampleType[] }) => {

    const sampleStore = useSampleStore()
    const globalStates = useGlobalStates()
    const inputFile = useRef< HTMLInputElement | null >(null)

    // triggers the process chain when user selects a local file
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
              const fileIas = await getFileIas(idToken, fileId)
              const savedSampleData = await saveSampleInfos("sample", sampleFile.name, fileId)
              const audioData = await getConvertedFile(idToken, fileIas)

              sampleStore.addSampleObject({
                audiobuffer: null, 
                filename: audioData.fileName,
                blob: audioData.blob
              })


              //////////////////////////////////////////////////////////////////////// EXTRACT LOOPS FROM FILE    ////////////////////////////////////////////////////////////////////////
              // const loopExtractorJobId = await processLoopExtractor(idToken, fileIas)
              // let loopExtractorProcessStatus = "processing"
              // while (!['success', 'error'].includes(loopExtractorProcessStatus)) {
              //   loopExtractorProcessStatus = await getProcessingInfos(idToken, loopExtractorJobId, "loopextractor")
              //   await new Promise(resolve => setTimeout(resolve, 5000))
              // }

              // const loopExtractorProcessedId = await getProcessedId(idToken, loopExtractorJobId, "loopextractor")
              // const convertedLoopData = JSON.stringify(loopExtractorProcessedId)
              // const savedLoopExtractorData = await saveSampleInfos("loop", "1", convertedLoopData, savedSampleData.savedInfos.id)


              ////////////////////////////////////////////////////////////////////////    STRECH FILE   ////////////////////////////////////////////////////////////////////////
              // SOUND STRETCHER - stretch raw audio file

              globalStates.setCurrentProcess("stretching sound")

              // last argument influences strech amount
              const slowedTimeControlJobId = await processTimeControl(idToken, fileIas, 0.7)
              let slowedTimeControlProcessStatus = "processing"
              while (!['success', 'error'].includes(slowedTimeControlProcessStatus)) {
                console.log("stretching sounds...")
                slowedTimeControlProcessStatus = await getProcessingInfos(idToken, slowedTimeControlJobId, "timepitchcontrol")
                await new Promise(resolve => setTimeout(resolve, 5000))
              }

              const [ slowedTimeControlProcessedId, slowedTimeControlProcessedIas] = await getProcessedId(idToken, slowedTimeControlJobId, "timepitchcontrol")
              const savedSlowedTimeControlData = await saveSampleInfos("timecontrol", "0.5", slowedTimeControlProcessedId, savedSampleData.savedInfos.id)

              const stretchedAudioData = await getConvertedFile(idToken, slowedTimeControlProcessedId)
              sampleStore.addSampleObject({
                audiobuffer: null, 
                filename: stretchedAudioData.fileName,
                blob: stretchedAudioData.blob
              })



              ////////////////////////////////////////////////////////////////////////    SPATIALIZE FILE   ////////////////////////////////////////////////////////////////////////
              // SPATIALIZER - spatialize stretched and raw audio file using presets 1, 3, 5

              // LOOP FOR SLOWED SOUND
              let j = 1 // preset number
              for (let i = 0; i < 3; i++) {
                globalStates.setCurrentProcess(`spatializing stretched sound, preset ${i+1}/3...`)

                const spatializedJobId = await processStereoToSpatial(idToken, slowedTimeControlProcessedIas, j)
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
                // const spatializedStretchedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, spatializedStretchedAudioData.blob) 
                
                sampleStore.addSampleObject({
                  audiobuffer: null, 
                  filename: spatializedStretchedAudioData.fileName,
                  blob: spatializedStretchedAudioData.blob
                })

                j += 2
              }


              // LOOP FOR DRY SOUND
              j = 1
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
                // const spatializedAudioBuffer = await initSource(globalStates.audioContext as AudioContext, spatializedDryAudioData.blob) 

                sampleStore.addSampleObject({
                  audiobuffer: null, 
                  filename: spatializedDryAudioData.fileName,
                  blob: spatializedDryAudioData.blob
                })

                j += 2
              }
    
            globalStates.setIsProcessingSound(false)

          } catch (error) {
              console.error(error)
          }
    
      }

    return (
      <>
      <h2 className="text-center text-8xl">track selection</h2>
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
              <div className='group'>
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

            <div className='h-20'>
              {globalStates.isLoadingBuffer &&
                <Circles
                height="80"
                width="80"
                color="#E2FDE6"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
              }
            </div>

            <div className="text-center mt-6">
              <a href="#playground" className="border-4 border-primary rounded-full px-12 py-6 hover:bg-primary/10">
                go to playground
              </a>
            </div>
            </>
    )
}
