"use server"

const clientId = process.env.API_CLIENT_ID
const clientSecret = process.env.API_CLIENT_SECRET

export async function getToken() {

    const authUrl = "https://api.ircamamplify.io/oauth/token"

    const requestBody = JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials"
    })
    
    try {
        const response = await fetch(authUrl, {
            method: "POST",
            body: requestBody
        })
    
        const data = await response.json()
        const idToken = data["id_token"]
    
        return idToken

    } catch (error) {
        console.error("error getting token id from ircam api: ", error)
        throw error
    }

}

export async function createStorage(idToken: string) {

    const managerUrl = "https://storage.ircamamplify.io/manager/"

    try {
        const response = await fetch(managerUrl, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            }
        })
    
        const data = await response.json()
        const fileId = data.id
    
        return fileId

    } catch (error) {

        console.error('error creating storage on ircam api: ', error)
        throw error
    }

}

export async function uploadFileApi(idToken: string, fileId: string, file) {

    const storageUrl = "https://storage.ircamamplify.io"
    const fileName = file.name
    const putUrl = `${storageUrl}/${fileId}/${fileName}`

    try {

        await fetch(putUrl, {
            method: "PUT",
            body: file,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            }
        })

    } catch (error) {

        console.error('error uploading file on ircam api: ', error)
        throw error

    }

}

export async function getFileIas(idToken: string, fileId: string) {

    const managerUrl = "https://storage.ircamamplify.io/manager/"

    try {

        const reponse = await fetch(`${managerUrl}${fileId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            }
        }) 

        const data = await reponse.json()

        return data.ias

    } catch (error) {
        console.error('error getting file IAS: ', error)
        throw error

    }

}


export async function getConvertedFile(idToken: string, iasId: string) {

    const moduleUrl = `https://storage.ircamamplify.io/manager/${iasId}`

    try {

        const fileInfoResponse = await fetch(moduleUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            },
        })

        const fileInfo = await fileInfoResponse.json()
        const fileName = fileInfo.filename
        console.log("data in getConvertedFile: ", fileInfo)

        const storageUrl = `https://storage.ircamamplify.io/${iasId}/${fileName}`

        const getResponse = await fetch(storageUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': `Bearer ${idToken}`
            }
        })

        const blob = await getResponse.blob()
        
        return {
            blob: blob,
            fileInfo: fileInfo,
            fileName: fileName
        }


    } catch (error) {
        console.error("error getting converted file: ", error)
        throw error

    }

}