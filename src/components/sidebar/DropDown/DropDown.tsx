"use client"
import React, { useEffect, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Check, ChevronDown, Edit, File, Folder, Loader2, Plus, Trash, X } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { twMerge } from 'tailwind-merge';
import { File as file, Folder as folder } from '@prisma/client';
import { useAction } from '@/hook/useAction';
import axios from 'axios';
import { UpdateFolderFormValidatorReqyest } from '@/lib/validators/folder.validator';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ErrorField from '../../ErrorField';
import TooltipComponent from '../../ToolTipComponent';
import { CreateFileFormValidatorReqyest, UpdateFileFormValidatorReqyest } from '@/lib/validators/file.validator';
import { ScrollArea } from '../../ui/scroll-area';
import { FileContainer } from './FileContainer';
import { Editing } from './Editing';
import AddFile from './AddFile';
import { useDispatch } from 'react-redux';
import { GET_FILE_SUCCESS, GET_FOLDERS_SUCCESS } from '@/redux/constance';



interface Props {
    title: string;
    id: string;
    listType: 'folder' | 'file';
    iconId: string
    children?: React.ReactNode;
    disabled?: boolean;
    folder?: folder & { Files: file[] }
    file?: file
    folderId: string
    workSpaceId: string
}


const DropDown = ({ id, children, listType, title, disabled, iconId, folderId, folder, workSpaceId, file }: Props) => {
    const router = useRouter()
    const params = useParams()
    const [toggle, setToggle] = useState(false)
    const [isEditing, setEditing] = useState(false);
    const [addFileToggle, setAddFileToggle] = useState(false)
    const [fileTitle, setFileTitle] = useState<string>("")
    const [text, setText] = useState(title || "")
    const dispatch = useDispatch()
    const { execute: update, success: upddateSuccess, error: updateerror, loading: updateLoading, reset: updateReset } = useAction({
        FN: async () => {
            if (listType === "folder") {
                const payload: UpdateFolderFormValidatorReqyest = {
                    title: text,
                    workSpaceId
                }
                const { data } = await axios.patch("/api/folder/" + folder?.id, payload)
                return
            }
            if (listType === "file") {
                const payload: UpdateFileFormValidatorReqyest = {
                    title: text
                }
                const { data } = await axios.patch("/api/file/" + file?.id, payload)
                return
            }
        }
    })
    const { execute: handleDelete, success: deleteSuccess, reset: deleteReset, loading: deleteLoading } = useAction({
        FN: async () => {
            if (listType === "folder") {
                await axios.patch(`/api/folder/${folder?.id}?trash=${true}`, {})
                return
            }
            if (listType === "file") {
                await axios.patch(`/api/file/${file?.id}?trash=${true}`, {})
                return
            }
        }
    })
    const { execute: addFile, loading: fileLoading, error: fileError, success: fileSuccess, reset: fileReset } = useAction({
        FN: async () => {
            const payload: CreateFileFormValidatorReqyest = {
                title: fileTitle,
                workSpaceId: workSpaceId,
                folderId: id
            }
            await axios.post(`/api/file`, payload)
        }
    })

    const handleAddFile = () => {
        setFileTitle("")
        setAddFileToggle((pre) => !pre)
        setEditing(false)
        setText(title)
    }
    const handleCloseAddFile = () => {
        setAddFileToggle(false)
        fileReset()
    }
    const handleNavigatioin = async (id: string, type: string) => {
        if (type === 'folder') {
            dispatch({ type: GET_FOLDERS_SUCCESS, payload: folder })
            router.push(`/dashboard/${workSpaceId}/folder/${folder?.id}`);
        }
        if (type === 'file') {
            dispatch({ type: GET_FILE_SUCCESS, payload: file })
            router.push(`/dashboard/${workSpaceId}/folder/${folderId}/file/${file?.id}/`);
        }
    }
    const handleUPdate = () => {
        update()
    }
    const handleCloseEditFolder = () => {
        updateReset()
        setEditing(false)
        setText(title)
    }
    const handleOpenEditToggle = () => {
        setEditing((pre) => !pre)
        setAddFileToggle(false)
    }

    useEffect(() => {
        if (upddateSuccess || deleteSuccess || fileSuccess) {
            setEditing(false)
            setAddFileToggle(false)
            setFileTitle("")
            setText("")
            return router.refresh()
        }
        setText(title)
    }, [router, upddateSuccess, deleteSuccess, fileSuccess, title])


    return (
        <div className={twMerge(' w-[220px] overflow-hidden py-2 h-fit', listType === "folder" && "border-b  py-3")}>
            <div className=' flex'>
                <div className=' flex items-start w-[200px] gap-x-3 group'>
                    <div className={twMerge('flex w-full  items-center', listType === "file" && "pl-6 pr-3")}>
                        <Button onClick={() => { handleNavigatioin(id, listType) }} variant={"ghost"} className={twMerge(' p-1 h-fit w-full mr-1 overflow-hidden hover:bg-slate-800/50', listType === "folder" && "p-2", listType === "folder" && params.folderId === id && "bg-slate-800/50", params.fileId === id && "bg-slate-800/50", folder?.Files.find((file) => file.id === params.fileId) && !toggle && "bg-slate-800/50")}>
                            <p className=' w-full text-start flex gap-x-2 items-center'>
                                {
                                    listType === "folder"
                                        ?
                                        <div className=''>
                                            <Folder className=' h-4 w-4 text-white/70' />
                                        </div>
                                        :
                                        <div className=''>
                                            <File className=' h-4 w-4 text-white/70' />
                                        </div>
                                }
                                {title}
                            </p>
                        </Button>
                        <div className={twMerge(' w-[0px] items-center gap-x-1 overflow-hidden  transition-all duration-300 flex', (deleteLoading || addFileToggle || isEditing) && (listType === "file" ? "w-[50px]" : "w-[80px]"), listType === "file" ? "group-hover:w-[50px]" : "group-hover:w-[80px]")}>
                            {
                                listType === "folder" &&
                                <TooltipComponent message='Add File'>
                                    <Plus onClick={handleAddFile} className={twMerge(' h-4 w-4 text-muted-foreground hover:text-white transition-all duration-300', addFileToggle && "rotate-45 text-white")} />
                                </TooltipComponent>
                            }
                            <TooltipComponent message='Update'>
                                <Edit onClick={handleOpenEditToggle} className={twMerge(' h-4 w-4 text-muted-foreground hover:text-white', isEditing && "text-white")} />
                            </TooltipComponent>
                            <TooltipComponent message='Delete'>
                                {
                                    deleteLoading ?
                                        <Loader2 className=' h-4 w-4 animate-spin' />
                                        :
                                        <Trash onClick={() => handleDelete()} className=' h-4 w-4 text-muted-foreground hover:text-white' />
                                }
                            </TooltipComponent>
                        </div>
                    </div>
                </div>
                {
                    listType === "folder" &&
                    <Button onClick={() => setToggle((pre) => !pre)} variant={"ghost"} className=' p-0 h-fit w-fit mt-2'>
                        <ChevronDown className={twMerge(' h-5 w-5 transition-all duration-500', toggle && "rotate-180")} />
                    </Button>
                }
            </div>

            <Editing text={text} isEditing={isEditing} updateerror={updateerror} updateLoading={updateLoading} setText={(text) => setText(text)} handleCloseEditFolder={handleCloseEditFolder} handleUPdate={handleUPdate} listType={listType} />
            <AddFile listType={listType}  fileError={fileError} fileTitle={fileTitle} addFileToggle={addFileToggle} addFile={addFile} handleCloseAddFile={handleCloseAddFile} setFileTitle={setFileTitle} fileLoading={fileLoading} text={text} />
            <FileContainer folder={folder} toggle={toggle} workSpaceId={workSpaceId} />
        </div>
    )
}

export default DropDown



