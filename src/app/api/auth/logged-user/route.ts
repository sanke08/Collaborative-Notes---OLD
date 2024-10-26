import { cookies } from "next/headers"

import jwt, { JwtPayload } from "jsonwebtoken"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"



export const GET = async (req: Request) => {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get("notion_token")?.value || ""
        // @ts-ignore
        const { id } = jwt.decode(token) || ""
        if (!id) return NextResponse.json({ message: "Invalid token" })
        const user = await db.user.findUnique({
            where: {
                id: id || ""
            }
        })
        return NextResponse.json({ user })
    } catch (error) {
        return NextResponse.json({ message: "Error while retrieving token", error })

    }
}