import AxiosInstance from "../axios"
import { FormDataType } from "../types/tasks"


// get all tasks
export const getAllTask = async (search:string) => {
    const response = await AxiosInstance({
        url: `getTasks?q=${search}`,
        method: "GET",
    })
    return response.data
}

// add new tasks
export const AddNewTask = async (formData: FormDataType) => {
    return AxiosInstance({
        url: "addTask",
        method: "POST",
        data: formData,
    })
}


// delete task 
export const DeleteTask = async(TaskId:string)=>{
    return AxiosInstance({
        url:`deleteTask/${TaskId}`,
        method:"DELETE"
    })
}