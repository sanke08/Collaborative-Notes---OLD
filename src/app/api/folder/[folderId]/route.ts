import { getServerSideUser } from "@/hook/getServerSideUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (req: NextRequest, { params }: { params: { folderId: string } }) => {
    try {
        const { user } = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorizes" }, { status: 401 })
        const folder = await db.folder.findUnique({
            where: {
                id: params.folderId
            },
            include: {
                workSpace: true
            }
        })
        if (!folder) return NextResponse.json({ message: "folder not found" }, { status: 404 })
        if (folder.workSpace.workSpaceOwnerId !== user.id) return NextResponse.json({ message: "you are not admin" }, { status: 400 })
        const url = new URL(req.url)
        const trash = url.searchParams.has("trash")
        if (trash) {
            await db.folder.update({
                where: { id: params.folderId },
                data: { inTrash: true }
            })
            return NextResponse.json({ message: "success" }, { status: 200 })
        }
        const body = await req.json()
        const { title, workSpaceId, data } = body
        if (data) {
            await db.folder.update({
                where: { id: params.folderId },
                data: { data }
            })
            return NextResponse.json({ message: "success" }, { status: 200 })
        }
        if (title) {
            const isExistFolder = await db.folder.findFirst({
                where: { title }
            })
            if (isExistFolder) return NextResponse.json({ message: 'Folder already exists' }, { status: 400 })
            await db.folder.update({
                where: { id: params.folderId || "", workSpaceId },
                data: { title: title }
            })
        }
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to update folder" }, { status: 500 })
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { folderId: string } }) => {
    try {
        const { user } = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorizes" }, { status: 401 })
        const folder = await db.folder.findUnique({
            where: {
                id: params.folderId
            },
            include: {
                workSpace: true
            }
        })
        if (!folder) return NextResponse.json({ message: "folder not found" }, { status: 404 })
        if (folder.workSpace.workSpaceOwnerId !== user.id) return NextResponse.json({ message: "you are not admin" }, { status: 400 })
        if (!folder) return NextResponse.json({ message: 'Folder not exists' }, { status: 400 })
        await db.folder.delete({
            where: { id: params.folderId},
        })
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to delete folder" }, { status: 500 })
    }
}


export const GET = async (req: NextRequest, { params }: { params: { folderId: string } }) => {
    try {
        const folder = await db.folder.findUnique({
            where: { id: params.folderId }
        })
        return NextResponse.json({ folder, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get folder", success: false }, { status: 500 })
    }
}