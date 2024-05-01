import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import { IProject } from "@/types/project";
import useProjectStore from "@/zustand/project-state";
import EditProjectForm from "./project-edit-form";
import Image from "next/image";
import useBoolean from "@/hooks/use-boolean";

const { Meta } = Card;

interface ProjectProps {
  project: IProject;
}
const ProjectCard = ({ project }: ProjectProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modal = useBoolean();

  return (
    <Card
      hoverable
      className="border-gray-300 border shadow-md "
      cover={
        <img alt="example" src={project.image} className="h-44 object-cover" />
      }
      actions={[
        <EyeOutlined key="View" />,
        <EditOutlined key="edit" onClick={modal.setTrue} />,
        <DeleteOutlined key="Delete" />,
      ]}
    >
      <Meta
        title={project.title}
        description={
          <p className="line-clamp-2 overflow-ellipsis">
            {project.description}
          </p>
        }
        className="custom-description"
      />

      {modal.value && (
        <Modal
          title="Edit Project"
          centered
          open={modal.value}
          onOk={modal.setFalse}
          onCancel={modal.setFalse}
          footer={null}
        >
          <EditProjectForm project={project} modal={modal} />
        </Modal>
      )}
    </Card>
  );
};

export default ProjectCard;
