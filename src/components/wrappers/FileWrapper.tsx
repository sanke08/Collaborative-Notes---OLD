"use client"
import { GET_FILE_SUCCESS } from '@/redux/constance'
import { File } from '@prisma/client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const FileWrapper = ({ children, file }: { children: React.ReactNode, file: File }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_FILE_SUCCESS, payload: file })
    }, [dispatch, file])
    return (
        <div className=' h-full w-full'>{children}</div>
    )
}

export default FileWrapper