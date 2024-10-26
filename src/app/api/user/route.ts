import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const users = await db.user.findMany()
        return NextResponse.json({ users ,success:true})
    } catch (error: any) {
        return NextResponse.json({ message: error.message })
    }
}