"use client"
import { useCallback, useEffect, useState } from "react"
import { tuple } from "zod"

export const useAction = ({ FN }: { FN: () => Promise<any> }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const execute = async (data?: any) => {
        setLoading(true)
        try {
            setSuccess(false)
            setError("")
            await FN()
            setSuccess(true)
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    const reset = () => {
        setError("")
        setSuccess(false)
        setLoading(false)
    }
    useEffect(() => {
        if (success) {
            setError("")
            setSuccess(true)
            setSuccess(false)
        }
  
    }, [success])
    return { loading, error, success, execute, reset }
}