import { FC } from "react";
import { Snackbar, SnackbarProps, styled, Typography } from "@material-ui/core";
import theme from "../../configs/theme";

const AlertSnackbar = styled(Snackbar)({
  backgroundColor: (props: any) => theme.palette[props.color].main,
  "&>p": {
    padding: theme.spacing(1.5),
  },
});

interface IAlert extends SnackbarProps {
  text: string;
  type?: "info" | "warning" | "success" | "error";
}
const Alert: FC<IAlert> = (props) => {
  const { text, type = "info", ...snackbarProps } = props;

  return (
    <AlertSnackbar
      color={type}
      autoHideDuration={6000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      {...snackbarProps}
    >
      <Typography>{text}</Typography>
    </AlertSnackbar>
  );
};

export default Alert;
