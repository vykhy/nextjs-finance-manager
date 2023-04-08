import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";

function CreatePaymentMethod() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    if (name.length < 4) {
      setError("Name should be more than 3 characters");
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
    </>
  );
}

export default CreatePaymentMethod;
