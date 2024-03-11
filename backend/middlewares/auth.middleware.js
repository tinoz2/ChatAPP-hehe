import z from 'zod'

export const validateRegister = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email(5, {
        message: 'Email must be at least 5 characters',
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characters',
    }),
    name: z.string({
        required_error: 'Name is required',
    }).min(3, {
        message: 'Name must be at least 3 characters',
    })
})

export const validateLogin = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email(5, {
        message: 'Email must be at least 5 characters',
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characters',
    })
})