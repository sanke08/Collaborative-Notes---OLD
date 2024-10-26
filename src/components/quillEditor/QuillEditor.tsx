"use client"
import { File, Folder, User, WorkSpace } from '@prisma/client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'quill/dist/quill.snow.css';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useSocket } from '@/provider/SocketProvider';
import axios from 'axios';
import { Badge } from '../ui/badge';






interface Props {
    fileId: string;
    dirType: 'workspace' | 'folder' | 'file';
    dirDetails: File | Folder | WorkSpace;
    user: User
    // workspace?: WorkSpace
}

var TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
];


const QuillEditor = ({ fileId, dirType, dirDetails, user, }: Props) => {
    const pathname = usePathname();
    const dispatch = useDispatch()
    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const { socket, isConnected } = useSocket()
    const [cnt, setCnt] = useState()
    const [quill, setQuill] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [localCursors, setLocalCursors] = useState<any>([]);
    // const [workspaceState, setWorkspaceState] = useState<WorkSpace>()
    // const [FileState, setFileState] = useState<File>()
    // const [FolderState, setFolderState] = useState<Folder>()
    // const { folder } = useSelector((state: any) => state.folders)
    // const { file } = useSelector((state: any) => state.file)
    const { workspace }: { workspace: WorkSpace } = useSelector((state: any) => state.workspace)


    const details = useMemo(() => {
        return {
            title: dirDetails.title,
            iconId: dirDetails.iconId,
            createdAt: dirDetails.createdAt,
            // @ts-ignore
            data: dirDetails.data,
            inTrash: dirDetails.inTrash,
            bannerUrl: dirDetails.bannerUrl,
        } as WorkSpace | Folder | File;
        //  @ts-ignore
    }, [dirDetails?.bannerUrl, dirDetails?.createdAt, dirDetails?.data, dirDetails?.iconId, dirDetails?.inTrash, dirDetails?.title])

    // const beardCrumb = useMemo(() => {
    //     if (!pathname) return
    //     const segment = pathname.split("/").filter((val) => val !== "dashboard" && val).filter((val) => val !== "").filter((val) => val !== "folder").filter((val) => val !== "file")
    //     const workspaceDetail = workspace?.title

    //     if (segment.length === 1) {
    //         return `${workspaceDetail} /`;
    //     }

    //     const folderDetail = folder?.title
    //     if (segment.length === 2) {
    //         return `${workspaceDetail} / ${folderDetail}`;
    //     }
    //     const fileDetail = file?.title
    //     if (segment.length === 3) {
    //         return `${workspaceDetail} / ${folderDetail} / ${fileDetail}`;
    //     }
    // }, [file?.title, folder?.title, pathname, workspace?.title])

    // useEffect(() => {
    //     setWorkspaceState(workspace)
    //     setFolderState(folder)
    //     setFileState(file)
    // }, [file, folder, workspace])

    const wrapperRef = useCallback(async (wrapper: any) => {
        if (typeof window !== 'undefined') {
            if (wrapper === null) return;
            wrapper.innerHTML = '';
            const editor = document.createElement('div');
            wrapper.append(editor);
            const Quill = (await import('quill')).default;
            const QuillCursors = (await import('quill-cursors')).default;
            Quill.register('modules/cursors', QuillCursors);
            const q = new Quill(editor, {
                theme: 'snow',
                modules: {
                    toolbar: TOOLBAR_OPTIONS,
                    cursors: {
                        transformOnTextChange: true,
                    },
                },
            });
            setQuill(q);
        }
    }, []);

    useEffect(() => {
        let selected;
        if (!fileId) {
            return;
        }
        const fetchinformation = async () => {
            if (dirType === "file") {
                const { data } = await axios.get("/api/file/" + fileId)
                if (!data.success) return
                if (!data.file) {
                    return
                }
                if (quill === null) {
                    return
                }
                quill.setContents(JSON.parse(data.file.data || ""))
            }
            if (dirType === "folder") {
                const { data } = await axios.get("/api/folder/" + fileId)
                if (!data.success) return
                if (!data.folder) return

                if (quill === null)
                    return

                quill.setContents(JSON.parse(data.folder.data || ""))
            }
            if (dirType === "workspace") {
                const { data } = await axios.get("/api/workspace/" + fileId)
                if (!data.success) return
                if (!data.workSpace) {
                    return
                }
                if (quill === null) {
                    return
                }
                quill.setContents(JSON.parse(data.workSpace.data || ""))
            }
        }
        fetchinformation()
    }, [dirType, fileId, quill, workspace])
    // create rppm
    useEffect(() => {
        if (socket === null || quill === null || !fileId) return;
        socket.emit('create-room', fileId);
    }, [fileId, quill, socket])

    // send changes
    useEffect(() => {
        if (quill === null) return;
        const quillHandler = async (delta: any, oldDelta: any, source: any) => {
            if (source !== 'user') return;
            setSaving(true);
            saveTimerRef.current = setTimeout(async () => {
                const contents = quill.getContents();
                const quillLength = quill.getLength();
                if (contents && quillLength !== 1 && fileId) {
                    if (dirType === 'workspace') {
                        await axios.patch("/api/workspace/" + fileId, { data: JSON.stringify(contents) })
                    }
                    if (dirType === "folder") {
                        await axios.patch("/api/folder/" + fileId, { data: JSON.stringify(contents) })
                    }
                    if (dirType === "file") {
                        await axios.patch("/api/file/" + fileId, { data: JSON.stringify(contents) })
                    }
                }
                setSaving(false);
            }, 1000)
            socket.emit('send-changes', delta, fileId);
        }
        quill.on("text-change", quillHandler)
        return () => {
            quill.off('text-change', quillHandler);
            clearTimeout(saveTimerRef.current)
        };
    }, [dirType, fileId, quill, socket, user])

    useEffect(() => {
        if (quill == null || socket == null) return;
        const socketHandler = (deltas: any, id: string) => {
            if (id === fileId) {
                quill.updateContents(deltas);
            }
        };
        socket.on("receive-changes", socketHandler);
        return () => {
            socket.off("receive-changes");
        };
    }, [fileId, quill, socket])



    return (
        <>
            <div className=' w-full flex justify-end items-center'>
                <div className=' relative w-10 h-10 overflow-hidden rounded-full pr-5'>
                    <Image src={"/avatars/1.png"} alt={''} fill className=' absolute w-full h-full' />
                </div>
            </div>
            {details.inTrash && (
                <div className="py-1 z-40 bg-[#EB5757] flex md:flex-row flex-col justify-center items-center gap-4 flex-wrap" >
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center" >
                        <span className="text-white"> This {dirType} is in the trash. </span>
                        <Button size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#EB5757] p-1 h-fit">
                            Restore</Button>
                        <Button size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#EB5757] p-1 h-fit"              >
                            Delete
                        </Button>
                    </div>
                    <span className="text-sm text-white">{details.inTrash}</span>
                </div>
            )}
            {/* <div>{beardCrumb}</div> */}
            {saving ? (
                <Badge
                    variant="secondary"
                    className="bg-orange-600 top-4
                text-white
                right-4
                z-50
                "
                >
                    Saving...
                </Badge>
            ) : (
                <Badge
                    variant="secondary"
                    className="bg-emerald-600 
                top-4
              text-white
              right-4
              z-50
              "
                >
                    Saved
                </Badge>
            )}
            {cnt}
            <div className=' flex justify-center items-center  relative flex-col w-full '>
                <div id='container' ref={wrapperRef} className=' w-[80%] border-none'>

                </div>
            </div>
        </>
    )
}

export default QuillEditor