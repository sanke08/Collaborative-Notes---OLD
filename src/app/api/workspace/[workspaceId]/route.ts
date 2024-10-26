import { getServerSideUser } from "@/hook/getServerSideUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (req: NextRequest, { params }: { params: { workspaceId: string } }) => {
    try {
        const { user } = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorizes" }, { status: 401 })
        const workspace = await db.workSpace.findUnique({
            where: {
                id: params.workspaceId,
                workSpaceOwnerId: user.id
            }
        })
        if (!workspace) return NextResponse.json({ message: "workspace not found" }, { status: 404 })
        const body = await req.json()
        const { isPrivate, data, title } = body
        if (title) {
            if (workspace.title === title) return NextResponse.json({ message: "Folder Already Exist" }, { status: 400 })
            await db.workSpace.update({
                where: {
                    id: workspace.id,
                    workSpaceOwnerId: user.id
                },
                data: { title }
            })
        }
        if (data) {

            await db.workSpace.update({
                where: {
                    id: workspace.id,
                    workSpaceOwnerId: user.id
                },
                data: { data }
            })
        }
        // if (isPrivate.tostring()) {
        //     await db.workSpace.update({
        //         where: { id: workspace.id, workSpaceOwnerId },
        //         data: { isPrivate }
        //     })
        // }
        return NextResponse.json({ message: "Folder UPdated" }, { status: 200 })

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to update workspace" }, { status: 500 })

    }
}

export const GET = async (req: NextRequest, { params }: { params: { workspaceId: string } }) => {
    try {
        const workSpace = await db.workSpace.findUnique({
            where: { id: params.workspaceId }
        })
        return NextResponse.json({ workSpace, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get workpsave", success: false }, { status: 500 })
    }
}