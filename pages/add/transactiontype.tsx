import React, { useState } from "react";
import axios from "axios";

function CreateTransactionType() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (name.length < 3) {
      setError("Name should be more than 3 characters");
      return;
    }
    const { data } = await axios.post("/api/transactiontype/create", {
      name: `${name.split("")[0].toUpperCase()}${name.substring(1)}`,
    });
    console.log(data);
  };
  return (
    <>
      Transaction type:
      <input
        type="text"
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

export default CreateTransactionType;
