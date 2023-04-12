import AuthContextProvider from "@/context/AuthContext";
import ProjectContextProvider from "@/context/ProjectContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProjectContextProvider>
        <Component {...pageProps} />
      </ProjectContextProvider>
    </AuthContextProvider>
  );
}
