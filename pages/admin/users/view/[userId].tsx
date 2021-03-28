import { AppBar, Paper, Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUser } from '../../../../src/apis/user';
import TabPanel from '../../../../src/components/general/TabPanel';
import BasicInfoTab from '../../../../src/components/user-profile/BasicInfoTab';
import { ProjectPage } from '../../../../src/interfaces/general';
import { IUser } from '../../../../src/interfaces/users';

const ViewUser: ProjectPage<null> = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState<IUser>();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const loadUserInfo = async () => {
      const _user = await getUser(String(userId));
      if (_user) {
        setUser(_user);
      }
    };

    if (userId) {
      loadUserInfo();
    }
  }, [userId]);

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          indicatorColor="primary"
          aria-label="user tabs"
        >
          <Tab label="Basic Info" id="user-info-tab" aria-controls="user-info-tabpanel" />
          <Tab
            label="Accounts"
            id="user-accounts-tab"
            aria-controls="user-accounts-tabpanel"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <BasicInfoTab user={user} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Paper elevation={1}>User Accounts</Paper>
      </TabPanel>
    </div>
  );
};

ViewUser.layout = 'admin';
ViewUser.privatePage = true;

export default ViewUser;
