import { formatToTwelveHrs } from "@/lib/format-date";
import { Checkbox } from "./ui/checkbox";
import { Trash2 } from "lucide-react";
import React from "react";

interface taskCardProps {
  check: Array<string>;
  setCheck: React.Dispatch<React.SetStateAction<Array<string>>>;
  task: {
    title: string,
    time: string,
    category: string,
    priority: string,
    _id: string
  };
  ischecked: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string>>;
}


const TaskCard = ({ check, setCheck, task, ischecked, setOpen, setSelectedTaskId, }: taskCardProps) => {


  const handleCheckboxChange = (taskId: string) => {
    if (check?.includes(taskId)) {
      setCheck(check.filter((item) => item !== taskId));
    } else {
      setCheck([...check, taskId]);
    }
  };

  const handleDeleteClick = (TaskId: string) => {
    setOpen(true)
    setSelectedTaskId(TaskId)
  }

  return (
    <>
      <div
        className={`flex justify-between w-full  p-3 items-center  border rounded-md flex-row ${ischecked && "bg-[#f6f6f6]"
          }`}
      >
        <div className="flex gap-2 items-center">
          <div>
            <Checkbox
              className="rounded-full"
              checked={ischecked}
              onCheckedChange={() => handleCheckboxChange(task._id)}
            />
          </div>
          <div className={`flex flex-col gap-1`}>
            <p
              className={`${ischecked &&
                "line-through text-[#d8d9d9] animate-in duration-300"
                } `}
            >
              {task?.title}
            </p>
            <div className="flex gap-1 text-[#6d7b87]">
              <p
                className={`${ischecked &&
                  "line-through text-[#e7e8e8] animate-in duration-300"
                  } `}
              >
                {formatToTwelveHrs(task?.time)}
              </p>
              <div
                className={`flex h-6 ${ischecked
                  ? "bg-[#e7e8e8] animate-in duration-300"
                  : "bg-[#6d7b87] animate-in duration-300 "
                  } border w-0.5`}
              />
              <p
                className={`${ischecked &&
                  "line-through text-[#e7e8e8] animate-in duration-300"
                  } `}
              >
                {task?.category?.charAt(0).toUpperCase() +
                  task?.category?.slice(1) || ""}
              </p>
            </div>
          </div>
        </div>
        {/* priority/ del button */}
        <div className="flex gap-2 items-center">
          <div
            className={` ${task?.priority === "high"
              ? "bg-[#f5c3c6]"
              : task?.priority === "medium"
                ? "bg-[#fae3a1]"
                : "bg-[#a3c1ed]"
              } h-5 w-5 rounded-sm`}
          />

          {ischecked && (
            <div>
              <Trash2
                color="#ec6666"
                onClick={() => handleDeleteClick(task?._id)}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default TaskCard;
