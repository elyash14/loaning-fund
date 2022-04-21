import dynamic from 'next/dynamic';
import { Box, Grid, Paper, styled, Typography } from '@material-ui/core';
import { FC } from 'react';
import { IUser } from '../../interfaces/users';
import Image from 'next/image';
import theme from '../../configs/theme';
import Link from 'next/link';
import moment from 'moment';
import Skeleton from '@material-ui/lab/Skeleton';
import BackToUserList from './BackToUserList';
import AddIcon from '@material-ui/icons/Add';
const FabAction = dynamic(() => import('../general/FabAction'));

const TopBox = styled(Box)({
  display: 'flex',
});

interface IAccountsList {
  user: IUser;
}
const AccountsList: FC<IAccountsList> = ({ user }) => {
  if (!user) {
    return <Paper elevation={1}>Loading</Paper>;
  }
  return (
    <>
      <Paper elevation={1}>
        <Box p={4}>
          <BackToUserList />
        </Box>
      </Paper>
      <Link href="/admin/accounts/add/[userId]" as={`/admin/accounts/add/${user.id}`}>
        <a>
          <FabAction>
            <AddIcon />
            Add New Account
          </FabAction>
        </a>
      </Link>
    </>
  );
};

export default AccountsList;
