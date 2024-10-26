import ErrorField from '@/components/ErrorField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2, X } from 'lucide-react';
import React, { useRef } from 'react'
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from 'usehooks-ts';



interface Props {
    listType: 'folder' | 'file';
    addFileToggle: boolean
    fileTitle: string
    fileError: string
    setFileTitle: (text: string) => void
    addFile: () => void
    handleCloseAddFile: () => void
    fileLoading: boolean
    text: string
}


const AddFile = ({ listType, addFileToggle, fileError, fileTitle, setFileTitle, addFile, fileLoading, handleCloseAddFile, text }: Props) => {
    const ref = useRef(null)
    useOnClickOutside(ref, handleCloseAddFile)
    return (
        <>
            {
                listType === "folder" &&
                <div ref={ref} className={twMerge('rounded transition-all flex duration-500 gap-2 overflow-hidden', addFileToggle ? " h-[50px] mt-1 p-[5px]" : " h-[0px] mt-0 p-[0px]", fileError && addFileToggle && "h-[60px]")}>
                    <div className=''>
                        <Input placeholder='File Title' value={fileTitle} onChange={(e) => setFileTitle(e.target.value)} />
                        {fileError && <ErrorField error={fileError} className=' text-start text-[0.66rem]' />}
                    </div>
                    <div className=' items-center w-6'>
                        {
                            fileLoading ?
                                <Loader2 className=' h-4 w-4 animate-spin' />
                                :
                                <Button onClick={() => addFile()} variant={"ghost"} disabled={fileTitle.length === 0} className={twMerge(' w-fit h-fit p-0', text.length > 0 && "bg-green-500")} >
                                    <Check className=' h-4 w-4 text-muted-foreground hover:text-white' />
                                </Button>
                        }
                        <Button variant={"ghost"} onClick={handleCloseAddFile} className=' w-fit h-fit p-0'>
                            <X className=' h-4 w-4 text-muted-foreground hover:text-white' />
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default AddFile
