import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import IUser from "@/interfaces/IUser";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {user ? (
          <>
            Hello {user.name}
            <Link href={"/add/account"}>Add Account</Link>
            <Link href={"/add/category"}>Add Category</Link>
            <Link href={"/add/transaction"}>Add Transaction</Link>
            <Link href={"/add/transfer"}>Transfer</Link>
            <Link href={"/add/project"}>Add Project</Link>
            <Link href={"/add/paymentmethod"}>Add Payment Method</Link>
            <Link href={"/add/transactiontype"}>Add Transaction Type</Link>
          </>
        ) : (
          <>
            <Link href={"/user/create"}>Sign up as a new user</Link>
            <Link href={"/user/login"}>Log in</Link>
          </>
        )}
      </main>
    </>
  );
}
