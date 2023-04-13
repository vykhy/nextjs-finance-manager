import AuthContextProvider from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProjectContextProvider from "@/context/ProjectContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContextProvider>
        <ProjectContextProvider>
          <Component {...pageProps} />
        </ProjectContextProvider>
      </AuthContextProvider>
    </LocalizationProvider>
  );
}
