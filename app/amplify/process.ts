"use server"

// fetch timepitchcontrol endpoint
export async function processTimeControl(idToken: string, fileIas: string, speedFactor: number) {

    const moduleUrl = "https://api.ircamamplify.io/timepitchcontrol/"

    const requestBody = JSON.stringify({
        audioUrl: fileIas,
        speedFactor: speedFactor
    })

    try {

        const response = await fetch(moduleUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            },
            body: requestBody
        })

        const data = await response.json()
        return data.id

    } catch (error) {
        console.error('error extracting loop with loop extractor module: ', error)
        throw error

    }
}


// fetch stereotospatial endpoint
export async function processStereoToSpatial(idToken: string, fileIas: string, presetId: number) {

    const moduleUrl = "https://api.ircamamplify.io/stereotospatial/"

    const requestBody = JSON.stringify({
        audioUrl: fileIas,
        presetId: presetId
    })

    try {

        const response = await fetch(moduleUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            },
            body: requestBody
        })

        const data = await response.json()
        return data.id

    } catch (error) {
        console.error('error converting file with stereo to spatial module: ', error)
        throw error

    }
}

// get status of current processing
export async function getProcessingInfos(idToken: string, convertedFileId: string, module: string) {

    const moduleUrl = `https://api.ircamamplify.io/${module}/${convertedFileId}`

    try {

        const response = await fetch(moduleUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            }
        })

        const data = await response.json()
        return data.job_infos.job_status

    } catch (error) {
        console.error('error getting processing informations: ', error)
    }

}

// get id / ias from a process
export async function getProcessedId(idToken: string, jobId: string, module: string) {

    const moduleUrl = `https://api.ircamamplify.io/${module}/${jobId}`

    try {

        const response = await fetch(moduleUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            },
        })

        const data = await response.json()

        // if (module === "loopextractor") return data.job_infos.report_info.report.loops
        if (module === "timepitchcontrol") return [ data.job_infos.report_info.report.outputFile.id, data.job_infos.report_info.report.outputFile.ias]

        // replace binauralFile by immersiveFile for wav
        if (module === "stereotospatial") return data.job_infos.report_info.report.binauralFile.id

    } catch (error) {
        console.error('error getting processed id: ', error)
        throw error
    }

}


// export async function processLoopExtractor(idToken: string, fileIas: string) {

//     const moduleUrl = "https://api.ircamamplify.io/loopextractor/"

//     const requestBody = JSON.stringify({
//         audioUrl: fileIas
//     })

//     try {

//         const response = await fetch(moduleUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json', 
//                 'Authorization': `Bearer ${idToken}`
//             },
//             body: requestBody
//         })

//         const data = await response.json()
//         console.log("loop extractor data: ",data)
//         return data.id

//     } catch (error) {
//         console.error('error extracting loop with loop extractor module: ', error)
//         throw error

//     }
// }