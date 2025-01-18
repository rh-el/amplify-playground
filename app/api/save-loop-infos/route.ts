import prisma from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const { loop_number, sample_id, ias_loop_url } = await req.json()

        console.log("body:", loop_number, sample_id, ias_loop_url)
        
        
        const savedInfos = await prisma.loop.create({
            data: {
                loop_number: loop_number,
                sample_id: sample_id,
                ias_loop_url: ias_loop_url
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