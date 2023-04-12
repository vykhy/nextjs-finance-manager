import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";

interface Account {
  id: number;
  name: string;
}

interface CorrectionFormData {
  accountId: number;
  endBalance: number;
  date: Date;
}

export default function CorrectionPage() {
  const projectId = 1;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState<CorrectionFormData>({
    accountId: 0,
    endBalance: 0,
    date: new Date(),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await axios.get(
          `/api/project/${projectId}/account/get`
        );
        setAccounts(response.data.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch accounts");
      }
    }
    fetchAccounts();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        `/api/project/${projectId}/correction`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit correction");
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  }

  return (
    <Layout>
      <div>
        <h1>Submit Correction</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="accountId">Account:</label>
            <select
              id="accountId"
              name="accountId"
              value={formData.accountId}
              onChange={handleInputChange}
              required
            >
              <option value="" selected hidden>
                Select an account
              </option>
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="endBalance">End Balance:</label>
            <input
              type="number"
              id="endBalance"
              name="endBalance"
              value={formData.endBalance}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type={"date"}
              value={formData.date.toISOString().substring(0, 10)}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}
