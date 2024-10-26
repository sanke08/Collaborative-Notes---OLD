"use client"
import React, { useEffect, useState } from 'react'
import { useAction } from './useAction'
import axios from 'axios'
import { User } from '@prisma/client'

const useUser = () => {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get("/api/auth/logged-user")
            if (data.user) {
                return setUser(data.user as User)
            }
        }
        get()
    }, [])
    return user as User
}

export default useUser