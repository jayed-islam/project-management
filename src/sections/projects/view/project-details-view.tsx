"use client";

import { useProjectById } from "@/api/projects/use-projects";
import { Spin } from "antd";
import React from "react";
import ProjectDetails from "../project-detail";
import { IProject } from "@/types/project";

interface IProjectDetailProps {
  id: string;
}

const ProjectDetailView = ({ id }: IProjectDetailProps) => {
  const { data: project, isLoading, isError } = useProjectById(id);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error fetching project</div>;
  }
  return <ProjectDetails project={project as IProject} />;
};

export default ProjectDetailView;
