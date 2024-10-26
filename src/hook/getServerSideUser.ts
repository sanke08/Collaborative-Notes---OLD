import { db } from "@/lib/db"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export const getServerSideUser = async () => {
    const cookieStore = cookies()

    const token = cookieStore.get("notion_token")?.value || ""
    const data = jwt.decode(token) || ""
    const user = await db.user.findUnique({
        // @ts-ignore
        where: { id: data?.id || "" }
    })
    return { user }
} 