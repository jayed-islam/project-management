import { IProject } from "@/types/project";
import { formatTimestamp } from "@/utils/app-utils";
import React from "react";

interface IProjectDetailProps {
  project: IProject | undefined;
}

const ProjectDetails = ({ project }: IProjectDetailProps) => {
  return (
    <div>
      <h3 className="text-3xl font-bold">Project</h3>
      <div className="flex items-start gap-20">
        <div className="border rounded-md w-full md:w-[300px] p-5 mt-11">
          <div className="w-full ">
            <h3 className="text-md font-semibold mb-2 bg-gray-100 px-2 py-1">
              Team Members
            </h3>
            {project?.members.map((member, index) => (
              <h2 key={index} className="whitespace-nowrap">
                <span>{index + 1}, </span>
                {member.name}
              </h2>
            ))}
          </div>
          {project?.recentActivities &&
            project?.recentActivities.length > 0 && (
              <div className="w-full mt-11">
                <h3 className="text-md font-semibold mb-2 bg-gray-100 px-2 py-1">
                  Recent Updates
                </h3>
                {project?.recentActivities.map((activity, index) => (
                  <div key={index}>
                    <h2 className="whitespace-nowrap">
                      <span>{index + 1}, </span>
                      {activity.description}
                    </h2>
                    <p className="pt-1 text-xs text-gray-400 pl-3">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            )}
        </div>
        <div className="w-full p-5">3 secton will be here</div>
      </div>
    </div>
  );
};

export default ProjectDetails;
