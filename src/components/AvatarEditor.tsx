import dynamic from 'next/dynamic';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { Button, Slider } from '@material-ui/core';
import AEditor from 'react-avatar-editor';

const Modal = dynamic(() => import('./general/Modal'));

interface IAvatarEditor {
  avatarPicture: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onSave: (file: File, image: string) => void;
}
const AvatarEditor: FC<IAvatarEditor> = (props) => {
  const { avatarPicture, openModal, setOpenModal, onSave } = props;

  const classes = useStyles();

  // states
  const [editor, setEditor] = useState(null);
  const [image, setImage] = useState(avatarPicture);
  const [ready, setReady] = useState(false);
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    setImage(avatarPicture);
  }, [avatarPicture]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChooseFile = (e) => {
    const event = e.target || e.srcElement;
    setImage(URL.createObjectURL(event.files[0]));
    setReady(true);
  };

  const handleSlide = (event: any, newValue: number | number[]) => {
    setImageScale(newValue as number);
  };

  const handleSave = async (e) => {
    if (editor !== null) {
      const canvas = editor?.getImageScaledToCanvas().toDataURL();
      fetch(canvas)
        .then((res) => res.blob())
        .then(async (blob) => {
          onSave(new File([blob], 'avatarPicture.jpg'), canvas); // convert to jpeg
        });
    }
    handleClose();
  };

  return (
    <Modal open={openModal} handleClose={() => setOpenModal(false)}>
      <div className={classes.modal}>
        <div className={classes.avatarEditor}>
          <AEditor
            image={image}
            ref={(editor) => setEditor(editor)}
            width={200}
            height={200}
            border={0}
            borderRadius={100}
            color={[55, 55, 55, 0.6]}
            scale={imageScale}
          />
        </div>
        <Slider
          disabled={!ready}
          value={imageScale}
          onChange={handleSlide}
          min={1}
          max={2}
          step={0.001}
          aria-labelledby="continuous-slider"
        />
        <div className={classes.buttons}>
          <Button component="label" variant="outlined" color="primary">
            Choose
            <input type="file" onChange={handleChooseFile} style={{ display: 'none' }} />
          </Button>
          &nbsp;
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={!ready}
          >
            Set
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    flexFlow: 'column',
    padding: 35,
  },
  avatarEditor: {
    margin: 'auto',
    marginBottom: 20,
  },
  buttons: {
    display: 'flex',
    flexFlow: 'row',
    '&>*': {
      minWidth: 130,
    },
  },
}));

export default AvatarEditor;
