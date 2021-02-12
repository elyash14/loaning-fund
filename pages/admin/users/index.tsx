import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { getUsers } from "../../../src/apis/user";
import { ProjectPage } from "../../../src/interfaces/general";

const Users: ProjectPage<null> = () => {
  const { isError, isLoading, users } = getUsers();

  if (isLoading) return <h1>Loading ... </h1>;

  return (
    <Paper elevation={1}>
      <List>
        {users.map((user) => (
          <ListItem key={'user_list_'+user.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} secondary="Jan 9, 2014" />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

Users.layout = "admin";
Users.privatePage = true;

export default Users;
