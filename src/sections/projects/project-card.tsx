import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import { IProject } from "@/types/project";
import useProjectStore from "@/zustand/project-state";

const { Meta } = Card;

interface ProjectProps {
  project: IProject;
}
const ProjectCard = ({ project }: ProjectProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const { projects, editProject } = useProjectStore();

  const handleEditClick = (project: IProject) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const handleSaveEdit = (updatedProject: IProject) => {
    editProject(updatedProject.id, updatedProject);
    setIsModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  return (
    <Card
      hoverable
      className="border-gray-300 border shadow-md "
      cover={
        <img alt="example" src={project.image} className="h-44 object-cover" />
      }
      actions={[
        <EyeOutlined key="View" />,
        <EditOutlined key="edit" />,
        <DeleteOutlined key="Delete" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={project.title}
        description={
          <p className="line-clamp-2 overflow-ellipsis">
            {project.description}
          </p>
        }
        className="custom-description"
      />

      {selectedProject && (
        <Modal
          title="Edit Project"
          visible={isModalVisible}
          onCancel={handleCancelEdit}
          footer={null}
        >
          {selectedProject && (
            <EditProjectForm
              project={selectedProject}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </Modal>
      )}
    </Card>
  );
};

export default ProjectCard;
