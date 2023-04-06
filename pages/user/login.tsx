import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setError("Please enter all values");
        return;
      }
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });
      login(data.data);
      router.push("/");
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <>
      <p>Logged in as {user?.name}</p>
      <input
        aria-label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        aria-label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {error}
      <br />
      <button onClick={handleSubmit}>Log in</button>
    </>
  );
}

export default Login;
