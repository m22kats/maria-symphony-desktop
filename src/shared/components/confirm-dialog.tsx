import { forwardRef, useState, useImperativeHandle, RefObject } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  title: string;
  content: string;
  onConfirm: (confirmed: boolean) => void;
  ref?: RefObject<any>;
};

const AlertDialog = forwardRef((props: Props, ref?: React.Ref<any>) => {
  const [open, setOpen] = useState(false);

  const handleClose = (confirmed: boolean) => {
    setOpen(false);
    props.onConfirm(confirmed);
  };

  useImperativeHandle(ref, () => ({
    handleClickOpen: () => {
      setOpen(true);
    },
  }));

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Disagree</Button>
          <Button onClick={() => handleClose(true)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default AlertDialog;
