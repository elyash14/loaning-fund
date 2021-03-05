import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Modal as MuiModal, Backdrop, Fade } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export interface Modal {
  open: boolean;
  handleClose: () => void;
  hasCloseIcon?: boolean;
}

const Modal: FC<Modal> = ({ children, ...props }) => {
  const { open, handleClose, hasCloseIcon = true } = props;
  const classes = useStyles();

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.root}
    >
      <Fade in={open}>
        <div className={classes.modalContent}>
          {children}
          {hasCloseIcon && (
            <button className={classes.closeBtn} onClick={handleClose}>
              <CloseIcon className={classes.closeIcon} />
            </button>
          )}
        </div>
      </Fade>
    </MuiModal>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    display: 'flex',
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    borderRadius: '2px',
    boxShadow: '0 2px 12px 0 rgba(33, 36, 42, 0.25)',
    '&:focus': {
      outline: 'none',
    },
  },
  closeBtn: {
    position: 'absolute',
    display: 'flex',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    zIndex: 999,
  },
  closeIcon: {
    color: theme.palette.grey[400],
    transition: 'all 0.1s linear',
    '&:hover': {
      color: theme.palette.grey[900],
    },
  },
}));

export default Modal;
