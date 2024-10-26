"use client"
import React, { useEffect, useRef, useState } from 'react'
import TooltipComponent from '../ToolTipComponent'
import { Check, Loader2, Plus } from 'lucide-react'
import { useAction } from '@/hook/useAction'
import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CreateFolderFormValidatorReqyest } from '@/lib/validators/folder.validator'
import { useRouter } from 'next/navigation'
import ErrorField from '../ErrorField'
import { useOnClickOutside } from "usehooks-ts"

interface Props {
    workspaceId: string
}


const CreateFolder = ({ workspaceId }: Props) => {
    const router = useRouter()
    const [toggle, setToggle] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const ref = useRef(null)
    const { error, success, loading, execute } = useAction({
        FN: async () => {
            const payload: CreateFolderFormValidatorReqyest = {
                title: text,
                workSpaceId: workspaceId
            }
            await axios.post(`/api/folder`, payload)
        }
    })

    const handleCreate = async () => {
        await execute()
    }
    useEffect(() => {
        if (success) {
            setText("")
            setToggle(false)
            router.refresh()
            return
        }
    }, [success, router])
    useOnClickOutside(ref, () => {
        setText("")
        setToggle(false)
    })


    return (
        <>
            <div ref={ref} className=' flex justify-between w-full text-muted-foreground'>
                <p>Folders</p>
                <TooltipComponent message="Create Folder">
                    <Plus onClick={() => setToggle((pre) => !pre)} className={twMerge(' hover:text-white transition-all duration-300', toggle && "rotate-45")} />
                </TooltipComponent>
            </div>
            <div ref={ref} className={twMerge(" overflow-hidden transition-all duration-500 ", toggle ? "h-[55px] p-[8px] border rounded-lg mt-1" : "mt-0  h-[0px] p-[0px]", error && toggle && "h-[65px]")}>
                <div className='flex items-center space-x-2'>
                    <Input value={text} onChange={(e) => setText(e.target.value)} />
                    {
                        loading ?
                            <Loader2 className=' animate-spin h-5 w-5' />
                            :
                            <Button onClick={handleCreate} disabled={text.length === 0} variant={"btn-secondary"} className={twMerge(' h-fit w-fit p-0  rounded-full border-[1px] border-slate-400 transition-all duration-500', text.length !== 0 && "bg-green-500")}><Check className=' h-5 w-5' /> </Button>
                    }
                </div>
                {
                    toggle && error &&
                    <p className=''><ErrorField error={error} className=' text-[0.6rem] text-start' /> </p>
                }
            </div>
        </>
    )
}

export default CreateFolder