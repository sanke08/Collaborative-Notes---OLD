import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Loader2, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import axios from 'axios';
import { filter } from 'lodash';

interface Props {
    collaborators?: User[] | [];
    addCollaborator: (collaborator: User) => void;
    removeCollaborator: (userId: string) => void;
    children: React.ReactNode;
}


const CollabaratorSearch = ({ children, addCollaborator, removeCollaborator, collaborators }: Props) => {
    const [users, setUsers] = useState<User[]>([])
    const [keyWard, setKeyward] = useState<string>("")
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            const { data } = await axios.get("/api/user")
            if (data.success) {
                setUsers(data.users)
            } 
            setLoading(false)
        }
        getUser()
    }, [])

    return (
        <Sheet>
            <SheetTrigger className="w-max">{children}</SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Search Collaborator</SheetTitle>
                    <SheetDescription>
                        <div className="text-sm text-muted-foreground">
                            You can also remove collaborators after adding them from the settings tab.
                        </div>
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <div className=' flex gap-3 items-center mt-2'>
                        <Search />
                        <Input value={keyWard} onChange={(e) => setKeyward(e.target.value)} />
                    </div>
                    <div className=' w-full h-full mt-3'>

                        {
                            keyWard ?
                                users && users.filter((user) => user.email.includes(keyWard) || user.name.includes(keyWard)).map((user) => (
                                    <div key={user.id} className=' w-full h-full flex border-b justify-between px-5'>
                                        <div>
                                            <div className=' flex item-center space-x-1'>
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src="/avatars/7.png" />
                                                    <AvatarFallback>CP</AvatarFallback>
                                                </Avatar>
                                                <p>{user.name} </p>
                                            </div>
                                            <div className="text-sm gap-2 overflow-hidden overflow-ellipsis w-[180px] text-muted-foreground " >
                                                {user.email}
                                            </div>
                                        </div>
                                        {
                                            collaborators && collaborators.find((value) => (value.id === user.id)) ?
                                                <Button onClick={() => removeCollaborator(user.id)} className=''>Remove</Button>
                                                :
                                                <Button onClick={() => addCollaborator(user)} variant="secondary">Add</Button>
                                        }
                                    </div>
                                ))
                                :
                                <div>
                                    {
                                        users && users.map((user, i) => {
                                            return (
                                                <div key={user.id} className=' w-full h-full flex border-b justify-between px-5'>
                                                    <div>
                                                        <div className=' flex item-center space-x-1'>
                                                            <Avatar className="w-8 h-8">
                                                                <AvatarImage src="/avatars/7.png" />
                                                                <AvatarFallback>CP</AvatarFallback>
                                                            </Avatar>
                                                            <p>{user.name} </p>
                                                        </div>
                                                        <div className="text-sm gap-2 overflow-hidden overflow-ellipsis w-[180px] text-muted-foreground " >
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                    {
                                                        collaborators && collaborators.find((value) => (value.id === user.id)) ?
                                                            <Button onClick={() => removeCollaborator(user.id)} className=''>Remove</Button>
                                                            :
                                                            <Button onClick={() => addCollaborator(user)} variant="secondary">Add</Button>
                                                    }
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                        }


                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CollabaratorSearch