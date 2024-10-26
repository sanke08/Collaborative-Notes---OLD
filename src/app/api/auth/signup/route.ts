import { db } from "@/lib/db";
import { SignupValidator } from "@/lib/validators/user.validator";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { z } from "zod";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const body = await req.json()
        const { name, email, password } = SignupValidator.parse(body)
        const user = await db.user.findFirst({
            where: { email }
        })
        if (user) return NextResponse.json({ message: "User Already exist" }, { status: 400 })
        const hashPass = await bcrypt.hash(password, 10)
        const newuser = await db.user.create({
            data: { name, email, password: hashPass }
        })
        const token = jwt.sign({ id: newuser.id }, process.env.SECRET!)
        const cookieStore = cookies()
        cookieStore.set("notion_token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), sameSite: false, httpOnly: true })
        return NextResponse.json({ message: "User logged in", status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 422 })
        }
        return NextResponse.json({ message: "Registration Failed" }, { status: 500 })
    }
}