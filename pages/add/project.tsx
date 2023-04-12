// pages/projects/new.tsx
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import Layout from "@/components/Layout";

const NewProjectPage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { user } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/project/create", {
        user_id: user.id,
        name,
        description,
      });
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </Layout>
  );
};

export default NewProjectPage;
