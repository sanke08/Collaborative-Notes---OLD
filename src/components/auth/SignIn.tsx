"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter,  } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { SignInHelper } from '@/helpers/user.helper'
import ErrorField from '../ErrorField'


const SignIn = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const { success, error, loading, FNsignin, user } = SignInHelper({ data: userData })
    useEffect(() => {
        console.log(success)
                if (success) { router.push("/dashboard") }
    }, [router, success])

    return (
        <div className={twMerge(' w-full mx-auto')}>
            <div className='  border-2 border-purple-950 p-3 rounded-lg'>
                <Input type="email" value={userData.email} onChange={(e) => setUserData((pre) => ({ ...pre, email: e.target.value }))} placeholder='Email' className='my-2' />
                <Input type="password" value={userData.password} onChange={(e) => setUserData((pre) => ({ ...pre, password: e.target.value }))} placeholder='Password' className=' my-2' />
                {error && <ErrorField error={error} />}
                <Button isLoading={loading} onClick={FNsignin} className=' w-full hover:scale-[0.99] mt-5'>Sign in</Button>
            </div>
            <div className=' flex mt-1 items-center gap-1'>
                <p className=' text-xs'>Already have account </p>
                <p onClick={() => router.push("/auth?signup")} className=' cursor-pointer text-purple-700 border-b'>Sign In</p>
            </div>
        </div>


    )
}

export default SignIn