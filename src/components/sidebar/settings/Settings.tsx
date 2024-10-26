import React from 'react'
import { Collabration, User, WorkSpace } from '@prisma/client';
import UpdateTitle from './UpdateTitle';
import CollabButton from './CollabButton';
import Image from 'next/image';



interface Props {
    currWorkSpace: WorkSpace
    collabratives?: Array<Collabration & { user: User }>
    users?: User[]
    user?: User
}


const Settings = ({ currWorkSpace, collabratives, user: currUser, users }: Props) => {

    return (
        <>
            <p className=' text-muted px-2 w-max mx-auto pt-1 border-b pb-2'>Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too.</p>
            <UpdateTitle workspaceId={currWorkSpace.id} workspaceTitle={currWorkSpace.title} />
            <div className=' flex gap-x-5 px-10'>
                <div className=' mt-5 w-full pr-10'>
                    <p>collabratives</p>
                    <div className=' border p-2 rounded-lg mt-2'>
                        {
                            collabratives?.map((collab,i) => (
                                <div key={collab.id} className=' w-full h-full flex justify-between px-5 my-1 border-b pb-1'>
                                    <div>
                                        <div className=' flex item-center space-x-1'>
                                            <div className=' w-7 h-7 relative overflow-hidden rounded-full'>
                                                <Image src={`/avatars/${i + 1}.png`} alt='' fill className=' w-full absolute' />
                                            </div>
                                            <p>{collab.user.name} </p>
                                        </div>
                                        <div className="text-sm gap-2 overflow-hidden overflow-ellipsis w-[180px] text-muted-foreground " >
                                            {collab.user.email}
                                        </div>
                                    </div>
                                    <CollabButton collabId={collab.id} currUserId={currUser?.id || ""} userId={collab.userId} isalready workspaceId={collab.workSpaceId} />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className=' w-full mt-5'>
                    <p>Add Collabrators</p>
                    <div className=' border p-2 rounded-lg mt-2'>
                        {
                            users && users.map((user, i) => {
                                const isalready = !!collabratives?.find((collab) => collab.userId === user.id)
                                const collabId = collabratives?.find((collab) => collab.userId === user.id)?.id
                                return <div key={user.id} className=' w-full h-full flex justify-between px-5 my-1 border-b pb-1'>
                                    <div>
                                        <div className=' flex item-center space-x-1'>
                                            <div className=' w-7 h-7 relative overflow-hidden rounded-full'>
                                                <Image src={`/avatars/${i + 1}.png`} alt='' fill className=' w-full absolute' />
                                            </div>
                                            <p>{user.name} </p>
                                        </div>
                                        <div className="text-sm gap-2 overflow-hidden overflow-ellipsis w-[180px] text-muted-foreground " >
                                            {user.email}
                                        </div>
                                    </div>
                                    <CollabButton collabId={collabId || ""} currUserId={currUser?.id || ""} userId={user.id} isalready={isalready} workspaceId={currWorkSpace.id} />
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings