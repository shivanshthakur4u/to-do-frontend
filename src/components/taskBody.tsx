import { Check, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NoTodo from "../../public/Notask.png";
import React, { useCallback, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskAvailableScreen from "./TaskAvailabelScreen";
import Image from "next/image";
import { useGetAlltask } from "@/lib/hooks/useTasks";
import TaskCardLoader from "./TaskCardLoader";





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



const TaskBody = ({ debouncedSearch }: { debouncedSearch: string }) => {
  const [taskName, setTaskName] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const { data, isLoading } = useGetAlltask(debouncedSearch);

  // console.log("data received:", data);
  //  console.log("task name:", taskName);

  const handleChange = useCallback((e: any) => {
    setTaskName(e.target.value);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center mt-8 relative w-full h-full">
        {isLoading ?
          <div className="flex flex-col gap-2 w-full">
            {Array(4)
              .fill(undefined)
              .map((_, index) => (
                <TaskCardLoader key={index} />
              ))}

          </div> : !isLoading && data?.tasks?.length > 0 ? (
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
            onChange={handleChange}
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
