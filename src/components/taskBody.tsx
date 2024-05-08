import { Check, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NoTodo from "../../public/Notask.png";
import React from "react";
import AddTaskForm from "./AddTaskForm";
import TaskAvailableScreen from "./TaskAvailabelScreen";
import Image from "next/image";
import { useGetAlltask } from "@/lib/hooks/useTasks";



const demotaskData = [
  {
    id: "1",
    title: "Buy groceries, but not the milk",
    completed: false,
    deleted: false,
    taskPriority: "high",
    taskCategory: "official",
    taskTime: "12:30 PM",
  },
  {
    id: "2",
    title: "Buy groceries, chocolates",
    completed: false,
    deleted: false,
    taskPriority: "medium",
    taskCategory: "personal",
    taskTime: "12:30 PM",
  },
  {
    id: "3",
    title: "Buy groceries, milk",
    completed: false,
    deleted: false,
    taskPriority: "normal",
    taskCategory: "general",
    taskTime: "12:30 PM",
  },
  {
    id: "4",
    title: "Buy groceries, milk",
    completed: false,
    deleted: false,
    taskPriority: "normal",
    taskCategory: "general",
    taskTime: "12:30 PM",
  },
  {
    id: "5",
    title: "Buy groceries, milk",
    completed: false,
    deleted: false,
    taskPriority: "normal",
    taskCategory: "general",
    taskTime: "12:30 PM",
  },
  {
    id: "6",
    title: "Buy groceries, milk",
    completed: false,
    deleted: false,
    taskPriority: "normal",
    taskCategory: "general",
    taskTime: "12:30 PM",
  },
  {
    id: "7",
    title: "Buy groceries, milk",
    completed: false,
    deleted: false,
    taskPriority: "normal",
    taskCategory: "general",
    taskTime: "12:30 PM",
  },
];

const NotaskScreen = () => {
  return (
    <div>
      <Image src={NoTodo} alt="No-to-do" className="self-center pt-8" />
      <h4 className="text-xl font-semibold text-center">
        No Task added. Enjoy Your Day.
      </h4>
    </div>
  );
};



const TaskBody = ({debouncedSearch}:{debouncedSearch:string}) => {
  const [taskName, setTaskName] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const { data, isLoading } = useGetAlltask(debouncedSearch);

  console.log("data received:", data);
  return (
    <>
      <div className="flex flex-col items-center mt-8 relative w-full h-full">
        {!isLoading && data?.tasks?.length > 0 ? (
          <TaskAvailableScreen taskData={data?.tasks} />
        ) : (
          <div className="flex items-center justify-center">
            <NotaskScreen />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className="flex sm:w-[50%] w-[90%] h-14 items-center justify-center  absolute bottom-2">
          <Plus className="absolute left-2" />
          <Input
            className="border-[#747264] h-full focus:border-none pl-10 pr-20 focus:shadow-lg hover:shadow-lg"
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          {taskName.length > 5 && (
            <Button
              className="absolute right-2 h-10"
              onClick={() => {
                setShowAddForm(true);
              }}
            >
              <Check />
            </Button>
          )}
        </div>
      </div>
      <AddTaskForm
        open={showAddForm}
        setShowAddForm={setShowAddForm}
        taskName={taskName}
      />
    </>
  );
};

export default TaskBody;
