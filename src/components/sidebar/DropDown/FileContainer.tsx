import { ScrollArea } from "@/components/ui/scroll-area"
import { File, Folder } from "@prisma/client"
import { twMerge } from "tailwind-merge"
import DropDown from "./DropDown"

interface FileContainerProps {
    folder?: Folder & { Files: File[] }
    toggle: boolean
    workSpaceId: string
}

export const FileContainer = ({ folder, toggle, workSpaceId }: FileContainerProps) => {
    return (
        <ScrollArea className={twMerge(" overflow-hidden transition-all duration-500 ", toggle ? " h-[132px] mt-2" : "h-[0px] -mt-2", toggle && folder?.Files.length === 0 && "h-[20px]")}>
            {
                folder?.Files.length === 0 ?
                    <div>
                        <p className=' text-[0.6rem] text-muted-foreground w-max mx-auto'>Please Create a file </p>
                    </div>
                    :

                    folder?.Files.map((file) => (
                        <DropDown key={file.id} id={file.id} title={file.title} listType={"file"} iconId={''} folderId={folder.id} workSpaceId={workSpaceId} file={file} />
                    ))
            }
        </ScrollArea>
    )
}
