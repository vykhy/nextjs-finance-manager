import { useState, useEffect } from "react";
import axios from "axios";

const useTransactions = (projectId: number) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/project/${projectId}/transaction`
        );
        setTransactions(response.data.data);
      } catch (err: any) {
        setError(err.respone?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [projectId]);

  return { transactions, isLoading, error };
};

export default useTransactions;
