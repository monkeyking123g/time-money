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
  // const CustomInputGlobaol = useStyleInputGlobal({ color: colors.grey[800] });
  const CustomTextField = useStyledTextField({
    color: colors.pink[500],
    globalColor: colors.grey[800],
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      console.log("User is authentificated");
      setLoading(false);
      return navigate("/");
    }
  }, [authenticated]);

  const handleSubmit = (event) => {
    setLoading(true); // loading data
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const login = async () => {
      const get = await Axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/get/user`
      )
        .then((data) => {
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
            } else {
              // setLoading(false);
              setStateError({
                state: true,
                title: "Email or Password Incorrect !",
              });
            }
          });
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status);
            setStateError({
              state: true,
              title: "Server error sorry !",
            });
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
      setLoading(false);
    };
    login();
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
