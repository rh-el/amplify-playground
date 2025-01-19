import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        const trackId = Number(req.nextUrl.pathname.split('/').pop())


        if (!trackId) throw new Error('error while getting track id')
        
            const [sampleIas, timeIas, spatialIas] = await prisma.$transaction(async (tx) => {
                const sample = await tx.sample.findUnique({
                    where: { id: trackId }
                });
                
                const times = await tx.time.findMany({
                    where: { loop_id: trackId }
                });
                
                const spatials = await tx.spatial.findMany({
                    where: {
                        time_id: {
                            in: times.map(time => time.id)
                        }
                    }
                });
            
                return [sample, times, spatials];
            });
    
            return NextResponse.json({ 
                sampleIas: sampleIas, 
                timeIas: timeIas,
                spatialIas: spatialIas
            });


    } catch (error) {

        console.error(error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )

    }

}