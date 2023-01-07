import { Box, useTheme, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import Axios from "axios";
import CustomizedSnackbars from "../../components/Alert";
import { useStyledTextField } from "../../styleComponent";
import CircularIndeterminate from "../../components/Circular";

import { reactLocalStorage } from "reactjs-localstorage";

const SingIn = ({ handleSingUp }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [authenticated, isAuthenticated] = useState(false);
  const [stateError, setStateError] = useState({ state: false, title: "" });

  const CustomTextField = useStyledTextField({
    color: colors.pink[500],
    globalColor: colors.grey[800],
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      console.log("User is authentificated");
      return navigate("/");
    }
  }, [authenticated]);

  const handleSubmit = async (event) => {
    // loading data
    event.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/get/user`
      );

      const currentUser = response.data.find(
        (currUserResponse) =>
          currUserResponse.email === email &&
          currUserResponse.password === password
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
      } else {
        setStateError({
          state: true,
          title: "Email or Password Incorrect !",
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        setStateError({
          state: true,
          title: "Server not response !",
        });
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      mt={1}
      sx={CustomTextField.root}
    >
      {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      <CustomizedSnackbars
        SnackbarOpen={stateError}
        setSnackbarOpen={setStateError}
        severity="error"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        // autoFocus
        // sx={{
        //   "input:-webkit-autofill": { caretColor: "#fff" },
        // }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        // sx={{
        //   "input:-webkit-autofill": { caretColor: "#fff" },
        // }}
      />

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: colors.pink[600],
          ":hover": {
            backgroundColor: colors.primary[500],
          },
        }}
      >
        <Typography>Sign In</Typography>
      </Button>
      <Grid container>
        <Grid item>
          <Button type="submit" onClick={() => handleSingUp()}>
            <Typography color={colors.textColor[100]}>
              Don't have an account? Sign Up
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingIn;
