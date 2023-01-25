import React, { useState } from "react";
import axios from "axios";

function PaymentMethod() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (name.length < 4) {
      setError("Name should be more than 3 characters");
      return;
    }
    const { data } = await axios.post("/api/paymentmethod/create", {
      name: `${name.split("")[0].toUpperCase()}${name.substring(1)}`,
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
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
}

export default PaymentMethod;
