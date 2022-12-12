import * as React from 'react';
import { Link,useNavigate } from "react-router-dom";
// Componets 
import SingIn from './singIn';
import SingUn from './singUp';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Link from '@mui/material/Link';

import Paper from '@mui/material/Paper';
import { Box , useTheme, IconButton, TextField} from '@mui/material';
// import { withStyles } from "material-ui/styles";
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider,} from '@mui/material/styles';
import { tokens } from '../../theme';
import axios from 'axios';
// import { set } from 'date-fns';


const theme = createTheme();

export default function SignInSide({ loggeIn, credensial }) {
  let navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [clickSingUp, setClickSingUp] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState();
  const [fileChange, setFileChange] = React.useState();
  //shadowBar()
  const handleSubmit = () => {
    setClickSingUp(!clickSingUp)
  }
  // const onFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // }
//   const onSubmit = (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append("image" , selectedFile)
//     axios.post("http://localhost:3002/upload", formData, {
//     }).then(res => {
//         console.log(res)
//     })
// }
   const uploadImage = (e) => {

    // image from user 
     setSelectedFile(e.target.files[0]);

     const { files } = e.target;
     if (files.length === 0) {
       return;
     }
     const file = files[0];
     const fileReader = new FileReader();

     fileReader.onload = () => {
       setFileChange(fileReader.result);
     };
     fileReader.readAsDataURL(file);
   };
 
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', width: "100vw"}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // "input::-webkit-textfield-decoration-container" : {
              //   backgroundColor : colors.grey[800]
              // }
            }}
          >
            { clickSingUp ? 
            (
              <IconButton sx={{color : colors.primary[100]}}
               variant="contained"
               component="label"
              >
            
              <img src={fileChange} className="image-singUp"/>
             
              <input 
                type="file" 
                accept="image/*" 
                onChange={uploadImage}
                hidden
                />
                  
            
                
              {/* <input
                type="file"
                accept="image/*"
                // value={selectedFile}
                // accept="image/png, image/jpeg"
                hidden
                onChange={(e) => uploadImage(e)}
              /> */}
            
            </IconButton>
            ) : (
              <Avatar sx={{ m: 1, bgcolor: colors.primary[500], boxShadow: "rgba(0, 0, 0, 0.6) 0px 2px 10px 0px"}}> 
              <LockOutlinedIcon  color='#fff'/> 
              </Avatar>
            )
           
            }
            <Typography component="h1" variant="h5">
              {clickSingUp ? "Upload Foto" : "Sing In"}
            </Typography>
            {clickSingUp ? <SingUn handleSingIn={handleSubmit} imageUser={selectedFile} /> : <SingIn handleSingUp={handleSubmit} setCredensial={credensial}/>}
           
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}