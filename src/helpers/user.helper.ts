"use client"
import { useEffect, useState } from 'react'
import axios, { AxiosError } from "axios"
import { SigninValidatorRequesr, SignupValidatorRequesr } from '@/lib/validators/user.validator'

interface Props {
    data: SignupValidatorRequesr
}

export const SignUpHelper = ({ data }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const FNsignup = async () => {
        setLoading(true)
        const payload: SignupValidatorRequesr = {
            name: data.name,
            password: data.password,
            email: data.email,
        }
        try {
            await axios.post("/api/auth/signup", payload)
            setSuccess(true)
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, FNsignup, error, success }
}

export default SignUpHelper

interface SignProp {
    data: SigninValidatorRequesr
}

export const SignInHelper = ({ data }: SignProp) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [user,setUser]=useState({})
    const [success, setSuccess] = useState(false)
    const FNsignin = async () => {
        setError("")
        setLoading(true)
        const payload: SigninValidatorRequesr = {
            password: data.password,
            email: data.email,
        }
        try {
            const { data } = await axios.post("/api/auth/signin", payload)
            setUser(data.user)
            setSuccess(true)
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, FNsignin, error, success ,user}
}

