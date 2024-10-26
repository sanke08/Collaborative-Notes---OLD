import { getServerSideUser } from "@/hook/getServerSideUser";
import { db } from "@/lib/db";
import { CreateFolderFormValidator } from "@/lib/validators/folder.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { workSpaceId, title } = CreateFolderFormValidator.parse(body)
        const { user } = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorizes" }, { status: 401 })
        const workspace = await db.workSpace.findUnique({
            where: {
                id: workSpaceId,
            }
        })
        if (!workspace) return NextResponse.json({ message: "workspace Not found" }, { status: 404 })
        if (workspace.workSpaceOwnerId !== user.id) return NextResponse.json({ message: "You are not admin" }, { status: 400 })
        const existfolder = await db.folder.findFirst({
            where: { title }
        })
        if (existfolder) return NextResponse.json({ message: "Folder already exists" }, { status: 400 })
        await db.folder.create({
            data: {
                workSpaceId: workSpaceId,
                title
            }
        })
        return NextResponse.json({ message: "Workspace created" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to create folder" }, { status: 500 })
    }
}