import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useProjects } from "@/hooks/project";

function CreateCategory() {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const { projects } = useProjects(user.id);
  const [project, setProject] = useState<number>();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (name.length < 4) {
      setError("Name should be more than 3 characters");
      return;
    }
    if (!project) {
      setError("Project is required");
      return;
    }
    const { data } = await axios.post(
      `/api/project/${project}/category/create`,
      {
        name,
      }
    );
    console.log(data);
  };
  return (
    <>
      <input
        name="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <select
        value={project ?? ""}
        onChange={(e) => setProject(Number(e.target.value))}
      >
        <option value="">-- Select Project --</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <br />
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
}

export default CreateCategory;
