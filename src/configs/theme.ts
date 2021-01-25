import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary:{
        light: '#ed4b82',
        main: '#e91e63',
        dark: '#a31545'
    },
    secondary:{
        light: '#ffb851',
        main: '#ffa726',
        dark: '#b2741a'
    }
  },
});

export default theme;
