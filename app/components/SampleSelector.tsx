"use client"

import React, { useRef } from 'react'
import { SampleType } from '../model'
import { SampleListElement } from './SampleListElement'
import { useSampleStore } from '../stateManager'
import { createStorage, getConvertedFile, getFileIas, getToken, uploadFileApi } from '../amplify/storage'
import { getProcessedId, getProcessingInfos, processLoopExtractor, processStereoToSpatial, processTimeControl } from '../amplify/process'
import { saveSampleInfos } from '../lib/data'


export const SampleSelector = ({ trackInfos }: { trackInfos: SampleType[] }) => {

  const sampleStore = useSampleStore()
  const inputFile = useRef< HTMLInputElement | null >(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files || event.target.files.length <= 0) return    
  
        try {
  
            const idToken = await getToken()
            const fileId = await createStorage(idToken)
            const sampleFile = event.target.files[0]


  
            ////////////////////////////////////////////////////////////////////////    UPLOAD FILE TO AMPLIFY STORAGE
            await uploadFileApi(idToken, fileId, sampleFile)
            console.log(sampleFile)
            const fileIas = await getFileIas(idToken, fileId)
            const savedSampleData = await saveSampleInfos("sample", sampleFile.name, fileIas)
            console.log('savedSampleData in supabase:', savedSampleData)



            //////////////////////////////////////////////////////////////////////// EXTRACT LOOPS FROM FILE
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


            ////////////////////////////////////////////////////////////////////////    STRECH FILE
            // atm - timecontrol takes dry sample IAS
            // replace fileIas by extracted loops ias for complete fx chain
            const timeControlJobId = await processTimeControl(idToken, fileIas, 0.2)
            let timeControlProcessStatus = "processing"
            while (!['success', 'error'].includes(timeControlProcessStatus)) {
              console.log("stretching sounds...")
              timeControlProcessStatus = await getProcessingInfos(idToken, timeControlJobId, "timepitchcontrol")
              await new Promise(resolve => setTimeout(resolve, 5000))
            }

            const timeControlProcessedId = await getProcessedId(idToken, timeControlJobId, "timepitchcontrol")
            const savedTimeControlData = await saveSampleInfos("timecontrol", "0.2", timeControlProcessedId, savedSampleData.savedInfos.id)
            console.log("savedTimeControlData in supabase:", savedTimeControlData)


            ////////////////////////////////////////////////////////////////////////    SPATIALIZE FILE



            // const jobId = await processStereoToSpatial(idToken, fileIas, 5)
  
            // let processStatus = 'processing'
            // while (!['success', 'error'].includes(processStatus)) {
            //     console.log("processing audio...")
            //     processStatus = await getProcessingInfos(idToken, jobId)
            //     await new Promise(resolve => setTimeout(resolve, 5000))
  
            // }
  



            
            // const processedId = await getProcessedId(idToken, jobId)
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
          <label htmlFor="file" className='cursor-pointer border-4 border-primary px-12 py-6 rounded-full hover:bg-primary/10'>select a file
            <input type="file" id="file" ref={inputFile} className='hidden' onChange={handleFileChange} />
          </label>
          }

          <div className="text-center mt-6">
            <a href="#playground" className="border-4 border-primary rounded-full px-12 py-6 hover:bg-primary/10">
              go to playground
            </a>
          </div>
          </>
  )
}
