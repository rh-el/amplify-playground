"use server"
export const getTracks = async() => {

    try {

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        
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