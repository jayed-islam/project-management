import { IProject, Task, TaskStatus } from "@/types/project";
import { calculateDeadline, formatTimestamp } from "@/utils/app-utils";
import useProjectStore from "@/zustand/project-state";
import { Avatar, Button, Card, Col, Drawer, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { CommentOutlined, PlusOutlined } from "@ant-design/icons";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import useBoolean from "@/hooks/use-boolean";
import AddMemberModal from "./member-add-modal";
import { useEditProject } from "@/api/projects/use-projects";

interface IProjectDetailProps {
  project: IProject;
}

const ProjectDetails = ({ project }: IProjectDetailProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTaskList, setSelectedTaskList] = useState<null | string>(null);
  const {
    project: projec,
    setProject,
    getTaskLists,
    addTaskToProject,
    moveTaskInProject,
  } = useProjectStore();
  const [isAddTask, setIsAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { mutate: editProject, isLoading, isError } = useEditProject();

  const drawer = useBoolean();
  const addMember = useBoolean();

  useEffect(() => {
    if (project) {
      setProject(project);
    }
  }, [project, setProject]);

  const handleAddTask = (status: TaskStatus) => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        title: newTaskTitle,
        description: "",
        status: status,
      };
      addTaskToProject(newTask);
      setNewTaskTitle("");
      editProject({ id: projec._id, updatedProject: projec });
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    const sourceTasks = getTaskLists().find(
      (taskList) => taskList.name === source.droppableId
    )?.tasks;
    const destinationTasks = getTaskLists().find(
      (taskList) => taskList.name === destination.droppableId
    )?.tasks;

    if (!sourceTasks || !destinationTasks) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const updatedTasks = Array.from(sourceTasks);
      const [removed] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removed);
      moveTaskInProject(removed._id!, removed.status);
    } else {
      const task = sourceTasks[source.index];
      moveTaskInProject(task._id!, destination.droppableId);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold">Project</h3>
      <div className="flex items-start gap-11 mt-11">
        <div className="border rounded-md w-full md:w-[271px] p-5">
          <div className="w-full ">
            <h3 className="text-md font-semibold mb-2 bg-gray-100 px-2 py-1">
              Team Members
            </h3>
            {project?.members.map((member, index) => (
              <h2 key={index}>
                <span>{index + 1}, </span>
                {member.name}
              </h2>
            ))}
          </div>
          {project?.recentActivities &&
            project?.recentActivities.length > 0 && (
              <div className="w-full mt-11">
                <h3 className="text-md font-semibold mb-2 bg-gray-100 px-2 py-1">
                  Recent Updates
                </h3>
                {project?.recentActivities.map((activity, index) => (
                  <div key={index}>
                    <h2>
                      <span>{index + 1}, </span>
                      {activity.description}
                    </h2>
                    <p className="pt-1 text-xs text-gray-400 pl-3">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            )}
        </div>
        <div className="w-full">
          {!!getTaskLists() && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="MAIN" type="ROW" direction="horizontal">
                {(provided) => (
                  <div>
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Row gutter={[25, 25]}>
                        {getTaskLists().map((taskList, index) => (
                          <Col key={index}>
                            <Card
                              hoverable
                              title={
                                <h2 className="font-bold text-xl">
                                  {taskList.name}
                                </h2>
                              }
                              style={{ width: 301 }}
                            >
                              <Droppable
                                droppableId={taskList.name}
                                type="TASK"
                              >
                                {(dropProvided) => (
                                  <div
                                    ref={dropProvided.innerRef}
                                    {...dropProvided.droppableProps}
                                    className="flex flex-col gap-4"
                                  >
                                    {taskList.tasks.map((task, index) => (
                                      <Draggable
                                        key={task._id}
                                        draggableId={task.status}
                                        index={index}
                                      >
                                        {(dragProvided, dragSnapshot) => (
                                          <div
                                            onClick={() => {
                                              drawer.setTrue();
                                              setSelectedTask(task);
                                            }}
                                            ref={dragProvided.innerRef}
                                            {...dragProvided.draggableProps}
                                            {...dragProvided.dragHandleProps}
                                            className="bg-gray-100 px-5 py-3 rounded-lg"
                                          >
                                            <h3 className="text-md font-semibold">
                                              {task.title}
                                            </h3>
                                            <div className="mt-4">
                                              <div className="flex items-center gap-2">
                                                <CommentOutlined />
                                                <p className="text-gray-500 text-sm">
                                                  0
                                                </p>
                                              </div>
                                              <div></div>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {dropProvided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                              <div className="mt-5">
                                {isAddTask &&
                                  selectedTaskList === taskList.name && (
                                    <Input
                                      type="text"
                                      value={newTaskTitle}
                                      onChange={(e) =>
                                        setNewTaskTitle(e.target.value)
                                      }
                                      placeholder="Enter task title"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleAddTask(
                                            taskList.name as TaskStatus
                                          );
                                        }
                                      }}
                                    />
                                  )}
                                <button
                                  className="hover:bg-gray-100 rounded-lg w-full px-5 py-2 mt-5"
                                  onClick={() => {
                                    setIsAddTask((prev) => !prev);
                                    setSelectedTaskList(taskList.name);
                                  }}
                                >
                                  {isAddTask &&
                                  selectedTaskList === taskList.name
                                    ? "Close x"
                                    : "Add Task +"}
                                </button>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
      <Drawer
        title={selectedTask?.title}
        placement={"right"}
        width={500}
        onClose={drawer.setFalse}
        open={drawer.value}
        extra={
          <Space>
            <Button onClick={drawer.setFalse}>Cancel</Button>
            <Button type="primary" onClick={drawer.setFalse}>
              OK
            </Button>
          </Space>
        }
      >
        <div>
          <h2 className="text-lg font-semibold">Description:</h2>
          {selectedTask?.description}
        </div>
        <div className="mt-7">
          <h2 className="text-lg font-semibold">Assignee</h2>
          <div className="flex flex-col gap-3 mt-7">
            {selectedTask?.assignees &&
              selectedTask.assignees.map((assigne, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Avatar alt="" />
                  <p>{assigne.name}</p>
                </div>
              ))}
          </div>
          <div
            className="border h-11 w-11 rounded-full flex items-center justify-center mt-1"
            onClick={addMember.setTrue}
          >
            <PlusOutlined />
          </div>
          <p className="text-gray-500 text-sm mt-7">
            Deadline: {calculateDeadline().toLocaleDateString()}
          </p>{" "}
        </div>
      </Drawer>
      <AddMemberModal
        modal={addMember}
        taskId={selectedTask?._id! as TaskStatus}
      />
    </div>
  );
};

export default ProjectDetails;
