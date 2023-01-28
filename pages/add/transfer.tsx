import { useAuthContext } from "@/context/AuthContext";
import IAccount from "@/interfaces/IAccount";
import axios from "axios";
import React, { useEffect, useState } from "react";

function transfer() {
  const { user } = useAuthContext();
  const [fromAccountId, setFromAccountId] = useState(null);
  const [toAccountId, setToAccountId] = useState(null);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
      const { data } = await axios.post("/api/account/get", {
        userId: user.id,
      });
      setAccounts(data.data);
    };
    try {
      getAccounts();
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/transfer/create", {
        item,
        amount,
        fromAccountId,
        toAccountId,
      });
      console.log(data.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <select onChange={(e: any) => setToAccountId(e.target.value)}>
        <option selected value={"none"} hidden disabled>
          Select receiving account
        </option>
        {accounts.map((account: IAccount, i) => (
          <option value={account.id}>{account.name}</option>
        ))}
      </select>
      <br />
      <select onChange={(e: any) => setFromAccountId(e.target.value)}>
        <option selected value={"none"} hidden disabled>
          Select sending account
        </option>
        {accounts.map((account: IAccount, i) => (
          <option value={account.id}>{account.name}</option>
        ))}
      </select>
      <br />
      <button onClick={handleSubmit}>Add</button>
    </>
  );
}

export default transfer;
