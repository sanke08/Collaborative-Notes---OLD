import QuillEditor from '@/components/quillEditor/QuillEditor'
import WorkspaceWrapper from '@/components/wrappers/WorkspaceWrapper'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

const page = async ({ params }: { params: { workspaceId: string } }) => {
    const workspace = await db.workSpace.findUnique({
        where: { id: params.workspaceId }
    })
    if (!workspace) return redirect("/dashboard")
    const { user } = await getServerSideUser()
    if (!user) return
    return (
        <div className="relative w-full">
            <Suspense fallback={<p className=' p-5 bg-red-400'>loading</p>}>
                <QuillEditor
                    dirType="workspace"
                    fileId={params.workspaceId}
                    // @ts-ignore
                    dirDetails={workspace}
                    user={user}
                />
            </Suspense>
        </div>
    )
}

export default page