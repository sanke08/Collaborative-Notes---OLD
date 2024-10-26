"use client"
import { Home, SettingsIcon, Trash2, } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../ui/button'
import { WorkSpace } from '@prisma/client'


interface Props {
    workspaceId: string
    currWorkSpace: WorkSpace
}


const NativeNavigation = ({ workspaceId, currWorkSpace }: Props) => {
    const pathname = usePathname()
    return (
        <div className=' my-2 space-y-1'>
            <Link href={`/dashboard/${workspaceId}`} className={twMerge(' w-full group flex items-center text-sm hover:bg-slate-900/40 gap-x-2 rounded-lg transition-all', `/dashboard/${workspaceId}` === pathname && "bg-slate-900/40")}>
                <Button variant={"ghost"} className=' w-full p-1.5 flex justify-start gap-x-3'>
                    <Home className='h-5 w-5 fill-slate-500 text-background group-hover:text-white group-hover:fill-background transition-all duration-500' />
                    <p className=' gap-x-4'>My Workspace </p>
                </Button>
            </Link>
            <Link href={`/dashboard/${workspaceId}/settings`} className={twMerge(' w-full group flex items-center text-sm hover:bg-slate-900/40 gap-x-2 rounded-lg transition-all', `/dashboard/${workspaceId}/settings` === pathname && "bg-slate-900/40")}>
                <Button variant={"ghost"} className=' w-full p-1.5 flex justify-start gap-x-3'>
                    <SettingsIcon className='h-5 w-5 fill-slate-500 text-background group-hover:text-white group-hover:fill-background transition-all duration-500' />
                    <p className=' gap-x-4'>Settings</p>
                </Button>
            </Link>
            <Link href={`/dashboard/${workspaceId}/trashed`} className={twMerge(' w-full group flex items-center text-sm hover:bg-slate-900/40 gap-x-2 rounded-lg transition-all', `/dashboard/${workspaceId}/trashed` === pathname && "bg-slate-900/40")}>
                <Button variant={"ghost"} className=' w-full p-1.5 flex justify-start gap-x-3'>
                    <Trash2 className='h-5 w-5 fill-slate-500 text-background group-hover:text-white group-hover:fill-background transition-all duration-500' />
                    <p className=' gap-x-4'>Trash</p>
                </Button>
            </Link>
        </div>
    )
}

export default NativeNavigation