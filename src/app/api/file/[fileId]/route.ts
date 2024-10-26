import { db } from "@/lib/db";
import { UpdateFileFormValidator } from "@/lib/validators/file.validator";
import { UpdateFolderFormValidator } from "@/lib/validators/folder.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (req: NextRequest, { params }: { params: { fileId: string } }) => {
    try {
        const url = new URL(req.url)
        const trash = url.searchParams.has("trash")
        if (trash) {
            await db.file.update({
                where: { id: params.fileId || "" },
                data: { inTrash: true }
            })
            return NextResponse.json({ message: "success" }, { status: 200 })
        }
        const body = await req.json()
        const {title,data} =body
        if(data){
            await db.file.update({
                where: { id: params.fileId || "" },
                data: { data}
            })
            return NextResponse.json({ message: "success" }, { status: 200 })
        }
        const isExistFile = await db.file.findFirst({
            where: { title }
        })
        if (isExistFile) return NextResponse.json({ message: 'File already exists' }, { status: 400 })
        await db.file.update({
            where: { id: params.fileId || "" },
            data: { title: title }
        })
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to update File" }, { status: 500 })
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { fileId: string } }) => {
    try {
        const isExistFile = await db.file.findUnique({
            where: { id: params.fileId }
        })
        if (!isExistFile) return NextResponse.json({ message: 'File not exists' }, { status: 400 })
        await db.file.delete({
            where: { id: params.fileId || "" },
        })
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to delete file" }, { status: 500 })
    }
}


export const GET = async (req: NextRequest, { params }: { params: { fileId: string } }) => {
    try {
        const file = await db.file.findUnique({
            where: { id: params.fileId }
        })
        return NextResponse.json({ file, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get file", success: false }, { status: 500 })
    }
}