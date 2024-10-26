import { z } from "zod";

export const CreateFolderFormValidator = z.object({
    title: z.string().min(1, 'Folder name must be min of 1 character'),
    workSpaceId: z.string()
});

export type CreateFolderFormValidatorReqyest = z.infer<typeof CreateFolderFormValidator> 


export const UpdateFolderFormValidator = z.object({
    title: z.string().min(1, 'Folder name must be min of 1 character'),
    workSpaceId: z.string()
});

export type UpdateFolderFormValidatorReqyest = z.infer<typeof UpdateFolderFormValidator> 
