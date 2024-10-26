import { db } from "@/lib/db"
import { AddCollab } from "@/lib/validators/collab.validators"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { workspaceId, userId } = AddCollab.parse(body)
        const collab = await db.collabration.findFirst({
            where: { workSpaceId: workspaceId, userId }
        })
        if (collab) {
            return NextResponse.json({ message: "Already Exist" }, { status: 400 })
        }
        await db.collabration.create({
            data: {
                workSpaceId: workspaceId,
                userId
            }
        })
        return NextResponse.json({ message: "collab added" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to create file" }, { status: 500 })

    }
}