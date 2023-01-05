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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authenticated, isAuthenticated] = useState(false);
  const [stateError, setStateError] = useState({ state: false, title: "" });

  const CustomTextField = useStyledTextField({
    color: colors.greenAccent[500],
    globalColor: colors.grey[800],
  });
  useEffect(() => {
    if (authenticated) {
      console.log("User is authentificated");
      setLoading(false);
      return navigate("/");
    }
  }, [authenticated]);

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("image", imageUser);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("earning_hour", values.earningHour);
    setLoading(true);
    function getUserAccount() {
      return Axios.post(`${process.env.REACT_APP_DOMAIN}/upload`, formData, {});
    }

    function getUserPermissions() {
      return Axios.get(`${process.env.REACT_APP_DOMAIN}/api/get/user`);
    }

    Promise.all([getUserAccount(), getUserPermissions()])
      .then(function (results) {
        const acct = results[0];
        const perm = results[1];
        if (acct.status == 200) {
          perm.data.forEach((user) => {
            if (
              user.email === values.email &&
              user.password === values.password
            ) {
              console.log("User faund !");
              const dataUser = {
                id: user.ID,
                email: user.email,
                password: user.password,
                image: user.image_url,
                ernin_hour: user.earning_hour,
              };
              reactLocalStorage.setObject("user", dataUser);
              isAuthenticated(true);
            }
          });
        } else console.log("problem");
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          setStateError({
            state: true,
            title: "Server error sorry  !",
          });
          setLoading(false);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
          setLoading(false);
        }
      });
  };

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
