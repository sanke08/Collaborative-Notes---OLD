import TitleSection from '@/components/landingPage/TitleSection'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { Suspense, use } from 'react'
import banner from "../../../public/appBanner.png"
import { CLIENTS, USERS } from '@/lib/constants'
import calender from "../../../public/cal.png"
import CustomCard from '@/components/landingPage/CustomCard'
import { getServerSideUser } from '@/hook/getServerSideUser'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const page = async () => {
    const { user } = await getServerSideUser()
    if (user) {
        const workspace = await db.workSpace.findFirst({
            where: { workSpaceOwnerId: user.id }
        })
        return redirect("/dashboard/" + workspace?.id)
    }
    return (
        <Suspense fallback={<p className=' p-5 bg-red-400'>Loading</p>} >

            <div className=' flex flex-col items-center w-full overflow-hidden h-full'>
                <TitleSection pill="✨ Your Workspace, Perfected" title="All-In-One Collaboration and Productivity Platform" />
                <Link href={"/auth?signin"} className=' w-[50%] border-2 border-purple-950 text-2xl bg-background rounded-xl p-10 text-center'>
                    Get Cypress Free
                </Link>
                <div className=' relative'>
                    <Image src={banner} alt='Banner' className=' w-full h-full object-contain' />
                    <div className=' bg-gradient-to-t from-background w-full absolute bottom-0 left-0 top-1/2 z-10' />
                </div>
                <div className=' relative '>
                    <div className=' flex flex-nowrap animate-slide gap-x-28 overflow-hidden px-20'>
                        {
                            CLIENTS.map((client, i) => (
                                <div key={i} className=' w-28'>
                                    <Image src={client.logo} alt='clt' />
                                </div>
                            ))
                        }
                    </div>
                    <div className=' w-full flex justify-center'>
                        <div className=' absolute w-[30%] h-32 blur-[100px] bg-purple-950 -z-10 top-40 rounded-full mx-auto' />
                    </div>
                </div>
                <TitleSection
                    title="Keep track of your meetings all in one place"
                    subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
                    pill="Features"
                />
                <div className=' w-[50%] border-4 rounded-lg'>
                    <Image src={calender} alt='cal' className=' rounded-lg' />
                </div>
                <div className=' w-full relative'>
                    <TitleSection
                        title="Trusted by all"
                        subheading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs."
                        pill="Testimonials"
                    />
                    <div className='animate-slide-reverse w-full flex gap-5'>
                        {
                            USERS.map((user, i) => (
                                <CustomCard key={i} user={user} index={i} />
                            ))
                        }
                    </div>
                    <div className='animate-slide w-full flex gap-5 mt-5'>
                        {
                            USERS.map((user, i) => (
                                <CustomCard key={i} user={user} index={i} />
                            ))
                        }
                    </div>

                    <div className=' w-full flex justify-center'>
                        <div className=' absolute w-[30%] h-32 blur-[100px] bg-purple-950 -z-10 top-40 rounded-full mx-auto' />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default page