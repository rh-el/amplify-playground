import prisma from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const { time_id, spatial_preset, ias_spatial_url } = await req.json()

        console.log("body:", time_id, spatial_preset, ias_spatial_url)
        
        
        const savedInfos = await prisma.spatial.create({
            data: {
                time_id: time_id,
                spatial_preset: spatial_preset,
                ias_spatial_url: ias_spatial_url
            }
        })
        console.log('savedInfos: ', savedInfos)

        return NextResponse.json({ savedInfos }, { status: 200 })

    } catch (error) {

        console.log(JSON.stringify(error)); 
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}