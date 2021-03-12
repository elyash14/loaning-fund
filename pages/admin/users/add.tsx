import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { ProjectPage } from '../../../src/interfaces/general';
import theme from '../../../src/configs/theme';
import TextField from '../../../src/components/general/TextField';
import { useState } from 'react';
import ColorPicker, {
  generateRandomColor,
} from '../../../src/components/general/ColorPicker';
import { addUser, uploadAvatar } from '../../../src/apis/user';
import { IUserForm } from '../../../src/interfaces/users';
import { useRouter } from 'next/router';
const AvatarEditor = dynamic(() => import('../../../src/components/AvatarEditor'));

const AddPaper = styled(Paper)({
  padding: theme.spacing(10, 5),
});

const FormBottomWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  '& button': {
    marginLeft: 5,
  },
});

const AvatarPicture = styled(Box)({
  display: 'flex',
  backgroundColor: 'white',
  width: 'fit-content',
  cursor: 'pointer',
  position: 'relative',
  padding: 5,
  '& img': {
    width: 200,
    height: 200,
  },
  '& .progress': {
    position: 'absolute',
    top: '40%',
    right: '40%',
  },
});

const RadioGroupWrapper = styled(RadioGroup)({
  flexDirection: 'row',
});

const AddUser: ProjectPage<null> = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [creditCard, setCreditCard] = useState<string>();
  const [color, setColor] = useState<string>(generateRandomColor());
  const [avatarPicture, setAvatarPicture] = useState<string>();
  const [avatarFileName, setAvatarFileName] = useState<string>();
  //
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSaveAvatarPicture = async (file: File, image: string) => {
    // setAvatarFile(file);
    setAvatarPicture(image);
    const response = await uploadAvatar(file, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    });
    if (response) {
      setAvatarFileName(response);
      setProgress(0);
    }
  };

  const handleSave = async () => {
    //TODO add client validation
    const newUser: IUserForm = {
      username,
      password,
      gender,
      firstName,
      lastName,
      phone,
      creditCard,
      color,
      avatarFileName,
    };
    const user = await addUser(newUser);
    if (user) {
      //TODO: set alert
      router.push('/admin/users');
    }
  };

  return (
    <form method="post">
      <AddPaper elevation={1}>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Typography variant="h4">Add New User</Typography>
            <br />

            <FormControl fullWidth>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <input
                name="gender"
                id="gender"
                aria-describedby="gender-helper-text"
                type="hidden"
              />
              <RadioGroupWrapper
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) =>
                  setGender((e.target as HTMLInputElement).value as 'male' | 'female')
                }
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroupWrapper>
              <FormHelperText id="color-helper-text">Select user gender</FormHelperText>
            </FormControl>

            <TextField
              name="username"
              title="Username"
              placeholder="Please enter a username"
              value={username}
              onChangeTextField={(text) => setUsername(text)}
            />

            <TextField
              name="password"
              title="Password"
              placeholder="Please enter a password"
              value={password}
              onChangeTextField={(text) => setPassword(text)}
            />

            <TextField
              name="firstName"
              title="First Name"
              placeholder="Please enter user first name"
              value={firstName}
              onChangeTextField={(text) => setFirstName(text)}
            />

            <TextField
              name="lastName"
              title="Last Name"
              placeholder="Please enter user last name"
              value={lastName}
              onChangeTextField={(text) => setLastName(text)}
            />

            <TextField
              name="phone"
              title="Phone Number"
              placeholder="Please enter user phone number"
              value={phone}
              onChangeTextField={(text) => setPhone(text)}
            />

            {/* TODO: change credit card style to four text field or something like that */}
            <TextField
              name="creditCard"
              title="Credit Card"
              placeholder="Please enter user credit card"
              value={creditCard}
              onChangeTextField={(text) => setCreditCard(text)}
            />

            <FormControl fullWidth>
              <FormLabel htmlFor="color">User Avatar Picture</FormLabel>
              <input
                name="avatarPicture"
                id="avatarPicture"
                aria-describedby="avatarPicture-helper-text"
                type="hidden"
              />
              <AvatarPicture onClick={() => setOpenAvatarModal(true)}>
                <img
                  src={avatarPicture ? avatarPicture : `/images/${gender}-avatar.png`}
                />
                {progress > 0 && (
                  <div className="progress">
                    <CircularProgress
                      variant="determinate"
                      color="secondary"
                      value={progress}
                    />
                  </div>
                )}
              </AvatarPicture>
              <AvatarEditor
                avatarPicture={`/images/${gender}-avatar.png`}
                openModal={openAvatarModal}
                setOpenModal={setOpenAvatarModal}
                onSave={handleSaveAvatarPicture}
              />
              <FormHelperText id="avatarPicture-helper-text">
                Choose an image for user avatar picture
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="color">User Color</FormLabel>
              <input
                name="color"
                id="color"
                aria-describedby="color-helper-text"
                type="hidden"
              />
              <ColorPicker color={color} onChangeColor={(c) => setColor(c)} />
              <FormHelperText id="color-helper-text">
                Pick a color for user profile
              </FormHelperText>
            </FormControl>

            {/* TODO: add referral */}

            <FormBottomWrapper>
              <Link href="/admin/users">
                <a>
                  <Button variant="outlined">Back To List</Button>
                </a>
              </Link>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save&nbsp;
                <SaveOutlinedIcon fontSize="small" />
              </Button>
            </FormBottomWrapper>
          </Grid>
        </Grid>
      </AddPaper>
    </form>
  );
};

AddUser.layout = 'admin';
AddUser.privatePage = true;

export default AddUser;
