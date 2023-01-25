import React, { useState } from "react";
import axios from "axios";

function TransactionType() {
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (type.length < 4) {
      setError("type should be more than 4 characters");
      return;
    }
    const { data } = await axios.post("/api/transactiontype/create", {
      type: `${type.split("")[0].toUpperCase()}${type.substring(1)}`,
    });
    console.log(data);
  };
  return (
    <>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <br />
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
}

export default TransactionType;
