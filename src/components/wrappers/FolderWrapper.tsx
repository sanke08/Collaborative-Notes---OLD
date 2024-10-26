"use client"
import {  GET_FOLDERS_SUCCESS } from '@/redux/constance'
import { Folder } from '@prisma/client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const FolderWrapper = ({ children, folder }: { children: React.ReactNode, folder: Folder }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_FOLDERS_SUCCESS, payload: folder })
    }, [dispatch, folder])
    return (
        <div className=' h-full w-full'>{children}</div>
    )
}

export default FolderWrapper