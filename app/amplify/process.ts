"use server"

const clientId = process.env.API_CLIENT_ID
const clientSecret = process.env.API_CLIENT_SECRET

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
        console.log("stereoToSpatial data: ",data)
        return data.id

    } catch (error) {
        console.error('error converting file with stereo to spatial module: ', error)
        throw error

    }
}

export async function getProcessingInfos(idToken: string, convertedFileId: string) {

    const moduleUrl = `https://api.ircamamplify.io/stereotospatial/${convertedFileId}`

    try {

        const response = await fetch(moduleUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            }
        })

        const data = await response.json()
        console.log("data in getProcessingInfos: ", data)
        return data.job_infos.job_status

    } catch (error) {
        console.error('error getting processing informations: ', error)
    }

}

export async function getProcessedId(idToken: string, jobId: string) {

    const moduleUrl = `https://api.ircamamplify.io/stereotospatial/${jobId}`

    try {

        const response = await fetch(moduleUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            },
        })

        const data = await response.json()
        console.log("data in getProcessedId: ", data)
        console.log("report: ", data.job_infos.report_info.report)
        // replace binauralFile by immersiveFile for wav
        return data.job_infos.report_info.report.binauralFile.id

    } catch (error) {
        console.error('error getting processed id: ', error)
        throw error
    }


}