import { z } from "zod";

export const CreateWorkspaceFormValidator = z.object({
    title: z.string().min(2, 'Workspace name must be min of 1 character'),
    isPrivate: z.boolean()
});

export type CreateWorkspaceFormValidatorReqyest = z.infer<typeof CreateWorkspaceFormValidator>
export const UpdateWorkspaceFormValidator = z.object({
    title: z.string().min(2, 'Workspace name must be min of 1 character'),
    workSpaceOwnerId: z.string(),
});

export type UpdateWorkspaceFormValidatorReqyest = z.infer<typeof UpdateWorkspaceFormValidator> 