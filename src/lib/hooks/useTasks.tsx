import { useMutation, useQuery } from "@tanstack/react-query"
import { AddNewTask, DeleteTask, getAllTask } from "../queries/taskqueries"
import { toast } from "@/components/ui/use-toast"


// get all task
export const useGetAlltask = (search: string) => {
    return useQuery({
        queryKey: ["all-tasks", search],
        queryFn: async () => await getAllTask(search),
    })
}


// add new task
export const useAddNewTask = (postAction?: () => void) => {
    return useMutation({
        mutationKey: ['add-new-task'],
        mutationFn: AddNewTask,
        onSuccess() {
            toast({
                title: "Task Added",
                description: "New Task Added Successfully",
            });
            if (postAction) postAction()
        },
        onError(err: any) {
            toast({
                title: 'Error While Submission',
                description: err?.response?.data?.message || "Error in task submission"
            })
        },

    })
}

// delete task 
export const useDeleteTask = (postAction?: () => void) => {
    return useMutation({
        mutationKey: ["delete-task"],
        mutationFn: DeleteTask,
        onSuccess: (data) => {
            toast({
                title: "Task Deleted",
                description: data?.data?.message || "Task Deleted Successfully!"
            })
            if (postAction) postAction()
        },
        onError: (err: any) => {
            toast({
                title: "Failed To Delete!",
                description: err?.response?.data?.message || "Failed to Delete Task"
            })
        }
    })
}
