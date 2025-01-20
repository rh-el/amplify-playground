"use server"

import Image from "next/image";
import { Header } from "./components/Header";
import { getTracks } from "./lib/data";
import { SampleSelector } from "./components/SampleSelector";
import InitAudioButton from "./components/InitAudioButton";
import { TimeControlSelector } from "./components/TimeControlSelector";
import { SpatialSelector } from "./components/SpatialSelector";


export default async function Main() {

    // fetch tracks in catalogue - already processed tracks
    const tracksInfos = await getTracks()

    return (
        <>
        <Header />
        <div className='h-full flex flex-col justify-center items-center gap-72'>
            <section id="home" className="h-svh box-border flex flex-col justify-center items-center gap-20 pt-[66px] ">
                <div className='text-[8em]'>
                    <h1 className="font-dm-mono h-32">IRCAM Amplify</h1>
                    <h2 className="font-ibm-plex pl-52 text-clip">Playground</h2>
                </div>
                <div className="flex flex-col gap-4">
                    <InitAudioButton />
                    <a href='#sample' className="flex flex-col justify-center items-center gap-4">
                    <span className="">discovery</span>
                    
                        <Image
                            src="/arrow.svg"
                            width={16}
                            height={16}
                            alt="an arrow icon"
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

                    <div className="flex flex-col justify-center items-center w-7/12 gap-8">
                        <h3 className="text-5xl">time control</h3>
                        <TimeControlSelector />
                    </div>

                    <div className="flex flex-col justify-center w-7/12 items-center gap-8">
                        <h3 className="text-5xl text-center">stereo to spatial</h3>
                        <SpatialSelector />
                    </div>
                </div>
            </section>
            
        </div>
        </>
)
}
