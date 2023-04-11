import { useAuthContext } from "@/context/AuthContext";
import IAccount from "@/interfaces/IAccount";
import axios from "axios";
import React, { useEffect, useState } from "react";

function transfer() {
  const { user } = useAuthContext();
  const projectId = 1;
  const [fromAccountId, setFromAccountId] = useState<any>(null);
  const [toAccountId, setToAccountId] = useState<any>(null);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
      const { data } = await axios.get(`/api/project/${projectId}/account/get`);
      setAccounts(data.data);
    };
    try {
      getAccounts();
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  }, []);

  const handleSubmit = async () => {
    if (fromAccountId === toAccountId) {
      setError("Sender and receiver accounts can't be the same");
      return;
    }
    if (!fromAccountId || !toAccountId || !amount) {
      setError("Sender and receiver accounts are required");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/project/${projectId}/transfer/create`,
        {
          item,
          amount,
          fromAccountId,
          toAccountId,
          description,
          date,
        }
      );
      console.log(data.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      Description:
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      Amount:
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      Receiver Account:{" "}
      <select onChange={(e: any) => setToAccountId(e.target.value)}>
        <option selected value={"none"} hidden disabled>
          Select receiving account
        </option>
        {accounts.map((account: IAccount, i) => (
          <option value={account.id}>{account.name}</option>
        ))}
      </select>
      <br />
      Sender account:{" "}
      <select onChange={(e: any) => setFromAccountId(e.target.value)}>
        <option selected value={"none"} hidden disabled>
          Select sending account
        </option>
        {accounts.map((account: IAccount, i) => (
          <option value={account.id}>{account.name}</option>
        ))}
      </select>
      <br />
      <input
        type={"date"}
        value={date.toISOString().substring(0, 10)}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <br />
      {error}
      <button onClick={handleSubmit}>Add</button>
    </>
  );
}

export default transfer;
