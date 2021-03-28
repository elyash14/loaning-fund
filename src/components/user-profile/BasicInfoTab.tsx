import { Box, Button, Grid, Paper, styled, Typography } from '@material-ui/core';
import { FC } from 'react';
import { IUser } from '../../interfaces/users';
import Image from 'next/image';
import theme from '../../configs/theme';
import Link from 'next/link';
import moment from 'moment';
import Skeleton from '@material-ui/lab/Skeleton';

const TopBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  '& .user-info': {
    display: 'flex',
    '& .avatar': {
      display: 'flex',
      borderRadius: 80,
      overflow: 'hidden',
      marginRight: 30,
      border: '7px solid #e2e2e2',
    },
    '& .user-captions': {
      display: 'flex',
      flexDirection: 'column',
      '& .full-name': {
        marginTop: 50,
        color: theme.palette.primary.main,
        fontWeight: 'bold',
      },
    },
  },
});

const BackBottomWrapper = styled(Box)({
  display: 'flex',
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.grey[700]}`,
  justifyContent: 'flex-end',
  '& button': {
    marginLeft: 5,
  },
});

const Info = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& h6': {
    fontSize: '1.3rem',
    marginRight: 8,
  },
  '& p': {
    color: theme.palette.grey[400],
  },
});

interface IBasicInfoTab {
  user: IUser;
}
const BasicInfoTab: FC<IBasicInfoTab> = ({ user }) => {
  if (!user) {
    return (
      <Paper elevation={1}>
        <Loading />
      </Paper>
    );
  }
  return (
    <Paper elevation={1}>
      <Box p={4}>
        <TopBox>
          <div className="user-info">
            <div
              className="avatar"
              style={{
                borderColor: user.color,
                boxShadow: `0px 0px 18px -5px ${user.color}`,
              }}
            >
              <Image
                src={
                  user.avatarPicture
                    ? user.avatarPicture
                    : `/images/${user.gender.toLowerCase()}-avatar.png`
                }
                alt={user.username}
                width={150}
                height={150}
              />
            </div>
            <div className="user-captions">
              <Typography className="full-name" variant="h4">
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <Typography variant="caption">{user.username}</Typography>
            </div>
          </div>
        </TopBox>
        <br />
        <br />
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Info>
              <Typography variant="h6">Phone: </Typography>
              <Typography variant="body1">{user.phone}</Typography>
            </Info>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Info>
              <Typography variant="h6">Credit Card: </Typography>
              <Typography variant="body1">{user.creditCard}</Typography>
            </Info>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Info>
              <Typography variant="h6">Created At: </Typography>
              <Typography variant="body1">
                {moment(new Date(user.createdAt)).format('YYYY-MM-DD hh:mm:ss')}
              </Typography>
            </Info>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Info>
              <Typography variant="h6">Last Login At: </Typography>
              <Typography variant="body1">
                {moment(new Date(user.lastLogin)).fromNow()}
              </Typography>
            </Info>
          </Grid>
        </Grid>
        <BackBottomWrapper>
          <Link href="/admin/users">
            <a>
              <Button variant="outlined">Back To List</Button>
            </a>
          </Link>
        </BackBottomWrapper>
      </Box>
    </Paper>
  );
};

const UserInfoSkeleton = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Loading = () => {
  return (
    <UserInfoSkeleton p={4}>
      <Skeleton variant="circle" width={150} height={150} style={{ margin: 'auto' }} />
      <Box mt={3}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Box>
    </UserInfoSkeleton>
  );
};

export default BasicInfoTab;
