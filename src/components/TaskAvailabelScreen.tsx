import React from "react";
import TaskCard from "./TaskCard";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

interface Task {
  title: string;
  time: string;
  category: string;
  priority: string;
  _id: string;
  date: string;
}

interface TaskAvailableScreenProps {
  taskData: Task[];
}

const TaskAvailableScreen: React.FC<TaskAvailableScreenProps> = ({ taskData }) => {
  const [check, setCheck] = React.useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState("");

  const formatDateLabel = (taskDate: string) => {
    const today = new Date();
    const taskDateObj = new Date(taskDate);
    const timeDiff = taskDateObj.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayDiff === 0) {
      return "Today";
    } else if (dayDiff === 1) {
      return "Tomorrow";
    } else if (dayDiff > 1) {
      return taskDateObj.toLocaleDateString(); 
    } else {
      return "Past"; 
    }
  };

  const groupTasksByDate = (tasks: Task[]) => {
    return tasks.reduce((acc: { [key: string]: Task[] }, task) => {
      const dateLabel = formatDateLabel(task.date);
      if (!acc[dateLabel]) {
        acc[dateLabel] = [];
      }
      acc[dateLabel].push(task);
      return acc;
    }, {});
  };

  const groupedTasks = groupTasksByDate(taskData);

  const sortDateLabels = (labels: string[]) => {
    const today = new Date().toLocaleDateString();
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString();

    return labels.sort((a, b) => {
      if (a === "Today") return -1;
      if (b === "Today") return 1;
      if (a === "Tomorrow") return -1;
      if (b === "Tomorrow") return 1;
      if (a === "Past") return -1;
      if (b === "Past") return 1;
      if (a === b) return 0;
      return new Date(a).getTime() - new Date(b).getTime();
    });
  };

  const sortedDateLabels = sortDateLabels(Object.keys(groupedTasks));

  return (
    <>
      <div className="flex flex-col gap-2 w-full overflow-y-auto sm:h-[67dvh] h-[50dvh]">
        {sortedDateLabels.map((dateLabel, index) => (
          <div key={index} className="flex flex-col gap-1">
            <h4 className="text-base font-bold mt-1">{dateLabel}</h4>
            {groupedTasks[dateLabel].map((task) => {
              const isChecked = check.includes(task._id);
              return (
                <TaskCard
                  key={task._id}
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
        ))}
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
