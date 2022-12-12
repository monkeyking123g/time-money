import { Box , useTheme, Button, Typography, TextField } from '@mui/material';
import { Formik, } from 'formik';
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import * as yup from "yup";
import Axios from 'axios'
import Grid from '@mui/material/Grid';
import { tokens } from '../../theme';
import { testStyledTextField, useStyleInputGlobal } from '../../styleComponent';
import { create } from 'yup/lib/Reference';

const initialValues = {
  email : "",
  password : "",
  passwordConfirmation : "",
  earningHour :"",
}
const validaNumber = /^[0-9]+$/
const userSchema = yup.object().shape({
  // companyName : yup.string().required("required"),
  
  email : yup.string().email(),
  password :  yup.string()
              .required('No password provided.') 
              .min(4, 'Password is too short - should be 4 chars minimum.'),
             
  passwordConfirmation : yup.string()
                .required('No password provided.') 
                .min(4, 'Password is too short - should be 4 chars minimum.')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
  earningHour : yup.string().matches(validaNumber, "This is not number").required("required"),
 
})

const SingUn = ({ handleSingIn ,imageUser }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();

    const CustomTextField = testStyledTextField({color : colors.greenAccent[500], globalColor:colors.grey[800] });
    const CustomInputGlobaol = useStyleInputGlobal({color : colors.grey[800]})
    
    const handleFormSubmit = (values) => {
       const formData = new FormData()
       formData.append("image" , imageUser)
       formData.append("email", values.email)
       formData.append("password", values.password)
       formData.append("earning_hour", values.earningHour)
       Axios.post("http://localhost:3002/upload", formData, {
       }).then(res => {
         console.log(res)
         if(res.status === 200) {
          return navigate("/")
         }
       })
      
      // console.log(image_url)
      // Axios.post('http://localhost:3002/api/create/user', {
      //    email: values.email, 
      //    password: values.password, 
      //    imageUrl: image_url,
      //    earning_hour: values.earningHour
      //  })
      //  console.log("Created new user" )
      //  return navigate("/")
    }
 
    
    return (
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({ values, errors, touched ,handleBlur, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}  enctype="multipart/form-data">
        <Box mt={1}  sx={CustomTextField.root}>
            
        <TextField
          borderColor={colors.greenAccent[500]}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          // sx={{ border: "1px solid #111"}}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          autoComplete="current-password"
        />
         <TextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password2}
          error={!!touched.passwordConfirmation && !!errors.passwordConfirmation}
          helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          autoComplete="current-password"
        />
         <TextField
          margin="normal"
          required
          fullWidth
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.earningHour}
          error={!!touched.earningHour && !!errors.earningHour}
          helperText={touched.earningHour && errors.earningHour}
          label="Earning per hour"
          name="earningHour"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EuroOutlinedIcon  sx={{color : colors.greenAccent[600]}}/>
              </InputAdornment>
            ),
          }}
          autoFocus
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[600], ":hover" : {backgroundColor: colors.greenAccent[500]} }}
        >
          <Typography color={colors.textColor[200]}>
              Sing Up
          </Typography>
        </Button>
        <Grid container>
          <Grid item>
          <Button 
            type="submit" 
            onClick={() => (handleSingIn())} 
            sx={{":hover" : {backgroundColor: colors.greenAccent[800]}}}
            
            >
              <Typography color={colors.primary[700]}>
              Sing In
             </Typography>
            </Button>
          </Grid> 
        </Grid>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Box>
      </form>
                
      )}
    </Formik>
    )

}

export default SingUn; 