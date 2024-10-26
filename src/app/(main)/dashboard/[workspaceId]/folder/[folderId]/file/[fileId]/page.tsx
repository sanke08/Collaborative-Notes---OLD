import QuillEditor from '@/components/quillEditor/QuillEditor'
import FileWrapper from '@/components/wrappers/FileWrapper'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }: { params: { workspaceId: string, folderId: string, fileId: string } }) => {

  const file = await db.file.findUnique({
    where: { id: params.fileId }
  })
  if (!file) return redirect("/dashboard")
  const { user } = await getServerSideUser()
  if (!user) return

  return (

      <div className="relative w-full">
        <QuillEditor
          dirType="file"
          fileId={params.fileId}
          // @ts-ignore
          dirDetails={file}
          user={user}
        />
      </div>
  )
}

export default page
