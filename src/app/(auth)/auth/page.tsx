'use client'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    if (!searchParams?.has("signup") && !searchParams?.has("signin")) {
      router.replace("/auth?signin")
    }
  }, [router, searchParams])
  return (

    <div>
      {
        searchParams?.has("signup") &&
        <SignUp />
      }
      {
        searchParams?.has("signin") &&
        <SignIn />
      }
    </div>
  )
}

export default Page