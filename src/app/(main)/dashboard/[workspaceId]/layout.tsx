import Sidebar from '@/components/sidebar/Sidebar'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({ children, params }: { children: React.ReactNode, params: { workspaceId: string } }) => {
    const { user } = await getServerSideUser()
    if(!user) return redirect("/auth?sign-in")
    return (
        <div className=' flex h-screen w-screen'>
            <Sidebar userId={user?.id} workSpaceId={params.workspaceId} />
            <div className=' overflow-scroll relative border-l w-full'>
                {children}
            </div>
        </div>
    )
}

export default layout