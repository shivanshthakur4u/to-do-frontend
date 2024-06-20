import { useMutation } from "@tanstack/react-query"
import { signInUser, signUpUser } from "../queries/authqueries"
import { toast } from "@/components/ui/use-toast"

// Signup Hook
export const useSignUp = (postAction?: () => void) => {
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: signUpUser,
        onSuccess: (data) => {
            toast({
                variant: "success",
                title: "SignUp Successful",
                description: "You have successfully created an account"
            })
            if (postAction) postAction()
        },
        onError: (err: any) => {
            console.log("error:", err)
            toast({
                variant: "destructive",
                title: "SignUp Failed",
                description: err?.response?.data?.message || "Some Error Occured While creating Account"
            })
        }
    })
}


export const useSignIn = (postAction?: () => void) => {
    return useMutation({
        mutationKey: ["signin"],
        mutationFn: signInUser,
        onSuccess: () => {
            toast({
                variant: "success",
                title: "SignIn Successful",
                description: "You have successfully Signin"
            })
            if (postAction) postAction()
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "SignIn Failed",
                description: err?.response?.data?.message  || "Some Error Occured While SigningIn" 
            })
            console.log("error", err)
        }
    })
}