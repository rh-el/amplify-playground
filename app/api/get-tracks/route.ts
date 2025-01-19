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
        return NextResponse.json(allTracks, { status: 200 })

    } catch (error) {

        console.log(JSON.stringify(error)); 

    }
}