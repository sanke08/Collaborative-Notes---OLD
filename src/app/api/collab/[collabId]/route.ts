import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { collabId: string } }) => {
    try {
        const url = new URL(req.url)
        const userId = url.searchParams.get('userId')
        const currUserId = url.searchParams.get('currUserId')
        if (!currUserId) return NextResponse.json({ message: "Unauthorized" }, { status: 421 })
        if (!userId) return NextResponse.json({ message: "User not found" }, { status: 404 })

        const collab = await db.collabration.findUnique({
            where: {
                id: params.collabId,
                userId
            },
            include: { workSpace: true }
        })
        if (!collab) return NextResponse.json({ message: "collab not found" }, { status: 404 })
        if (collab.workSpace.workSpaceOwnerId !== currUserId) {
            return NextResponse.json({ message: "You are not admin" }, { status: 400 })
        }
        const workspace = await db.workSpace.findFirst({
            where: {
                id: collab.workSpaceId,
                workSpaceOwnerId: userId
            }
        })
        if (workspace) return NextResponse.json({ message: "You have only right to delete workspace" }, { status: 400 })
        await db.collabration.delete({
            where: { id: collab.id }
        })
        return NextResponse.json({ message: "collab deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to update workspace" }, { status: 500 })

    }
}
