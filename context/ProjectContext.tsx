import { useProjects } from "@/hooks/project";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

type ProjectContextProps = {
  children: ReactNode;
};

const ProjectContext: any = createContext({});

const ProjectContextProvider: React.FC<ProjectContextProps> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const { projects } = useProjects(user.id);
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id);

  return (
    <ProjectContext.Provider
      value={{ projects, selectedProject, setSelectedProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
export const useProjectContext: any = () => useContext(ProjectContext);
