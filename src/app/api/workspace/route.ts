import { getServerSideUser } from "@/hook/getServerSideUser";
import { db } from "@/lib/db";
import { CreateWorkspaceFormValidator } from "@/lib/validators/workSpace.validator";
import { User } from "@prisma/client";
import { icons } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json()
        const { title, isPrivate } = CreateWorkspaceFormValidator.parse(body)
        const { user } = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorizes" }, { status: 401 })
        const { iconId } = body
        const { collaborators }: { collaborators: User[] } = body
        const exist = await db.workSpace.findFirst({
            where: { title }
        })
        if (exist) return NextResponse.json({ message: "Workspace already exists" }, { status: 400 })
        const Workspace = await db.workSpace.create({
            data: {
                title,
                workSpaceOwnerId: user.id,
                iconId: iconId || "",
                isPrivate
            }
        })
        if (collaborators) {
            await db.collabration.createMany({
                data: collaborators.map((collaborator) => ({
                    userId: collaborator.id,
                    workSpaceId: Workspace.id
                }))
            })
        }
        return NextResponse.json({ message: "WorkSpace Created" }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Registration Failed" }, { status: 500 })
    }
}