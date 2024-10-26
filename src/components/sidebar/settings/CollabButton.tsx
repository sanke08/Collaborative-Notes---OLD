"use client"
import ErrorField from '@/components/ErrorField'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hook/useAction'
import { AddCollabReqyest, RemoveCollabReqyest } from '@/lib/validators/collab.validators'
import axios from 'axios'
import { User, User2, UserCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface Props {
    collabId: string
    userId: string
    isalready?: boolean
    workspaceId: string
    currUserId: string
}



const CollabButton = ({ collabId, userId, isalready, workspaceId, currUserId }: Props) => {
    const router = useRouter()
    const { loading, error, execute, reset, success } = useAction({
        FN: async () => {
            if (isalready) {
                await axios.delete(`/api/collab/${collabId}?userId=${userId}&currUserId=${currUserId}`)
            }
            else {
                const payload: AddCollabReqyest = {
                    workspaceId, userId
                }
                await axios.post(`/api/collab`, payload)
            }

        }
    })
    useEffect(() => {
        if (success) {
            router.refresh()
        }

    }, [isalready, router, success])
    return (
        <div className=' w-max flex flex-col items-end'>
            <Button onClick={() => execute()} isLoading={loading} variant={"outline"}>
                {userId === currUserId && <UserCheck className=' w-5 h-5'/>}
                {
                    isalready ? <p>Remove</p> : <p>Add</p>
                }
            </Button>
            {error && <ErrorField error={error} />}
        </div>
    )
}

export default CollabButton