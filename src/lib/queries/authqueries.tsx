import AxiosInstance from "../axios"



// sign-up
export const signUpUser = async (formData: any) => {
   const response = await AxiosInstance({
      method: "POST",
      url: 'user/register',
      data: formData,
   });
   return response.data;
}

// signin

export const signInUser = async (formData: any) => {
   const response = await AxiosInstance({
      method: "POST",
      url: 'user/signin',
      data: formData,
   })
   return response.data;
}