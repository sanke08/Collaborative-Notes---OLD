"use client"
import { CreateWorkspaceFormValidatorReqyest } from "@/lib/validators/workSpace.validator"
import axios from "axios"
import { useCallback, useState } from "react"

export const CreateWorkspacehelper = ({ FN }: { FN: () => Promise<any> }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    // const FNCreateWorkSpace = async () => {
    //     try {
    //     setLoading(true)
            // const payload: CreateWorkspaceFormValidatorReqyest = {
            //     title: data.title,
            //     workSpaceOwnerId: data.workSpaceOwnerId,
            //     iconId: data.iconId
            // }
    //         await axios.post("/api/workspace", payload)
    //         setSuccess(true)
    //     } catch (error: any) {
    //         setError(error.response.data.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    // const execute = useCallback(async (input: CreateWorkspaceFormValidatorReqyest) => {
    //     setLoading(true)
    //     try {
    //         await FN(input);
    //         setSuccess(true)
    //     } catch (error: any) {
    //         setError(error.response.data.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }, [FN])

    const execute = async (data: CreateWorkspaceFormValidatorReqyest) => {
        setLoading(true)
        try {
            await FN()
            setSuccess(true)
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, success, execute }
}