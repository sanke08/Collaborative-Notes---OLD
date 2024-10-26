"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import SignUpHelper from '@/helpers/user.helper'
import ErrorField from '../ErrorField'

const SignUp = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: ""
    })
    const { loading, FNsignup, error } = SignUpHelper({ data: userData })
    
    return (
        <div className={twMerge(' w-full mx-auto')}>
            <div className='  border-2 border-purple-950 p-3 rounded-lg'>
                <Input type='text' value={userData.name} onChange={(e) => setUserData((pre) => ({ ...pre, name: e.target.value }))} placeholder='Name' className='my-2' />
                <Input type="" value={userData.email} onChange={(e) => setUserData((pre) => ({ ...pre, email: e.target.value }))} placeholder='Email' className='my-2' />
                <Input value={userData.password} onChange={(e) => setUserData((pre) => ({ ...pre, password: e.target.value }))} placeholder='Password' className=' my-2' />
                {error && <ErrorField error={error} />}
                <Button isLoading={loading} onClick={FNsignup} className=' w-full hover:scale-[0.99] mt-5'>Sign up</Button>
            </div>
            <div className=' flex mt-1 items-center gap-1'>
                <p className=' text-xs'>Already have account </p>
                <Button disabled={loading} variant={"btn-secondary"} onClick={() => router.push("/auth?signin")} className=' cursor-pointer text-purple-700 border-b w-fit h-fit p-0'>Sign In</Button>
            </div>
        </div>
    )
}

export default SignUp