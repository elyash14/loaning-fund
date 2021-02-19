import {
  AppBar,
  Button,
  Container,
  IconButton,
  styled,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../../configs/theme';

const Actions = styled(Box)({
  flex: 1,
  '& > button': {
    marginRight: theme.spacing(),
  },
});

const NavBar = () => {
  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="lg">
        <Toolbar>
          <Actions>
            <IconButton
              edge="start"
              //   className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Login</Button>
          </Actions>
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
