"use server"

import Image from "next/image";
import { Header } from "./components/Header";
import { getTracks } from "./lib/data";
import { SampleType } from "./model";
import { SampleListElement } from "./components/SampleListElement";
import { SampleSelector } from "./components/SampleSelector";


export default async function Main() {

  const tracksInfos: SampleType[] = await getTracks()

  return (
    <>
      <Header />
      <div className='h-full flex flex-col justify-center items-center gap-72'>
        <section id="home" className="h-svh box-border flex flex-col justify-center items-center gap-72 pt-[66px] ">
          <div className='text-[8em]'>
              <h1 className="font-dm-mono h-32">IRCAM Amplify</h1>
              <h2 className="font-ibm-plex pl-52 text-clip">Playground</h2>
          </div>
          <div className="">
            <a href='#sample' className="flex flex-col justify-center items-center gap-4">
              <span className="">discovery</span>
              
                  <Image
                      src="/arrow.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                  />
            </a>
          </div>
        </section>

          {/* ////////////////////////////////////////////// SAMPLE SELECTION //////////////////////////////////////////////*/}
        <section id="sample" className="h-svh flex flex-col items-center justify-center gap-16 w-6/12">
          <SampleSelector trackInfos={tracksInfos} />
        </section>

          {/* ////////////////////////////////////////////// PLAYGROUND //////////////////////////////////////////////*/}
        <section id="playground" className="h-svh flex flex-col items-center justify-center gap-16 w-8/12">
            <h2 className="text-center text-8xl">playground</h2>
            <div className="flex flex-col justify-center items-center gap-12 w-full px-8">
              <div className="flex flex-col justify-center items-center w-7/12 gap-8 ">
                <h3 className="text-5xl">pick a loop</h3>
                <div className="flex gap-4 w-full justify-between">
                  <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="loop-one"
                        name="loop-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        1
                    </div>
                  </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="loop-two"
                        name="loop-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        2
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="loop-three"
                        name="loop-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        3
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="loop-four"
                        name="loop-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        4
                    </div>
                </label>

              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-7/12 gap-8">
                <h3 className="text-5xl">time control</h3>
                <div className="flex gap-4 w-full justify-between">
                  <label className="w-full cursor-pointer ">
                    <input 
                        type="radio"
                        id="time-slowed"
                        name="time-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
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
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        normal
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="time-speeded"
                        name="time-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        speeded
                    </div>
                </label>

              </div>
            </div>

            <div className="flex flex-col justify-center w-7/12 items-center gap-8">
                <h3 className="text-5xl">stereo to spatial</h3>
                <div className="flex gap-4 w-full justify-between">
                  <label className="w-full cursor-pointer ">
                    <input 
                        type="radio"
                        id="spatial-one"
                        name="spatial-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        1
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="spatial-two"
                        name="spatial-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        2
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="spatial-three"
                        name="spatial-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        3
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="spatial-four"
                        name="spatial-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        4
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="spatial-five"
                        name="spatial-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        5
                    </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-center w-7/12 items-center gap-8">
                <h3 className="text-5xl">stem separator</h3>
                <div className="flex gap-4 w-full justify-between">
                  <label className="w-full cursor-pointer ">
                    <input 
                        type="radio"
                        id="stem-drums"
                        name="stem-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        drums
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="stem-bass"
                        name="stem-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        bass
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="stem-voals"
                        name="stem-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        vocals
                    </div>
                </label>

                <label className="w-full cursor-pointer">
                    <input 
                        type="radio"
                        id="stem-other"
                        name="stem-selector"
                        className="hidden peer"
                        // checked={areaStore.areaMode === "modulate"}
                        // onChange={() => areaStore.setAreaMode("modulate")} 
                    />
                    <div className="flex justify-center items-center py-6 text-2xl font-bold  border-4 border-primary rounded-2xl group peer-checked:bg-primary peer-checked:text-black duration-200 h-full hover:bg-primary/10">
                        other
                    </div>
                </label>
              </div>

              

            </div>

          </div>
        </section>
          
      </div>
    </>
)
}
