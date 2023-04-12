import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import Layout from "@/components/Layout";

function CreatePaymentMethod() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    if (name.length < 3) {
      setError("Name should be more than 2 characters");
      return;
    }
    const { data } = await axios.post(
      `/api/user/${user.id}/paymentmethod/create`,
      {
        name: `${name.split("")[0].toUpperCase()}${name.substring(1)}`,
        userId: user.id,
      }
    );
    console.log(data);
  };
  return (
    <>
      <Layout>
        Payment method:
        <input
          name="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        {error}
        <br />
        <button onClick={handleSubmit}>Create</button>
      </Layout>
    </>
  );
}

export default CreatePaymentMethod;
