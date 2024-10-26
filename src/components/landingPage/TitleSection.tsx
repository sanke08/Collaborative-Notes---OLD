import React from 'react'

interface Props {
    title: string
    subheading?: string
    pill: string
}


const TitleSection = ({ title, subheading, pill }: Props) => {
    return (
        <div className=' w-full p-5 py-10'>
            <div className=' my-2 w-max md:mx-auto border-purple-400 border shadow shadow-purple-800 rounded-full p-1'>
                {pill}
            </div>
            <div className=' text-5xl text-center lg:w-[50%] mx-auto'>
                {title}
            </div>
            <div className=' text-neutral-400/50 md:w-[70%] mx-auto mt-5 text-center'>
                {subheading}
            </div>
        </div>
    )
}

export default TitleSection