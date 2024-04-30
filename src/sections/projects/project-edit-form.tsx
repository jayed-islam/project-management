import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { IProject } from "@/types/project";

interface EditProjectFormProps {
  project: IProject;
  onSave: (updatedProject: IProject) => void;
  onCancel: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  project,
  onSave,
  onCancel,
}) => {
  const [editedProject, setEditedProject] = useState<IProject>(project);

  const handleSave = () => {
    onSave(editedProject);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <Form>
      <Form.Item label="Title">
        <Input
          name="title"
          value={editedProject.title}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          name="description"
          value={editedProject.description}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Image URL">
        <Input
          name="image"
          value={editedProject.image}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default EditProjectForm;
