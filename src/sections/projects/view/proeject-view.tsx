"use client";

import React, { useEffect } from "react";
import { Col, Row } from "antd";
import ProjectCard from "../project-card";
import useProjectStore from "@/zustand/project-state";
import { useProjects } from "@/api/projects/use-projects";

const ProjectView = () => {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching projects</div>;

  return (
    <div>
      <h1 className="text-3xl  pb-5 font-semibold">Project List:</h1>
      <Row align="middle" gutter={[24, 24]} style={{ width: "100%" }}>
        {projects?.map((project, index) => (
          <Col
            key={index}
            className="gutter-row"
            xs={{ span: 24, offset: 1 }}
            md={{ span: 12 }}
            lg={{ span: 6 }}
          >
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProjectView;
