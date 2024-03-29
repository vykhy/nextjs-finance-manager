import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dayjs } from "dayjs";
import { TransactionType } from "@/components/TransactionList";

const useTransactions = (
  projectId: number,
  startDate: Dayjs | null | undefined = undefined,
  endDate: Dayjs | null | undefined = undefined,
  search: string = ""
) => {
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const triggerRefetch = useCallback(() => {
    setTrigger(!trigger);
  }, [trigger]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTransactions = async () => {
      if (!projectId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/project/${projectId}/transaction?startDate=${startDate}&endDate=${endDate}&search=${search}`,
          { signal: controller.signal }
        );
        setTransactions(response.data.data);
      } catch (err: any) {
        setError(err.respone?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
    return () => controller.abort();
  }, [projectId, startDate, endDate, search, trigger]);

  return { transactions, isLoading, error, triggerRefetch };
};

export default useTransactions;
