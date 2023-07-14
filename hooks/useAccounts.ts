import { useState, useEffect } from "react";
import axios from "axios";
import IAccount from "@/interfaces/IAccount";

const useAccounts = (projectId: number) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/project/${projectId}/account/get`);
        setAccounts(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      }
      setLoading(false);
    };

    fetchAccounts();
  }, [projectId]);

  return { accounts, loading, error };
};

export default useAccounts;
