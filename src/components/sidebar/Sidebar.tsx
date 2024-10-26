import { db } from '@/lib/db'
import React from 'react'
import WorkSpaceDropDown from './WorkSpaceDropDown'
import NativeNavigation from './NativeNavigation'
import { ScrollArea } from '../ui/scroll-area'
import CreateFolder from './CreateFolder'
import FolderContainer from './FolderContainer'


const Sidebar = async ({ userId, workSpaceId }: { userId: string, workSpaceId: string }) => {
    const privateWorkspace = await db.workSpace.findMany({
        where: {
            workSpaceOwnerId: userId,
            isPrivate:true
        },
    })
    if (!privateWorkspace) return
    const collabWorkspace = await db.collabration.findMany({
        where: { userId },
        include: { workSpace: true }
    })

    const folders = await db.folder.findMany({
        where: { workSpaceId, inTrash: false },
        include: {
            Files: {
                where: { inTrash: false }
            }
        }
    })

    const currWorkSpace = await db.workSpace.findUnique({ where: { id: workSpaceId } })
    if (!currWorkSpace) return
    return (
        <div className=' hidden sm:block w-[250px] p-3'>
            <div>
                <WorkSpaceDropDown privateWorkspace={privateWorkspace} currWorkSpaceId={workSpaceId} collabWorkspace={collabWorkspace} userId={userId} />
                <NativeNavigation workspaceId={workSpaceId} currWorkSpace={currWorkSpace} />
                <CreateFolder workspaceId={workSpaceId} />
                <ScrollArea className="overflow-scroll relative h-[450px] w-full pr-2">
                    <FolderContainer folders={folders} workSpaceId={workSpaceId} />
                </ScrollArea>
            </div>
        </div>
    )
}

export default Sidebar