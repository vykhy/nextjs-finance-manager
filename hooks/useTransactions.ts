import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dayjs } from "dayjs";

const useTransactions = (
  projectId: number,
  startDate: Dayjs | null | undefined = undefined,
  endDate: Dayjs | null | undefined = undefined
) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const triggerRefetch = () => {
    setTrigger(!trigger);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!projectId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/project/${projectId}/transaction?startDate=${startDate}&endDate=${endDate}`
        );
        setTransactions(response.data.data);
      } catch (err: any) {
        setError(err.respone?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [projectId, startDate, endDate, trigger]);

  return { transactions, isLoading, error, triggerRefetch };
};

export default useTransactions;
