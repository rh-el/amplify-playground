export const createBuffer = async (url: string, context: AudioContext) => {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = await context.decodeAudioData(arrayBuffer)
    return buffer
}

export const linkBufferToSource = (audioBuffer: AudioBuffer, context: AudioContext) => {
    const source = context.createBufferSource()
    source.buffer = audioBuffer
    source.loop = true
    return source
}

export const initSource = async (url: string, gainNode: GainNode, context: AudioContext) => {
    const buffer = await createBuffer(url, context)
    const source = linkBufferToSource(buffer, context)
    source.connect(gainNode)
    gainNode.connect(context.destination)
    return source
}

export const createLogarithmicCurve = (direction: number, context: AudioContext, currentGain: number) => {
    const base =  10
    const sr = context.sampleRate
    const length =  sr
    const curve = new Float32Array(length)
    let percent = 0
    let index;

    for (let i = 0; i < length; i++) {

        // + for fade in, - for fade out
        index = direction > 0 ? i : length - 1 - i;
        percent = i / length;

        if (direction > 0) {

            curve[index] = currentGain + (1 - currentGain) * (Math.log(1 + base * percent) / Math.log(1 + base))

        } else {

            curve[index] = currentGain * (1 - (Math.log(1 + base * percent) / Math.log(1 + base)))

        }
    }

    return direction > 0 ? curve : curve.reverse();
}