import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({SnackbarOpen, setSnackbarOpen}) {

  const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
    setSnackbarOpen({error: false, title: ""});
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar 
        open={SnackbarOpen.error} 
        autoHideDuration={6000} 
        anchorOrigin={{ vertical: 'Bottom',horizontal: 'right'}}
        onClose={handleClose}
        >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <Typography >{SnackbarOpen.title}</Typography>
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}