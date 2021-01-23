import Head from "next/head";
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>Home</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <h1>Home Page</h1>

      <div>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </div>
    </div>
  );
}
