import { z } from "zod";

export const RemoveCollab = z.object({
    userId: z.string(),
});

export type RemoveCollabReqyest = z.infer<typeof RemoveCollab>


export const AddCollab = z.object({
    workspaceId: z.string(),
    userId: z.string(),
})

export type AddCollabReqyest = z.infer<typeof AddCollab>