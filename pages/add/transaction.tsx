import { useAuthContext } from "@/context/AuthContext";
import IAccount from "@/interfaces/IAccount";
import ICategory from "@/interfaces/ICategory";
import IPaymentMethod from "@/interfaces/IPaymentMethod";
import ITransactionType from "@/interfaces/ITransactionType";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddTransaction() {
  const projectId = 1;
  const { user } = useAuthContext();
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [transactionTypeId, setTransactionTypeId] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [date, setDate] = useState(new Date());

  const [categories, setCategories] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEntities = async () => {
      try {
        const { data } = await axios.get(`/api/project/${projectId}/entities`);
        setTransactionTypes(JSON.parse(data.data.transaction_types));
        setCategories(JSON.parse(data.data.categories));
        setAccounts(JSON.parse(data.data.accounts));
        setPaymentMethods(JSON.parse(data.data.payment_methods));
      } catch (error: any) {
        setError(error?.response?.data?.message);
      }
    };
    getEntities();
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const type: any = transactionTypes.find(
        (type: ITransactionType) =>
          Number(type.id) === Number(transactionTypeId)
      );
      const total = type.name === "Expense" ? Number(amount) * -1 : amount;
      const { data } = await axios.post(
        `/api/project/${projectId}/transaction`,
        {
          item,
          amount: total,
          categoryId,
          projectId,
          description,
          paymentMethodId,
          transactionTypeId,
          accountId,
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
      Item:
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <br />
      Amount:
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      Description:
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <select onChange={(e: any) => setCategoryId(e.target.value)}>
        <option value="none" selected disabled hidden>
          Select a category
        </option>
        {categories.map((category: ICategory, i) => (
          <option value={category.id} key={i}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <select
        onChange={(e: any) => {
          setAccountId(e.target.value);
        }}
      >
        <option value="none" selected disabled hidden>
          Select an account
        </option>
        {accounts.map((account: IAccount, i) => (
          <option value={account.id} key={i}>
            {account.name}
          </option>
        ))}
      </select>
      <br />
      <select onChange={(e: any) => setTransactionTypeId(e.target.value)}>
        <option value="none" selected disabled hidden>
          Select transaction type
        </option>
        {transactionTypes.map((type: ITransactionType, i) => (
          <option value={type.id} key={i}>
            {type.name}
          </option>
        ))}
      </select>
      <br />
      <select onChange={(e: any) => setPaymentMethodId(e.target.value)}>
        <option value="none" selected disabled hidden>
          Select payment method
        </option>
        {paymentMethods.map((method: IPaymentMethod, i) => (
          <option value={method.id} key={i}>
            {method.name}
          </option>
        ))}
      </select>
      <input
        type={"date"}
        value={date.toISOString().substring(0, 10)}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <br />
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
}

export default AddTransaction;
