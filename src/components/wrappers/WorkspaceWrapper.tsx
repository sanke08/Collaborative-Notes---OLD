"use client"
import { GET_WORKSPACE_SUCCESS } from '@/redux/constance'
import { WorkSpace } from '@prisma/client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const WorkspaceWrapper = ({ children, workspace }: { children: React.ReactNode, workspace: WorkSpace }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_WORKSPACE_SUCCESS, payload: workspace })
    }, [dispatch, workspace])
    return (
        <div className=' h-full w-full'>{children}</div>
    )
}

export default WorkspaceWrapper