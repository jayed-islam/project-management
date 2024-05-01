import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { IProject } from "@/types/project";
import useProjectStore from "@/zustand/project-state";

interface EditProjectFormProps {
  project: IProject;
  modal: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  project,
  modal,
}) => {
  const { editProject } = useProjectStore();

  const handleSave = (values: IProject) => {
    const updatedProject = { ...project, ...values };
    editProject(project.id, updatedProject);

    modal.setFalse();
    message.success("Project updated successfully!");
  };

  return (
    <Form
      initialValues={project}
      onFinish={handleSave}
      onFinishFailed={() => {}}
    >
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Image URL" name="image">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={modal.setFalse}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default EditProjectForm;
