import { useDeleteTask } from "@/lib/hooks/useTasks";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteConfirmPopupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTaskId: string;
}



const DeleteConfirmPopup = ({ open, setOpen, selectedTaskId }: DeleteConfirmPopupProps) => {
    const queryclient = useQueryClient();
    const postAction=()=>{
      queryclient.invalidateQueries({queryKey:["all-tasks"]})
    }

    const { mutate: deleteTask, isPending, isError } = useDeleteTask(postAction)

    const handleDeleteTask = () => {
        if (selectedTaskId !== "") {
            deleteTask(selectedTaskId)
            setOpen(false);
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task
                        from the server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row gap-2 w-full">
                    <Button
                        variant="link"
                        className="hover:no-underline hover:text-blue-500 w-full"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteTask} className="w-full">
                        {
                            (isPending && !isError) ? <div className="flex gap-2">
                                <Loader2 className=" animate-spin w-4 h-4 mr-2" /> Deleting...
                            </div> : <div>Delete</div>
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export default DeleteConfirmPopup;
