import React, { useState } from "react";
import { Modal, Input, List, Avatar } from "antd";
import useProjectStore from "@/zustand/project-state";
import { demoMembers } from "@/constant/data";
import { IMember, TaskStatus } from "@/types/project";
import { useEditProject } from "@/api/projects/use-projects";

interface ModalProps {
  taskId: TaskStatus;
  modal: {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const AddMemberModal = ({ modal, taskId }: ModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { project, addMemberToTask } = useProjectStore();
  const { mutate: editProject, isLoading, isError } = useEditProject();

  const filteredMembers = demoMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberSelect = (member: IMember) => {
    addMemberToTask(taskId, member);
    editProject({ id: project._id, updatedProject: project });
  };

  return (
    <Modal
      visible={modal.value}
      onCancel={modal.setFalse}
      title="Add Members to Task"
      footer={null}
    >
      <Input
        placeholder="Search members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredMembers}
        renderItem={(member) => (
          <List.Item
            onClick={() => handleMemberSelect(member)}
            className="hover:bg-gray-100 cursor-pointer p-2"
          >
            <List.Item.Meta title={member.name} description={member.role} />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AddMemberModal;
