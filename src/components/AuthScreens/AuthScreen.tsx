'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import AuthImage from "../../../public/authImage.png"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import AuthComponent from './AuthComponent'
import { useSignIn, useSignUp } from '@/lib/hooks/useAuth'

const AuthScreen = () => {
    const router = useRouter();
    const { authScreen } = router.query;

    const formSchema = z.object({
        email: z.string().email({ message: "Invalid Email" }),
        password: z.string().refine(value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value ?? ""), {
            message: "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"
        }),
        name: authScreen === "Signup" ? z.string().min(8, { message: "Full Name must be longer than 8 characters" }) : z.string().min(8, { message: "Full Name must be longer than 8 characters" }).optional(),
        confirmPassword: authScreen === "Signup" ? z.string({ message: "Confirm password is required" }) : z.string({ message: "Confirm password is required" }).optional()
    });

    if (authScreen === "Signup") {
        formSchema.refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }

    type DefaultValues = {
        email: string;
        password: string;
        name?: string;
        confirmPassword?: string;
    };

    let defaultValues: DefaultValues = {
        email: "",
        password: "",
    };

    if (authScreen === "Signup") {
        defaultValues = {
            ...defaultValues,
            name: "",
            confirmPassword: "",
        };
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const PostAction = () => {
        router.push("/");
    };

    const { mutate: Signup, data: signUpData } = useSignUp(PostAction);
    const { mutate: Signin, data: signInData } = useSignIn(PostAction);

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (authScreen === "Signup") {
            const { confirmPassword, ...dataToSend } = values;
            Signup(dataToSend);
        } else if (authScreen === "login") {
            Signin(values);
        }
    }

    useEffect(() => {
        if (signUpData?.userData) {
            localStorage.setItem("UserDetails", JSON.stringify(signUpData.userData));
        } else if (signInData?.userData) {
            localStorage.setItem("UserDetails", JSON.stringify(signInData.userData));
        }
    }, [signUpData, signInData]);

    return (
        <div className='flex sm:flex-row flex-col w-full h-screen'>
            <div className='flex sm:w-[60%] w-full bg-[#d9d9d9] h-full'>
                <Image src={AuthImage} alt="auth-image" className='w-full object-contain' />
            </div>
            <AuthComponent onSubmit={onSubmit} authScreen={authScreen} form={form} />
        </div>
    );
}

export default AuthScreen;
