import Image from 'next/image'
import React from 'react'




const CustomCard = ({ user, index }: { user: { name: string, message: string }, index: number }) => {
    return (
        <div className=' min-w-[400px] rounded-lg overflow-hidden border-purple-950 border-2 p-2 relative'>
            <div className=' flex'>
                <div className=' relative w-12 h-12 overflow-hidden rounded-full object-contain'>
                    <Image src={`/avatars/${index + 1}.png`} alt='' fill className=' h-full w-full object-contain absolute' />
                </div>
                <div>
                    <p>{user.name}</p>
                    <p></p>
                </div>
            </div>
            <div className=' text-sm'>
                {user.message}
            </div>
            <div className=' absolute h-full w-full bg-gradient-to-t from-purple-950 top-1/2 left-0' />
        </div>
    )
}

export default CustomCard