import ErrorField from "@/components/ErrorField"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Loader2, X } from "lucide-react"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"
import { useOnClickOutside } from "usehooks-ts"




interface Props {
    isEditing: boolean
    setText: (text: string) => void
    text: string
    updateerror: string
    updateLoading: boolean
    handleUPdate: () => void
    handleCloseEditFolder: () => void
    listType: "folder" | "file"

}
export const Editing = ({ text, setText, isEditing, updateerror, updateLoading, handleUPdate, handleCloseEditFolder, listType }: Props) => {
    const ref = useRef(null)
    useOnClickOutside(ref, handleCloseEditFolder)
    return (
        <div ref={ref} className={twMerge(" overflow-hidden w-full transition-all duration-300 flex gap-x-3", isEditing ? " h-[50px] mt-1 p-[5px]" : "h-[0px] mt-0 p-[0px]", updateerror && "h-[60px]", listType === "file" && isEditing && " pl-5 pr-3")}>
            <div className=' w-full'>
                <Input placeholder='Folder Title' value={text} onChange={(e) => setText(e.target.value)} className=' w-full' />
                {updateerror && <ErrorField error={updateerror} className=' text-start text-[0.66rem]' />}
            </div>
            <div className=' items-center w-4'>
                {
                    updateLoading ?
                        <Button variant={"ghost"} disabled className=' w-fit h-fit p-0'>
                            <Loader2 className=' h-4 w-4 animate-spin' />
                        </Button>
                        :
                        <Button onClick={handleUPdate} variant={"ghost"} disabled={text.length === 0} className={twMerge(' w-fit h-fit p-0', text.length > 0 && "bg-green-500")} >
                            <Check className=' h-4 w-4 text-muted-foreground hover:text-white' />
                        </Button>
                }
                <Button variant={"ghost"} onClick={handleCloseEditFolder} className=' w-fit h-fit p-0'>
                    <X className=' h-4 w-4 text-muted-foreground hover:text-white' />
                </Button>
            </div>
        </div>
    )
}


