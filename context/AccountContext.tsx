import IAccount from "@/interfaces/IAccount";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProjectContext } from "./ProjectContext";
import axios from "axios";

type AuthContextProps = {
  children: ReactNode;
};

const AccountsContext: any = createContext({});

const AccountsContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const { selectedProject: projectId } = useProjectContext();

  const triggerRefetch = () => {
    setTrigger(!trigger);
  };

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
  }, [projectId, trigger]);
  return (
    <AccountsContext.Provider
      value={{ accounts, loading, error, triggerRefetch }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsContextProvider;
export const useAccountsContext: any = () => useContext(AccountsContext);
