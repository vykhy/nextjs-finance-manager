import AuthContextProvider from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProjectContextProvider from "@/context/ProjectContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Analytics } from "@vercel/analytics/react";
import AccountsContextProvider from "@/context/AccountContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContextProvider>
        <ProjectContextProvider>
          <AccountsContextProvider>
            <Component {...pageProps} />
            <Analytics />
          </AccountsContextProvider>
        </ProjectContextProvider>
      </AuthContextProvider>
    </LocalizationProvider>
  );
}
