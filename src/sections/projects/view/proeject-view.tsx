"use client";

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Col, Row } from "antd";
import ProjectCard from "../project-card";
import useProjectStore from "@/zustand/project-state";

const ProjectView = () => {
  //   const getFacts = async () => {
  //     const res = await fetch("/mocks/data/data.json");
  //     return res.json();
  //   };
  //   const { data, error, isLoading } = useQuery("randomFacts", getFacts);
  //   if (error) return <div>Request Failed</div>;
  //   if (isLoading) return <div>Loading...</div>;

  const { projects, isLoading, error, loadProjects } = useProjectStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl  pb-5 font-semibold">Project List:</h1>
      <Row align="middle" gutter={[24, 24]} style={{ width: "100%" }}>
        {projects.map((project, index) => (
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
