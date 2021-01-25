import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState } from "react";

export default function Home() {
  const [session, loading] = useSession();
  const [value, setValue] = useState(0);

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
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}
