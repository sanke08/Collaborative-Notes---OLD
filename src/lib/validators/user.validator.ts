import { z } from "zod";

export const SignupValidator = z.object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z
        .string()
        .describe('Password')
        .min(6, 'Password must be minimum 6 characters'),
    name: z
        .string()
        .min(3, 'Name must be minimum 3 characters'), 
}) 
export type SignupValidatorRequesr=z.infer<typeof SignupValidator>

export const SigninValidator = z.object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z
    .string()
    .describe('Password')
    .min(6, 'Password must be minimum 6 characters'),
    
}) 
export type SigninValidatorRequesr=z.infer<typeof SigninValidator>