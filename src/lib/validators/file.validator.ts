import { z } from "zod";

export const CreateFileFormValidator = z.object({
    title: z.string().min(1, 'File name must be min of 1 character'),
    folderId: z.string(),
    workSpaceId: z.string(),
});

export type CreateFileFormValidatorReqyest = z.infer<typeof CreateFileFormValidator>


export const UpdateFileFormValidator = z.object({
    title: z.string().min(1, 'File name must be min of 1 character'),
});

export type UpdateFileFormValidatorReqyest = z.infer<typeof UpdateFileFormValidator> 
