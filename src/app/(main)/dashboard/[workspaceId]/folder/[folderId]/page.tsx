import QuillEditor from '@/components/quillEditor/QuillEditor'
import FolderWrapper from '@/components/wrappers/FolderWrapper'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

const page = async ({ params }: { params: { workspaceId: string, folderId: string } }) => {
  const folder = await db.folder.findUnique({
    where: { id: params.folderId }
  })
  if (!folder) return redirect("/dashboard")
  const { user } = await getServerSideUser()
  if (!user) return
  return (
    <div className="relative w-full">
      <Suspense fallback={<p className=' p-5 bg-red-400'>loading</p>}>
        <QuillEditor
          dirType="folder"
          fileId={params.folderId}
          // @ts-ignore
          dirDetails={folder}
          user={user}
        />
      </Suspense>
    </div>
  )
}

export default page 