"use client"
import React, { useRef, useState } from 'react'
import CustomDialogTrigger from '../CustomDialogTrigger'
import WorkSpaceCreator from './WorkSpaceCreator'
import { ChevronDown, Plus, Shield, ShieldCheck, Users, Users2 } from 'lucide-react'
import { Button } from '../ui/button'

import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { Collabration, WorkSpace } from '@prisma/client'
import { ScrollArea } from '../ui/scroll-area'
import { useDispatch } from 'react-redux'
import { GET_WORKSPACE_SUCCESS } from '@/redux/constance'
import { useOnClickOutside } from 'usehooks-ts'

type collabWorkspace = Array<{ workSpace: WorkSpace } & Collabration>
interface Props {
    privateWorkspace: WorkSpace[]
    collabWorkspace: collabWorkspace
    currWorkSpaceId: string
    userId: string
}

const WorkSpaceDropDown = ({ privateWorkspace, currWorkSpaceId, collabWorkspace, userId }: Props) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const ref = useRef(null)
    const dispatch = useDispatch()
    const navigate = (workspace: WorkSpace) => {
        dispatch({ type: GET_WORKSPACE_SUCCESS, payload: workspace })
        router.push(`/dashboard/${workspace.id}`)
    }
    useOnClickOutside(ref, () => {
        setOpen(false)
    })
    return (
        <div ref={ref} className=' relative'>
            <Button onClick={() => setOpen((pre) => !pre)} variant={"ghost"} className=' flex w-full border justify-between px-5 active:scale-100'>
                <p className='text w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap flex items-center gap-x-1'>
                    {privateWorkspace.find((workspace) => workspace.id === currWorkSpaceId)?.workSpaceOwnerId === userId && <ShieldCheck className=' text-purple-500 h-5 w-5' />}
                    {privateWorkspace.find((workspace) => workspace.id === currWorkSpaceId)?.title}
                    {collabWorkspace.find(({ workSpace }) => workSpace.id === currWorkSpaceId)?.workSpace.workSpaceOwnerId === userId && <ShieldCheck className=' text-purple-500 h-5 w-5' />}
                    {collabWorkspace.find(({ workSpace }) => workSpace.id === currWorkSpaceId)?.workSpace.title}
                    {collabWorkspace.find(({ workSpace }) => workSpace.id === currWorkSpaceId) && <Users className=' h-3 w-3' />}
                </p>
                <ChevronDown className={twMerge(" transition-all duration-300", open ? " rotate-180" : "rotate-0")} />
            </Button>
            <div className={twMerge(' transition-all duration-300 z-50 bg-background mx-auto overflow-hidden absolute flex flex-col rounded-lg w-[97%]', open ? "h-max p-1 gap-y-1 border" : "h-0 p-0")}>
                <CustomDialogTrigger header="Create A Workspace" content={<WorkSpaceCreator />} description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."            >
                    <Button size={"sm"} className=" w-full text-sm flex justify-center gap-x-2" >
                        <Plus className=' text-slate-500 w-5' />
                        <p>Create Workspace</p>
                    </Button>
                </CustomDialogTrigger>
                <ScrollArea className=' flex flex-col w-full overflow-y-scroll min-h-full max-h-40'>
                    <div className=' flex flex-col'>
                        {
                            privateWorkspace && privateWorkspace.find((workspace) => workspace.id !== currWorkSpaceId) &&
                            <>
                                <p className=' text-[0.6rem] w-full'>Private Workspace</p>
                                {
                                    privateWorkspace.filter((workspace) => workspace.id !== currWorkSpaceId).map((workspace) => (
                                        <Button onClick={() => navigate(workspace)} variant={"outline"} key={workspace.id} className='my-[1px] self-end w-[95%]'>
                                            <p className='text w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap flex space-x-1'>
                                                {workspace.workSpaceOwnerId === userId && <ShieldCheck className=' text-purple-500 h-5 w-5' />}
                                                {workspace.title}
                                            </p>
                                        </Button>
                                    ))
                                }
                            </>
                        }

                    </div>
                    <div className=' w-full flex flex-col'>
                        {
                            collabWorkspace.find(({ workSpace }) => (workSpace.id !== currWorkSpaceId)) &&
                            <>
                                <p className=' text-[0.6rem] w-full'>Collabration Workspace</p>
                                {
                                    collabWorkspace.filter(({ workSpace }) => (workSpace.id !== currWorkSpaceId)).map(({ workSpace }) => (
                                        <Button onClick={() => navigate(workSpace)} variant={"outline"} key={workSpace.id} className=' w-[95%] self-end my-[1px] flex  justify-between'>
                                            <p className='text w-full overflow-hidden overflow-ellipsis whitespace-nowrap flex space-x-1'>
                                                {workSpace.workSpaceOwnerId === userId && <ShieldCheck className=' text-purple-500 h-5 w-5' />}
                                                {workSpace.title}
                                            </p>
                                            <Users className=' h-3 w-3' />
                                        </Button>
                                    ))
                                }
                            </>
                        }
                    </div>

                </ScrollArea>
            </div>
        </div >
    )
}

export default WorkSpaceDropDown