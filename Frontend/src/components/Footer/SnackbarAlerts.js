import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useEffect, useState } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({notificationSnackbar}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(notificationSnackbar.message !== ""){
      setOpen(true);
    }
  } , [notificationSnackbar])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2}>        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={notificationSnackbar.severity} sx={{ width: '100%' }}>
              {notificationSnackbar.message}
            </Alert>
        </Snackbar>
    </Stack>
  );
}