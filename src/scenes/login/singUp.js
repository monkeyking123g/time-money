import { Box, useTheme, Button, Typography, TextField } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import { useState, useEffect } from "react";
import * as yup from "yup";
import Axios from "axios";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import { useStyledTextField } from "../../styleComponent";
import { reactLocalStorage } from "reactjs-localstorage";
import CircularIndeterminate from "../../components/Circular";
import CustomizedSnackbars from "../../components/Alert";

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  earningHour: "",
};

const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum."),

  passwordConfirmation: yup
    .string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  earningHour: yup.number().required("required"),
});

const SingUn = ({ handleSingIn, imageUser }) => {
  const [loading, setLoading] = useState(false);
  const [authenticated, isAuthenticated] = useState(false);
  const [stateError, setStateError] = useState({ state: false, title: "" });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const CustomTextField = useStyledTextField({
    color: colors.greenAccent[500],
    globalColor: colors.grey[800],
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageUser);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("earning_hour", values.earningHour);
    // const config = {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //   },
    // };
    try {
      await Axios.post(`${process.env.REACT_APP_DOMAIN}/upload`, formData, {});

      const currentUserResponse = await Axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/get/user`
      );

      const currentUser = currentUserResponse.data.find(
        (currUserResponse) =>
          currUserResponse.email === values.email &&
          currUserResponse.password === values.password
      );

      if (currentUser) {
        console.log("User faund !");
        reactLocalStorage.setObject("user", {
          id: currentUser.ID,
          email: currentUser.email,
          password: currentUser.password,
          image: currentUser.image_url,
          ernin_hour: currentUser.earning_hour,
        });
        isAuthenticated(true);
      }
    } catch (error) {
      console.error("Error in Submit form. Message: ", error);

      if (error.response) {
        console.log(error.response.status);
        setStateError({
          state: true,
          title: "Server error sorry  !",
        });
      } else {
        console.log("Error", error.message);
        setStateError({
          state: true,
          title: "Server not response  !",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      console.log("User is authentificated");

      return navigate("/");
    }
  }, [authenticated]);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        //enctype="multipart/form-data"
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box mt={1} sx={CustomTextField.root}>
            <CustomizedSnackbars
              SnackbarOpen={stateError}
              setSnackbarOpen={setStateError}
              severity="error"
            />
            {loading ? (
              <CircularIndeterminate />
            ) : (
              <Box display="flex" p="20px" />
            )}
            <TextField
              // borderColor={colors.greenAccent[500]}
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
              // autoComplete="current-password"
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
              value={values.passwordConfirmation}
              error={
                !!touched.passwordConfirmation && !!errors.passwordConfirmation
              }
              helperText={
                touched.passwordConfirmation && errors.passwordConfirmation
              }
              // autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.earningHour}
              error={!!touched.earningHour && !!errors.earningHour}
              helperText={touched.earningHour && errors.earningHour}
              label="Salary to Hourly"
              name="earningHour"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroOutlinedIcon sx={{ color: colors.greenAccent[600] }} />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.greenAccent[600],
                ":hover": { backgroundColor: colors.greenAccent[500] },
              }}
            >
              <Typography color={colors.textColor[200]}>Sing Up</Typography>
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  type="submit"
                  onClick={() => handleSingIn()}
                  sx={{
                    ":hover": { backgroundColor: colors.greenAccent[800] },
                  }}
                >
                  <Typography color={colors.primary[700]}>Sing In</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default SingUn;
