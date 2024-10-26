"use client"
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import EmojiPicker from '../global/EmojiPicker';
import { Button } from '../ui/button';
import { CreateWorkspacehelper } from '@/helpers/workspace.helper';
import ErrorField from '../ErrorField';
import axios from 'axios';
import { CreateWorkspaceFormValidatorReqyest } from '@/lib/validators/workSpace.validator';
import { useAction } from '@/hook/useAction';
import { useRouter } from 'next/navigation';

const DashBoardSetUp = ({ userId }: { userId: string }) => {
    const router = useRouter()
    const [selectedEmoji, setSelectedEmoji] = useState('💼');
    const [title, setTitle] = useState("")
    const { loading, error, success, execute } = useAction({
        FN: async () => {
            const payload: CreateWorkspaceFormValidatorReqyest = {
                title,
                workSpaceOwnerId: userId,
                isPrivate: true
            }
            await axios.post("/api/workspace", payload)

        }
    })
    const handleSubmit = async () => {
        await execute({ title, workSpaceOwnerId: userId, iconId: selectedEmoji })
        router.refresh()
    }
    return (
        <div className=''>
            <div>
                <p className=' text-3xl font-medium'>Create a WorkSpace</p>
                <p className=' text-purple-300/80'>Lets create a private workspace to get you started.You can add collaborators later from the workspace settings tab.</p>
            </div>
            <div className=' flex px-10 mt-5 items-start'>
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                    {selectedEmoji}
                </EmojiPicker>
                <div className=' relative'>
                    <Label htmlFor='workspaceName' className=' py-1'>Name</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} id='workspaceName' type="text" placeholder="Workspace Name" />
                    <ErrorField error={error} />
                    <Button onClick={handleSubmit} disabled={title.length === 0} isLoading={loading} className=" absolute right-0 mt-2">create</Button>
                </div>
            </div>
        </div>
    )
}

export default DashBoardSetUp