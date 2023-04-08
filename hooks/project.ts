import axios from "axios";
import { useEffect, useState } from "react";
import IProject from "@/interfaces/IProject";

export const useProjects = (userId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const projects = await getUserProjects(userId);
        setProjects(projects);
      })();
    } catch (error: any) {
      setError(error.response?.body.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { loading, error, projects: projects };
};

async function getUserProjects(userId: Number): Promise<Array<any>> {
  try {
    const { data } = await axios.get(`/api/user/${userId}/projects`);
    return data;
  } catch (error) {
    throw error;
  }
}
