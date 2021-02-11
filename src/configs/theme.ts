import { Color } from "@material-ui/core";
import {
  createMuiTheme,
  SimplePaletteColorOptions,
} from "@material-ui/core/styles";

const primary: SimplePaletteColorOptions & Partial<Color> = {
  light: "#ed4b82",
  main: "#e91e63",
  dark: "#a31545",
};

const secondary: SimplePaletteColorOptions & Partial<Color> = {
  light: "#ffb851",
  main: "#ffa726",
  dark: "#b2741a",
};

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary,
    secondary,
  },

  spacing: 6,

  typography: {
    fontFamily: "source-sans-pro,Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
    fontWeightMedium: 600,
    fontSize: 18,
  },

  overrides: {
    MuiGrid: {
      container: {
        height: "100%",
      },
    },
    MuiTypography: {
      h4: {
        fontSize: "1.75rem",
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow:
          "0px 0px 5px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 1px 1px 0px rgb(0 0 0 / 12%)",
      },
    },
    MuiFormControl: {
      root: {
        marginBottom: 24,
      },
    },
    MuiInputBase: {
      input: {
        padding: "10px 5px 8px",
        borderRadius: "4px",
        background: "#4f6b68",
      },
    },
    MuiFormLabel: {
      root: {
        lineHeight: "unset",
      },
    },
    MuiFormHelperText: {
      root: {
        marginTop: 0,
      },
    },
    MuiButton: {
      root: {
        textTransform: "unset",
      },
      sizeLarge: {
        fontWeight: "bold",
        fontSize: "1.2rem",
      },
      contained: {
        boxShadow: "0px 0px 0px 1px rgb(0 0 0 / 20%)",
      },
    },
    MuiSnackbar: {
      anchorOriginTopCenter: {
        top: 30,
      },
    },
  },
});

export default theme;
