import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";

function CreateTransactionType() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isNegative, setIsNegative] = useState("false");

  const handleSubmit = async () => {
    if (name.length < 3) {
      setError("Name should be more than 3 characters");
      return;
    }
    const { data } = await axios.post("/api/transactiontype/create", {
      name: `${name.split("")[0].toUpperCase()}${name.substring(1)}`,
      isNegative: Boolean(isNegative),
    });
    console.log(data);
  };
  return (
    <Layout>
      Transaction type:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Is negative (whether this transaction reduces account balance) <br />
      <select onChange={(e: any) => setIsNegative(e.target.value)}>
        <option value={"false"} selected>
          False
        </option>
        <option value={"true"}>True</option>
      </select>
      <br />
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </Layout>
  );
}

export default CreateTransactionType;
