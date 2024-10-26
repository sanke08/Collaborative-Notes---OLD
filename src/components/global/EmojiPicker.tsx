'use client';
import React from 'react'
import dynamic from "next/dynamic"
// import { useRouter } from 'next/navigation';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
    children: React.ReactNode;
    getValue?: (emoji: string) => void;
}


const EmojiPicker = ({ children, getValue }: Props) => {
    const Picker = dynamic(() => import('emoji-picker-react'));
    const onClick = (selectedEmoji: any) => {
        if (getValue) getValue(selectedEmoji.emoji);
    };
    return (
        <div className=' h-full'>
            <Popover>
                <PopoverTrigger className='  text-5xl'>{children}</PopoverTrigger>
                <PopoverContent>
                    <Picker onEmojiClick={onClick} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default EmojiPicker