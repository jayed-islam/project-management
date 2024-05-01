import ProjectDetailView from "@/sections/projects/view/project-details-view";
import { FC } from "react";

export const metadata = {
  title: "Project",
};

interface IProjectProps {
  params: {
    id: string;
  };
}

const BlogProectPage: FC<IProjectProps> = ({ params }) => {
  const { id } = params;
  return <ProjectDetailView id={id as string} />;
};

export default BlogProectPage;
