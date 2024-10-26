import React from 'react'
import Logo from "../../../../public/cypresslogo.svg"
import Image from 'next/image'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' md:w-1/2 lg:w-1/3 sm:w-2/3 mx-auto h-full p-14'>
            <div className=' w-full'>
                <div>
                    <div className=' relative w-20 h-20 flex gap-3 items-center'>
                        <Image src={Logo} alt='Cypress' className=' h-full w-full object-contain' />
                        <p className=' text-3xl font-semibold'>cypress.</p>
                    </div>
                    <p className=' text-neutral-400/50 text-sm mt-1'> An all-In-One Collaboration and Productivity Platform</p>
                </div>
            </div>
            <div className=' mt-5 w-full'>
                {children}
            </div>
        </div>
    )
}

export default layout