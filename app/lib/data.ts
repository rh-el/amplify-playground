"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const getTracks = async() => {

    try {

        
        const response = await fetch(`${baseUrl}/api/get-tracks`, {
            headers: {}
        })
        const allTracksData = await response.json()
        return allTracksData.allTracks

    } catch (error) {
        console.error('error getting all tracks:', error)
        throw error
    }
}

export const saveSampleInfos = async(table: string, param: string, url: string, foreignId?: number) => {

    let requestBody, response, savedData
    switch (table) {

        case "sample":

            requestBody = JSON.stringify({
                name: param,
                sample_url: url
            })

            response = await fetch(`${baseUrl}/api/save-sample-infos`, {
                method: "POST",
                headers: {},
                body: requestBody
            })

            savedData = await response.json()
            return savedData

        case "loop":

            requestBody = JSON.stringify({
            loop_number: Number(param),
            sample_id: foreignId,
            ias_loop_url: url
            })

            response = await fetch(`${baseUrl}/api/save-loop-infos`, {
                method: "POST",
                headers: {},
                body: requestBody
            })

            savedData = await response.json()
            return savedData
        
        case "timecontrol":

            requestBody = JSON.stringify({
            time_speed: Number(param),
            loop_id: foreignId,
            ias_time_url: url
            })

            response = await fetch(`${baseUrl}/api/save-time-infos`, {
                method: "POST",
                headers: {},
                body: requestBody
            })

            savedData = await response.json()
            return savedData
        
        case "spatial":

            requestBody = JSON.stringify({
            spatial_preset: Number(param),
            time_id: foreignId,
            ias_spatial_url: url
            })

            response = await fetch(`${baseUrl}/api/save-spatial-infos`, {
                method: "POST",
                headers: {},
                body: requestBody
            })

            savedData = await response.json()
            return savedData

        case "stem":

            requestBody = JSON.stringify({
            stem_instrument: Number(param),
            spatial_id: foreignId,
            ias_stem_url: url
            })

            response = await fetch(`${baseUrl}/api/save-stem-infos`, {
                method: "POST",
                headers: {},
                body: requestBody
            })

            savedData = await response.json()
            return savedData

        default:
            break;
    }


}