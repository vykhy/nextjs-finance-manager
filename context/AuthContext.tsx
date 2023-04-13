import IUser from "@/interfaces/IUser";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  children: ReactNode;
};

const AuthContext: any = createContext({});

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [initialLoadingComplete, setInitialLoadingComplete] = useState(false);

  useEffect(() => {
    const localUser: string | null = sessionStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    setInitialLoadingComplete(true);
  }, []);

  const login = (data: IUser) => {
    setUser(data);
    sessionStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    router.push("/");
    sessionStorage.removeItem("user");
  };

  const isLoggedIn = () => {
    return user?.id;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {initialLoadingComplete && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext: any = () => useContext(AuthContext);
