import { Server } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next"

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIO
        }
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: Server = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            // @ts-ignore
            addTrailingSlash: false,
        });
        let userCount = 0
        io.on("connection", (s) => {
            userCount++
            s.emit("usercnt", {userCount})
            s.on('create-room', (fileId) => {
                s.join(fileId)
            })
            s.on("send-changes", (deltas, fileId) => {
                s.to(fileId).emit("receive-changes", deltas, fileId)
            })
        })
        res.socket.server.io = io;
    }
    res.end()
}

export default ioHandler;