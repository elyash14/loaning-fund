import { FC } from 'react';
import { Fab, FabProps, styled } from '@material-ui/core';

const FabActionComponent = styled(Fab)({
  margin: 0,
  top: 'auto',
  left: 20,
  bottom: 20,
  right: 'auto',
  position: 'fixed',
});

interface IFabAction extends FabProps {}

const FabAction: FC<IFabAction> = (props) => {
  const { children } = props;

  return (
    <FabActionComponent variant="extended" color="primary">
      {children}
    </FabActionComponent>
  );
};

export default FabAction;
