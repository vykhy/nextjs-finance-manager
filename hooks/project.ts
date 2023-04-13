import axios from "axios";
import { useEffect, useState } from "react";
import IProject from "@/interfaces/IProject";

export const useProjects = (userId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    if (!userId) return;
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

  return { loading, error, projects, addProject };
};
