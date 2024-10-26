import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { twMerge } from 'tailwind-merge'
import { MoreVertical } from 'lucide-react';

interface Props {
    header?: string;
    content?: React.ReactNode;
    children: React.ReactNode;
    description?: string;
    className?: string;
}


const CustomDialogTrigger = ({ header, content, children, description, className }: Props) => {
    return (
        <Dialog >
            <DialogTrigger className={twMerge(" w-full rounded-lg ", className)}>{children} </DialogTrigger>
            <DialogContent className=' sm:h-[450px] overflow-scroll h-screen block'>
                <DialogHeader>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialogTrigger