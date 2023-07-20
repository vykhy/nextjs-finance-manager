import Head from "next/head";
import { useAuthContext } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import HomePage from "@/components/HomePage";
import SignIn from "@/components/SignIn";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title>Vykhy Finance</title>
        <meta
          name="description"
          content="Track and Manage your Personal Finance. By Vykhy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {user ? (
          <>
            <Layout>
              <HomePage />
            </Layout>
          </>
        ) : (
          <>
            <SignIn />
          </>
        )}
      </main>
    </>
  );
}
