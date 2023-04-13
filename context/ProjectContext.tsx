import IProject from "@/interfaces/IProject";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";

type ProjectContextProps = {
  children: ReactNode;
};

const ProjectContext: any = createContext({});

const ProjectContextProvider: React.FC<ProjectContextProps> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [addProjectLoading, setAddProjectLoading] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    if (!user.id) return;
    setLoading(true);
    try {
      (async () => {
        const projects = await getUserProjects(user.id);
        setProjects(projects);
      })();
    } catch (error: any) {
      setError(error.response?.body.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    if (!selectedProject) setSelectedProject(projects[0]?.id);
  }, [projects]);

  const addProject = async (name: string, description: string) => {
    setError("");
    setAddProjectLoading(true);
    try {
      const { data } = await axios.post("/api/project/create", {
        user_id: user.id,
        name,
        description,
      });
      setProjects((prev) => [...prev, data.data]);
      return data.data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setAddProjectLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        setSelectedProject,
        loading,
        error,
        addProject,
        addProjectLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
export const useProjectContext: any = () => useContext(ProjectContext);

async function getUserProjects(userId: Number): Promise<Array<any>> {
  try {
    const { data } = await axios.get(`/api/user/${userId}/projects`);
    return data;
  } catch (error) {
    throw error;
  }
}
