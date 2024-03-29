import dynamic from 'next/dynamic';
import '../public/style.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from '../src/configs/theme';

const AdminLayout = dynamic(() => import('../src/layouts/Admin'));
const BlankLayout = dynamic(() => import('../src/layouts/Blank'));

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.layout === 'admin' ? AdminLayout : BlankLayout;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
