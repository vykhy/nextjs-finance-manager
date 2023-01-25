import React, { useState } from "react";
import axios from "axios";

function CreateAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (name.length < 4) {
      setError("Name should be more than 3 characters");
      return;
    }
    const { data } = await axios.post("/api/account/create", {
      name,
      balance,
      userId: 1,
    });
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
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
}

export default CreateAccount;
