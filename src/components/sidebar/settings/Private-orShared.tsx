"use client"
import ErrorField from '@/components/ErrorField';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAction } from '@/hook/useAction';
import axios from 'axios';
import { Check, Loader2, Lock, Share } from 'lucide-react';
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';

const PrivateOrShared = ({ workspaceId }: { workspaceId: string }) => {
    const [permissions, setPermissions] = useState<"private" | "shared">('private');
    const { loading, error, execute, reset } = useAction({
        FN: async () => {
            const payload = {
                isPrivate: permissions === "private" ? true : false
            }
            await axios.patch(`/api/workspace/${workspaceId}`, payload)
        }
    })
    return (
        <>
            <div className=' w-96 mt-5 flex gap-x-3'>
                {/* @ts-ignore */}
                <Select onValueChange={(val) => { setPermissions(val) }} defaultValue={permissions}>
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
                <div className=' items-center w-6'>
                    {
                        loading ?
                            <Loader2 className=' h-4 w-4 animate-spin' />
                            :
                            <Button onClick={() => execute()} variant={"ghost"} className="w-fit h-fit p-0 bg-green-500" >
                                <Check className=' h-4 w-4 text-muted-foreground hover:text-white' />
                            </Button>
                    }

                </div>
            </div>
            {error && <ErrorField error={error} />}
        </>
    )
}

export default PrivateOrShared