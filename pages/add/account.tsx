import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useProjects } from "@/hooks/project";

function CreateAccount() {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("0");
  const { projects } = useProjects(user.id);
  const [projectId, setProjectId] = useState<number>();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (name.length < 4) {
      setError("Name should be more than 3 characters");
      return;
    }
    if (!projectId) {
      setError("Project is required");
      return;
    }
    const { data } = await axios.post(`/api/user/${user.id}/account/create`, {
      name,
      balance,
      projectId,
    });
    console.log(data);
  };
  return (
    <>
      Name:
      <input
        name="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Balance:
      <input
        name="text"
        value={balance}
        onChange={(e) => {
          if (!RegExp(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/).test(e.target.value)) {
            return;
          }
          setBalance(e.target.value);
        }}
      />
      <br />
      Project:
      <select
        value={projectId ?? ""}
        onChange={(e) => setProjectId(Number(e.target.value))}
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

export default CreateAccount;
