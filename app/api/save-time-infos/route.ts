import prisma from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const { time_speed, loop_id, ias_time_url } = await req.json()

        console.log("body:", time_speed, loop_id, ias_time_url)
        
        
        const savedInfos = await prisma.time.create({
            data: {
                time_speed: time_speed,
                loop_id: Number(loop_id),
                ias_time_url: ias_time_url
            }
        })
        console.log('savecInfos: ', savedInfos)

        return NextResponse.json({ savedInfos }, { status: 200 })

    } catch (error) {

        console.log(JSON.stringify(error)); 
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}