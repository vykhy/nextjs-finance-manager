import { useAuthContext } from "@/context/AuthContext";
import IAccount from "@/interfaces/IAccount";
import ICategory from "@/interfaces/ICategory";
import IPaymentMethod from "@/interfaces/IPaymentMethod";
import ITransactionType from "@/interfaces/ITransactionType";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddTransaction() {
  const { user } = useAuthContext();
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [transactionTypeId, setTransactionTypeId] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(0);

  const [categories, setCategories] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");

  console.log(accountId);
  useEffect(() => {
    const getEntities = async () => {
      try {
        const { data } = await axios.post("/api/user/entities", {
          userId: user.id,
        });
        setTransactionTypes(data.data.transactiontypes);
        setCategories(data.data.categories);
        setAccounts(data.data.accounts);
        setPaymentMethods(data.data.paymentmethods);
      } catch (error: any) {
        setError(error?.response?.data?.message);
      }
    };
    getEntities();
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const { data } = await axios.post("/api/transaction/create", {
        item,
        amount,
        categoryId,
        paymentMethodId,
        typeId: transactionTypeId,
        accountId,
      });
      console.log(data);
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
            {type.type}
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
      <br />
      {error}
      <br />
      <button onClick={handleSubmit}>Create</button>
    </>
  );
}

export default AddTransaction;
