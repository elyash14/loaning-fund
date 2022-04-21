import {
  Paper,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  styled,
  Grid,
  Typography,
  InputBase,
} from '@material-ui/core';
import { NextPageContext } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useState } from 'react';
import Alert from '../../src/components/general/Alert';
import theme from '../../src/configs/theme';

const GridWrapper = styled(Grid)({
  maxWidth: 400,
});

const Greeting = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: theme.spacing(6),
  textAlign: 'center',
});

const SignInForm = styled(Paper)({
  padding: theme.spacing(10, 4),
  '&>form': {
    display: 'flex',
    flexDirection: 'column',
  },
});

const SignIn = ({ csrfToken, error }) => {
  const [message, setMessage] = useState<string>(error);

  const handleCloseAlert = () => {
    setMessage(undefined);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <GridWrapper item xs={11}>
        <SignInForm elevation={1}>
          <form method="post" action="/api/auth/callback/credentials">
            <Greeting variant="h4">Welcome To Fund App</Greeting>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <InputBase
                name="username"
                id="username"
                aria-describedby="username-helper-text"
              />
              <FormHelperText id="username-helper-text">
                Please enter your username
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputBase
                name="password"
                id="password"
                type="password"
                aria-describedby="password-helper-text"
              />
              <FormHelperText id="password-helper-text">
                Please enter your password
              </FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" size="large">
              Sign in
            </Button>
          </form>
          <Alert
            text="Username or password is incorrect"
            type="error"
            open={message !== undefined}
            onClose={handleCloseAlert}
          />
        </SignInForm>
      </GridWrapper>
    </Grid>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default SignIn;
