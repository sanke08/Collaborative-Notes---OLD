"use client"
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Lock, Plus, Share } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import { Button } from '../ui/button'
import CollabaratorSearch from './CollabaratorSearch'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAction } from '@/hook/useAction'
import axios from 'axios'
import { CreateWorkspaceFormValidatorReqyest } from '@/lib/validators/workSpace.validator'
import useUser from '@/hook/useUser'
import ErrorField from '../ErrorField'

const WorkSpaceCreator = () => {

    const { toast } = useToast();
    const user = useUser()
    const router = useRouter();
    const [permissions, setPermissions] = useState('private');
    const [title, setTitle] = useState('');
    const [collaborators, setCollaborators] = useState<User[]>([]);


    const addCollaborator = (collaborator: User) => {
        if (collaborator) {
            setCollaborators((pre) => ([...pre, collaborator]))
        }
    }
    const removeCollaborator = (userId: string) => {
        setCollaborators((pre) => pre.filter((user: User) => (user.id !== userId))
        )
    }

    const { loading, error, success, execute } = useAction({
        FN: async () => {
            const payload: CreateWorkspaceFormValidatorReqyest = {
                title,
                workSpaceOwnerId: user.id,
                isPrivate: permissions === "private" ? true : false
            }
            await axios.post("/api/workspace", { ...payload, collaborators: [...collaborators, user] })
        }
    })
    const handleSubmit = async () => {
        await execute()
        router.refresh()
    }



    return (
        <div className=' py-5'>
            <div >
                <Label htmlFor='title' className='text-muted-foreground'>Name</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} id='title' className=' my-1' />
                {error && <ErrorField error={error} />}
            </div>
            <div className='my-2'>
                <Label className='text-muted-foreground'>Permission</Label>
                <Select disabled={loading} onValueChange={(val) => {
                    setPermissions(val);
                }}
                    defaultValue={permissions}>
                    <SelectTrigger className=' w-full h-24'><SelectValue /> </SelectTrigger>
                    <SelectContent> 
                        <SelectGroup className=' w-full'>
                            <SelectItem value="private">
                                <div className=' flex gap-4 justify-center items-center p-2'>
                                    <Lock />
                                    <div className="text-left flex flex-col">
                                        <span>Private</span>
                                        <p>
                                            Your workspace is private to you. You can choose to share it later.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            <SelectItem value="shared">
                                <div className="p-2 flex gap-4 justify-center items-center">
                                    <Share />
                                    <div className="text-left flex flex-col">
                                        <span>Shared</span>
                                        <span>You can invite collaborators.</span>
                                    </div>
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {
                permissions === 'shared' && (
                    <div className=' w-full'>
                        <div className=' w-full flex justify-center'>
                        <CollabaratorSearch addCollaborator={addCollaborator} removeCollaborator={removeCollaborator} collaborators={collaborators} >
                            <div>
                                <Button disabled={loading} className=' text-sm mt-3 bg-purple-800/50'>
                                    <Plus />
                                    Add User
                                </Button>
                            </div>
                        </CollabaratorSearch>
                        </div>
                        <div>
                            <p>Collabrators {collaborators.length || ""} </p>
                            <ScrollArea className='w-full overflow-scroll h-[120px] p-2 mt-2 border'>
                                {
                                    collaborators.length ?
                                        (
                                            collaborators.map((collaborator) => (
                                                <div key={collaborator.id} className='my-1 w-full flex justify-between px-2 '>
                                                    <div className="items-center min-w-max max-w-[75%] overflow-x-scroll">
                                                        <div className=' flex item-center space-x-1'>
                                                            <Avatar className="w-8 h-8">
                                                                <AvatarImage src="/avatars/7.png" />
                                                                <AvatarFallback>CP</AvatarFallback>
                                                            </Avatar>
                                                            <p>{collaborator.name} </p>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground overflow-hidden overflow-ellipsis ml-3" >
                                                            {collaborator.email}
                                                        </div>
                                                    </div>
                                                    <div className=' w-max'>
                                                        <Button variant={"btn-secondary"} onClick={() => removeCollaborator(collaborator.id)} className=' border w-fit h-fit p-1 px-2'>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                        :
                                        (
                                            <div className="absolute right-0 left-0 top-0 bottom-0 flex justify-center items-center " >
                                                <span className="text-muted-foreground text-sm">
                                                    You have no collaborators
                                                </span>
                                            </div>
                                        )
                                }
                            </ScrollArea>
                        </div>
                    </div>
                )
            }
            <Button onClick={handleSubmit} isLoading={loading} disabled={(permissions === 'shared' && collaborators.length === 0) || title.length === 0} variant={"ghost"} className='border w-full mt-3'>
                Create
            </Button>
        </div>
    )
}

export default WorkSpaceCreator