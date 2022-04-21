import { Box, Button, styled } from '@material-ui/core';
import Link from 'next/link';
import theme from '../../configs/theme';

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

const BackToUserList = () => {
  return (
    <BackBottomWrapper>
      <Link href="/admin/users">
        <a>
          <Button variant="outlined">Back To List</Button>
        </a>
      </Link>
    </BackBottomWrapper>
  );
};

export default BackToUserList;
