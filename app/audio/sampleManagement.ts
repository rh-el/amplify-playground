export const initSource = async (ctx: AudioContext, blob: Blob) => {

    try {
        const arrayBuffer = await blob.arrayBuffer()
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
        return audioBuffer

    } catch (error) {
        console.error("error deconding audio data:", error)
        throw error
    }
}


// export const createLogarithmicCurve = (direction: number, context: AudioContext, currentGain: number) => {
//     const base =  10
//     const sr = context.sampleRate
//     const length =  sr
//     const curve = new Float32Array(length)
//     let percent = 0
//     let index;

//     for (let i = 0; i < length; i++) {

//         // + for fade in, - for fade out
//         index = direction > 0 ? i : length - 1 - i;
//         percent = i / length;

//         if (direction > 0) {

//             curve[index] = currentGain + (1 - currentGain) * (Math.log(1 + base * percent) / Math.log(1 + base))

//         } else {

//             curve[index] = currentGain * (1 - (Math.log(1 + base * percent) / Math.log(1 + base)))

//         }
//     }

//     return direction > 0 ? curve : curve.reverse();
// }