"use client"
import { File, Folder } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Accordion } from '../ui/accordion'
import DropDown from './DropDown/DropDown'



type Folders = Array<Folder & { Files: File[] }>

interface Props {
    folders: Folders
    workSpaceId: string
}


const FolderContainer = ({ folders, workSpaceId }: Props) => {
    return (
        <div className=' w-full'>
            {
                folders && folders.map((folder) => (
                    <DropDown key={folder.id} title={folder.title} listType='folder' id={folder.id} iconId='' folder={folder} workSpaceId={workSpaceId} folderId={''} />
                ))
            }
        </div>
    )
}

export default FolderContainer