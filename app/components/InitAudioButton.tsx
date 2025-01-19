"use client"

import React from 'react'
import { useGlobalStates } from '../stateManager';

export default function InitAudioButton() {

    const globalStates = useGlobalStates()

    const initAudioContext = () => {
        if (!globalStates.audioContext) {
            globalStates.setAudioContext(new AudioContext());
        }
    };

    const buttonclasses = globalStates.audioContext ? "p-4 border-4 border-transparent text-primary" : 'p-4 border-4 font-bold border-primary rounded-xl text-primary hover:bg-primary/10'

  return (

        <button className={buttonclasses} onClick={initAudioContext}>{globalStates.audioContext ? "audio enabled" : "init audio"}</button>
  )
}
