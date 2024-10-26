import React, { use } from 'react'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import DashBoardSetUp from '@/components/dashBoardSetUp/DashBoardSetUp'


const page = async () => {
    const { user } = await getServerSideUser()
    if (!user?.id) return redirect("/auth?signin")
    const workSpace = await db.workSpace.findFirst({
        where: {
            workSpaceOwnerId: user.id || ""
        }
    })
    if (!workSpace) {
        const collab = await db.collabration.findFirst({
            where: {
                userId: user.id || ""
            }
        })
        if(collab){
            redirect(`/dashboard/${collab.workSpaceId}`)
        }
        return (
            <div className=' p-5 px-14'>
                <DashBoardSetUp userId={user.id} />
            </div>
        )
    }
    if (workSpace) {
        return redirect("/dashboard/" + workSpace.id)
    }
}

export default page