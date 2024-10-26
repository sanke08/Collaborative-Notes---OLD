import { db } from "@/lib/db";
import { CreateFileFormValidator } from "@/lib/validators/file.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { title, folderId, workSpaceId } = CreateFileFormValidator.parse(body);
        const existfile = await db.file.findFirst({
            where: { title, folderId, workSpaceId }
        })
        if (existfile) return NextResponse.json({ message: "File already exists" }, { status: 400 })
        await db.file.create({
            data: {
                workSpaceId, folderId, title
            }
        })
        return NextResponse.json({ message: "File created" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Failed to create file" }, { status: 500 })

    }
}