import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { IProject } from "@/types/project";
import { useEditProject } from "@/api/projects/use-projects";

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
  const [form] = Form.useForm();
  const editProjectMutation = useEditProject();
  const [isFormTouched, setIsFormTouched] = useState(false);
  const handleSubmit = async (values: any) => {
    try {
      await editProjectMutation.mutateAsync({
        id: project._id,
        updatedProject: values,
      });
      modal.setFalse();
      message.success("Project updated successfully");
    } catch (error) {
      message.error("Failed to update project");
    }
  };

  const handleValuesChange = () => {
    setIsFormTouched(true);
  };

  return (
    <Form
      form={form}
      initialValues={project}
      onFinishFailed={() => {}}
      onFinish={handleSubmit}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item label="Image URL" name="image">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!isFormTouched}>
          Save
        </Button>
        <Button onClick={modal.setFalse}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default EditProjectForm;
