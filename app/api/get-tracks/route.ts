import prisma from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        const allTracks = await prisma.sample.findMany({
            select: {
                id: true,
                name: true,
                sample_url: true
            }
        })
        console.log('all tracks: ', allTracks)
        return NextResponse.json(allTracks, { status: 200 })

    } catch (error) {

        // console.log(error)
        console.log(JSON.stringify(error)); 
        // return NextResponse.json(
        //     { error: 'Internal server error' },
        //     { status: 500 }
        // )
    }
}