import React from 'react'
import { twMerge } from 'tailwind-merge'

const ErrorField = ({ error, className }: { error: string, className?: string }) => {
  return (
    <p className={twMerge(' text-xs text-red-500 text-right', className)}>{error}</p>
  )
}

export default ErrorField