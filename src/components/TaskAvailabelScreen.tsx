// TaskAvailableScreen.tsx
import React from "react";
import TaskCard from "./TaskCard";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

interface Task {
  title: string,
  time: string,
  category: string,
  priority: string,
  _id: string,
  date:string,
}

interface TaskAvailableScreenProps {
  taskData: Task[];
}

const TaskAvailableScreen: React.FC<TaskAvailableScreenProps> = ({ taskData }) => {
  const [check, setCheck] = React.useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState("");
  return (
    <>
      <div className="flex flex-col gap-2 w-full overflow-y-auto sm:h-[67dvh] h-[50dvh]">
        <h4>Today</h4>
        {/* task card */}
        {taskData?.map((task, index) => {
          const isChecked = check.includes(task._id);
          return (
            <TaskCard
              key={index}
              task={task}
              check={check}
              setCheck={setCheck}
              ischecked={isChecked}
              setOpen={setShowDeleteConfirm}
              open={showDeleteConfirm}
              setSelectedTaskId={setSelectedTaskId}
            />
          );
        })}
      </div>
      {showDeleteConfirm && (
        <DeleteConfirmPopup
          setOpen={setShowDeleteConfirm}
          open={showDeleteConfirm}
          selectedTaskId={selectedTaskId}
        />
      )}
    </>
  );
};


export default TaskAvailableScreen;