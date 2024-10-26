import Settings from '@/components/sidebar/settings/Settings'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import React from 'react'


interface Props {
    params: {
        workspaceId: string
    }
}


const page = async ({ params }: Props) => {
    const workspace = await db.workSpace.findUnique({
        where: { id: params.workspaceId }
    })
    const users = await db.user.findMany({

    })
    const { user } = await getServerSideUser()
    if(!user) return
    const isCollab = workspace?.isPrivate === false
    let collabratives;
    if (isCollab) {
        collabratives = await db.collabration.findMany({
            where: { workSpaceId: workspace.id },
            include: { user: true }
        })
        return (
            <Settings currWorkSpace={workspace} collabratives={collabratives} users={users} user={user} />
        )
    }
    return (
        <Settings currWorkSpace={workspace} />
    )
}

export default page