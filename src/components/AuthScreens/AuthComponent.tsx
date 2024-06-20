import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { AtSign, Lock, User } from 'lucide-react';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';


interface AuthComponentProps {
    form: any;
    authScreen: string | string[] | undefined;
    onSubmit: (values: { name?: string, email: string; password: string, confirmPassword?: string; }) => void;
}

const AuthComponent = ({ form, authScreen, onSubmit }: AuthComponentProps) => {
    return (
        <div className='flex flex-col gap-10 bg-[#221f32] sm:w-[40%] w-full sm:pl-[10%] sm:pr-8 px-8 sm:px-0 h-full' >
        <h2 className='text-2xl font-bold text-white text-center sm:mt-36 mt-8 tracking-[3px]'>
            {authScreen === "Signup" ? " Sign Up" : " Sign In"}
        </h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 text-white">
                {
                    authScreen === "Signup" &&
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='relative'>
                                        <User className='absolute text-center  mt-2 pl-2' color='#9fa0b2' />
                                        <Input
                                            placeholder={"Enter Full Name"}
                                            {...field}
                                            className='bg-transparent placeholder:text-[#9fa0b2]
                      placeholder:text-lg placeholder:font-semibold
                       placeholder:tracking-[3px]
                       text-lg font-semibold pl-8' />

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div>
                                    <AtSign className=' absolute text-center mt-2 pl-2' color='#9fa0b2' />
                                    <Input placeholder="Email address"
                                        {...field}
                                        className='bg-transparent placeholder:text-[#9fa0b2]
                      placeholder:text-lg placeholder:font-semibold
                       placeholder:tracking-[3px]
                       text-lg font-semibold pl-8' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative'>
                                    <Lock className='absolute text-center  mt-2 pl-2' color='#9fa0b2' />
                                    <Input
                                        placeholder={"Password"}
                                        {...field}
                                        className='bg-transparent placeholder:text-[#9fa0b2]
                      placeholder:text-lg placeholder:font-semibold
                       placeholder:tracking-[3px]
                       text-lg font-semibold pl-8' />

                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    authScreen === "Signup" &&
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='relative'>
                                        <Lock className='absolute text-center  mt-2 pl-2' color='#9fa0b2' />
                                        <Input
                                            placeholder={"Confirm Password"}
                                            {...field}
                                            className='bg-transparent placeholder:text-[#9fa0b2]
                      placeholder:text-lg placeholder:font-semibold
                       placeholder:tracking-[3px]
                       text-lg font-semibold pl-8' />

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }
                <Button type="submit" className='bg-[#7155f7] hover:bg-[#7164b4] w-full text-lg font-medium'
                    onClick={() => onSubmit}>
                    {authScreen === "Signup" ? "Create Account" : "Login"}
                </Button>
            </form>
        </Form>
        <div className='flex gap-1.5 items-center justify-center sm:mb-0 mb-8'>
            <p className='text-center text-[#c5c4ca]'>
                {authScreen === "Signup" ? "Already" : " Don't"} have an account?
            </p>
            <Link
                href={authScreen === "Signup" ? "/auth/login" : "/auth/Signup"}
                className='text-[#7155f7]'
                onClick={() => { form.reset(); }}>
                {authScreen === "Signup" ? "Sign In" : "Sign Up"}
            </Link>
        </div>
    </div>
    )
}

export default AuthComponent