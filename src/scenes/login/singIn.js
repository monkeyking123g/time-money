import { Box, useTheme, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyleInputGlobal } from "../../styleComponent";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import Axios from "axios";
import CustomizedSnackbars from "../../components/Alert";

import { reactLocalStorage } from "reactjs-localstorage";

const SingIn = ({ handleSingUp }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [authenticated, isAuthenticated] = useState(false);
  const [stateError, setStateError] = useState({ state: false, title: "" });
  const CustomInputGlobaol = useStyleInputGlobal({ color: colors.grey[800] });
  let navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      console.log("User is authentificated");
      return navigate("/");
    }
  }, [authenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    Axios.get("http://localhost:3002/api/get/user").then((data) => {
      console.log(data.data);

      data.data.forEach((user) => {
        if (user.email === email && user.password === password) {
          const dataUser = {
            id: user.ID,
            email: user.email,
            password: user.password,
            image: user.image_url,
            ernin_hour: user.earning_hour,
          };
          reactLocalStorage.setObject("user", dataUser);
          isAuthenticated(true);
        } else if (user.email === email && user.password !== password) {
          setStateError({
            state: true,
            title: `This password incorrect " ${password} " !`,
          });
        } else if (user.email !== email && user.password === password) {
          setStateError({
            state: true,
            title: `This email incorrect " ${email} " !`,
          });
        } else if (user.email !== email && user.password !== password) {
          setStateError({
            state: true,
            title: "Email and password incorrect !",
          });
        }
      });
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      mt={1}
      sx={CustomInputGlobaol.root}
    >
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
        autoFocus
        sx={{
          "input:-webkit-autofill": { caretColor: "#fff" },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        sx={{
          "input:-webkit-autofill": { caretColor: "#fff" },
        }}
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
