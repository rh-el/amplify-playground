import prisma from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const { name, sample_url } = await req.json()

        console.log("body:", name, sample_url)
        
        
        const savedInfos = await prisma.sample.create({
            data: {
                name: name,
                sample_url: sample_url
            }
        })
        console.log('all tracks: ', savedInfos)

        return NextResponse.json({ savedInfos }, { status: 200 })

    } catch (error) {

        console.log(JSON.stringify(error)); 
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}