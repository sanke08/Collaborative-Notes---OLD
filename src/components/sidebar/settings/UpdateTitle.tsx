"use client"
import React, { useEffect, useState } from 'react'
import { Check, Edit2, Loader2, Workflow, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorField from '@/components/ErrorField';
import { twMerge } from 'tailwind-merge';
import { useAction } from '@/hook/useAction';
import axios from 'axios';
import { UpdateWorkspaceFormValidatorReqyest } from '@/lib/validators/workSpace.validator';
import useUser from '@/hook/useUser';
import { useRouter } from 'next/navigation';



interface Props {
    workspaceTitle: string
    workspaceId: string
}
const UpdateTitle = ({ workspaceId, workspaceTitle }: Props) => {


    const user = useUser()
    const router = useRouter()
    const [editTitleToggle, setEditTitleToggle] = useState(false)
    const [title, setTitle] = useState<string>(workspaceTitle || '');
    const { loading: updateTitleLoading, error: updateTitleError, success: updateTitleSuccess, execute: updateTitle, reset } = useAction({
        FN: async () => {
            const payload: UpdateWorkspaceFormValidatorReqyest = {
                title,
                workSpaceOwnerId: user.id
            }
            await axios.patch(`/api/workspace/${workspaceId}`, payload)
        }
    })
    const handleClose = () => {
        reset()
        setEditTitleToggle(false)
    }
    useEffect(() => {
        if (updateTitleSuccess) {
            router.refresh()
        }
        setTitle(workspaceTitle)
    }, [router, updateTitleSuccess, workspaceTitle])


    return (
        <div className=' w-96 py-2 px-10'>
            {
                editTitleToggle ?
                    <div className=' flex gap-x-2'>
                        <div className=' w-full'>
                            <Input placeholder='File Title' value={title} onChange={(e) => setTitle(e.target.value)} className=' w-full' />
                            {updateTitleError && <ErrorField error={updateTitleError} className=' text-end text-[0.66rem]' />}
                        </div>
                        <div className=' items-center w-6'>
                            {
                                updateTitleLoading ?
                                    <Loader2 className=' h-4 w-4 animate-spin' />
                                    :
                                    <Button onClick={() => updateTitle()} variant={"ghost"} disabled={title.length === 0} className={twMerge(' w-fit h-fit p-0', title.length > 0 && "bg-green-500")} >
                                        <Check className=' h-4 w-4 text-muted-foreground hover:text-white' />
                                    </Button>
                            }
                            <Button variant={"ghost"} disabled={updateTitleLoading} onClick={() => setEditTitleToggle(false)} className=' w-fit h-fit p-0'>
                                <X className=' h-4 w-4 text-muted-foreground hover:text-white' />
                            </Button>
                        </div>
                    </div>
                    :
                    <div className=' flex items-center text-lg gap-x-4 w-full'>
                        <div className=' flex items-center text-lg border px-5 py-0.5 rounded-lg w-full'>
                            <Workflow className=' h-5 w-5' />
                            {workspaceTitle}
                        </div>
                        <Button onClick={() => setEditTitleToggle(true)} variant={"ghost"} className=' p-0 h-fit w-fit'><Edit2 className=' h-4 w-4' /> </Button>
                    </div>
            }
        </div>
    )
}

export default UpdateTitle