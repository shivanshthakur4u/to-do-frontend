import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Sheet, SheetContent } from "./ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, FolderClosed, Loader2, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { formatDate } from "@/lib/format-date";
import { Input } from "./ui/input";
import { useAddNewTask } from "@/lib/hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";


interface AddtaskForm {
    open: boolean;
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    taskName: string;
}

const AddTaskForm = ({ open, setShowAddForm, taskName }: AddtaskForm) => {
    const queryclient = useQueryClient();
    const timeOptions = [
        { value: "01:00 AM", label: "1:00 AM" },
        { value: "02:00 AM", label: "2:00 AM" },
        { value: "03:00 AM", label: "3:00 AM" },
        { value: "04:00 AM", label: "4:00 AM" },
        { value: "05:00 AM", label: "5:00 AM" },
        { value: "06:00 AM", label: "6:00 AM" },
        { value: "07:00 AM", label: "7:00 AM" },
        { value: "08:00 AM", label: "8:00 AM" },
        { value: "09:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM (Noon)" },
        { value: "01:00 PM", label: "01:00 PM" },
        { value: "02:00 PM", label: "02:00 PM" },
        { value: "03:00 PM", label: "03:00 PM" },
        { value: "04:00 PM", label: "04:00 PM" },
        { value: "05:00 PM", label: "05:00 PM" },
        { value: "06:00 PM", label: "06:00 PM" },
        { value: "07:00 PM", label: "07:00 PM" },
        { value: "08:00 PM", label: "08:00 PM" },
        { value: "09:00 PM", label: "09:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
        { value: "12:00 AM", label: "12:00 PM (Midnight)" },
    ];

    const taskCategoryDemo = [
        {
            id: 1,
            name: "Personal",
            value: "personal",
        },
        {
            id: 2,
            name: "General",
            value: "general",
        },
        {
            id: 3,
            name: "Official",
            value: "official",
        },
    ];

    const taskPriorityDemo = [
        {
            id: 1,
            name: "Normal",
            value: "normal",
        },
        {
            id: 2,
            name: "Medium",
            value: "medium",
        },
        {
            id: 3,
            name: "High",
            value: "high",
        },
    ];

    const formSchema = z.object({
        date: z.string().nonempty("Due date is required"),
        time: z.string().nonempty("Time is required"),
        category: z.string().nonempty("Task category is required"),
        priority: z.string().nonempty("Task priority is required"),
        description: z.string().min(10,
            { message: "Description must be 10 Character longer" }),
        title: z.string()
    });

    // console.log("Task name received:", taskName)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: taskName,
            date: "",
            time: "",
            category: "",
            priority: "",
            description: "",
        },
    });


    const postAction = () => {
        queryclient.invalidateQueries({ queryKey: ["all-tasks"] });
        form.reset();
        setShowAddForm(false);
    }

    const { mutate: addNewTask, isPending, isSuccess } = useAddNewTask(postAction)

    function onSubmit(values: any) {
        // console.log("Form values:", values);
        form.setValue('title', taskName)
        const formValues = form.getValues();
        console.log("Form values using getValues:", formValues);

        addNewTask(formValues)
    }

    const handleCancelClick = () => {
        setShowAddForm(false);
        form.reset();
    };

    return (
        <Sheet open={open} onOpenChange={() => setShowAddForm(false)}>
            <SheetContent
                side={"bottom"}
                className="sm:h-[670px] px-5 items-center justify-center"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-3">
                        <div className="flex gap-4 items-center w-full">
                            <div className="w-3 h-3 rounded-full bg-[#3b3b3b] self-center  mt-1" />
                            <div className="text-3xl font-bold w-full">
                                {
                                    taskName
                                }
                            </div>
                        </div>


                        <FormField
                            control={form.control}
                            name="date"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Due date is required",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem className="flex flex-grow flex-col pt-4">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "bg-white pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "yyyy-MM-dd")
                                                    ) : (
                                                        <span>Due Date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : new Date()}
                                                onSelect={(value) => {
                                                    const formattedDate = formatDate(value);
                                                    form.setValue("date", formattedDate);
                                                }}
                                                disabled={(date) => date <= new Date()}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Time is required",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem className="flex flex-grow flex-col pt-4">
                                    <FormLabel>Due Time</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder="Select"
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                        color: "#5E5E5E",
                                                    }}
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="h-80 overflow-y-hidden">
                                                {timeOptions?.map((value, index) => (
                                                    <SelectItem key={index} value={value?.value}>
                                                        {value?.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="flex flex-grow flex-col pt-4">
                                    <FormLabel>Task Category</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between border px-2 py-1 rounded-md">
                                            <div className="flex gap-5 items-center">
                                                <FolderClosed />
                                                <span>Category</span>
                                            </div>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={taskCategoryDemo[1]?.value}
                                            >
                                                <SelectTrigger className="w-[30%] focus:outline-none">
                                                    <SelectValue
                                                        placeholder="Select"
                                                        style={{
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                            color: "#5E5E5E",
                                                        }}
                                                        {...field}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="h-30 overflow-y-hidden">
                                                    {taskCategoryDemo?.map((value, index) => (
                                                        <SelectItem key={index} value={value?.value}>
                                                            {value?.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem className="flex flex-grow flex-col pt-4">
                                    <FormLabel>Task Priority</FormLabel>
                                    <FormControl>
                                        <div className="flex justify-between border px-2 py-1 rounded-md">
                                            <div className="flex gap-5 items-center">
                                                <Square />
                                                <span>Priority</span>
                                            </div>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={taskPriorityDemo[0]?.value}
                                            >
                                                <SelectTrigger className="w-[30%] focus:outline-none">
                                                    <SelectValue
                                                        placeholder="Select"
                                                        style={{
                                                            fontSize: "16px",
                                                            fontWeight: "500",
                                                            color: "#5E5E5E",
                                                        }}
                                                        {...field}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="h-30 overflow-y-hidden">
                                                    {taskPriorityDemo?.map((value, index) => (
                                                        <SelectItem key={index} value={value?.value}>
                                                            {value?.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Description is required",
                                },
                                minLength: {
                                    value: 10,
                                    message: "Description must be at least 10 characters long.",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem className="flex flex-grow flex-col pt-4">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Enter Task Description (required)"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="self-end justify-end flex">
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    className="hover:no-underline hover:text-blue-500"
                                    variant={"link"}
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex gap-2">
                                    {
                                        isPending && !isSuccess ? (
                                            <div className="flex items-center">
                                                <Loader2 className="animate-spin w-2 h-2 mr-2" /> <span>Submitting</span>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                Save Task{" "}
                                                <span>
                                                    <Check />
                                                </span>
                                            </div>
                                        )
                                    }
                                </Button>

                            </div>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
export default AddTaskForm;
