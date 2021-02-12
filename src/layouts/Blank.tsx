import { Grid } from "@material-ui/core";
import { FC, ReactNode } from "react";

interface IBlankLayout {
  children: ReactNode;
}

const BlankLayout: FC<IBlankLayout> = ({ children }) => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={11}>
        {children}
      </Grid>
    </Grid>
  );
};

export default BlankLayout;
