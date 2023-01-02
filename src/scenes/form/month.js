import * as React from "react";
import { Box, Button, useTheme, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

import "dayjs/locale/it";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import CustomizedSnackbars from "../../components/Alert";

// my style
import { useStyledTextField, useStyledButton } from "../../styleComponent";

const initialValues = {
  hoursDone: "",
  dateCreate: dayjs(new Date()).format("YYYY-MM-DD"),
  month: dayjs(new Date()).format("MMMM YYYY"),
};
// const validaNumber = /^[0-9]+$/;
const userSchema = yup.object().shape({
  hoursDone: yup.number().required("required"),
  dateCreate: yup.date().required("required"),
  month: yup.date().required("required"),
});

const FormMonth = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // date piker UseState
  const [monthValue, setMonthValue] = React.useState(dayjs(new Date()));
  const [createValue, setCreateValue] = React.useState(dayjs(new Date()));
  const [userCredensial, setUserCredensial] = React.useState(
    reactLocalStorage.getObject("user")
  );
  const [severity, setSeverity] = React.useState(true);
  const [stateSuccessfully, setStateSuccessfully] = React.useState({
    state: false,
    title: "",
  });
  React.useEffect(() => {}, [severity]);

  const CustomTextField = useStyledTextField({
    color: colors.pink[500],
    globalColor: colors.grey[800],
  });
  const CustomButton = useStyledButton({
    color: colors.pink[600],
    hoverColor: colors.pink[500],
  });
  // const CustomInputGlobaol = useStyleInputGlobal({ color: colors.grey[800] });

  const handleFormSubmit = (values, actions) => {
    Axios.post(
      `http://localhost:3002/api/create/month/${userCredensial.id}`,
      values,
      {}
    )
      .then((res) => {
        if (res.status === 200) {
          setSeverity(true);
          setStateSuccessfully({
            state: true,
            title: "Successfully Created.",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setSeverity(false);
          setStateSuccessfully({
            state: true,
            title: "Server problem !",
          });
        } else {
          console.log(error);
        }
      });
    actions.setSubmitting(false);
    actions.resetForm({
      values: {
        hoursDone: "",
        dateCreate: dayjs(new Date()).format("YYYY-MM-DD"),
        month: "",
      },
    });

    setMonthValue(null);
  };
  return (
    <Box m="20px">
      {severity ? (
        <CustomizedSnackbars
          SnackbarOpen={stateSuccessfully}
          setSnackbarOpen={setStateSuccessfully}
          severity="success"
        />
      ) : (
        <CustomizedSnackbars
          SnackbarOpen={stateSuccessfully}
          setSnackbarOpen={setStateSuccessfully}
          severity="error"
        />
      )}

      <Header
        title="Sum by Month"
        TitleColor={colors.pink[500]}
        subtitle="Created a New Sum by Month"
      ></Header>
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={CustomTextField.root}
            >
              <TextField
                fullWidth
                type="number"
                label="Total Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hoursDone}
                name="hoursDone"
                error={!!touched.hoursDone && !!errors.hoursDone}
                helperText={touched.hoursDone && errors.hoursDone}
                sx={{
                  gridColumn: isNonMobile ? "span 2" : "span 4",
                }}
              />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"it"}
              >
                <DatePicker
                  onChange={(newValue) => (
                    setMonthValue(dayjs(newValue)),
                    setFieldValue("month", dayjs(newValue).format("MMMM YYYY"))
                  )}
                  value={monthValue}
                  openTo="year"
                  views={["year", "month"]}
                  label="Month"
                  renderInput={(params) => (
                    <TextField
                      error={!!touched.month && !!errors.month}
                      helperText={touched.month && errors.month}
                      name="month"
                      fullWidth
                      {...params}
                      sx={{
                        gridColumn: isNonMobile ? "span 2" : "span 4",
                        svg: { fill: colors.primary[500] },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"it"}
              >
                <DatePicker
                  label="Date Created"
                  onChange={(newValue) => (
                    setCreateValue(dayjs(newValue)),
                    setFieldValue(
                      "dateCreate",
                      dayjs(newValue).format("YYYY-MM-DD")
                    )
                  )}
                  value={createValue}
                  renderInput={(params) => (
                    <TextField
                      error={!!touched.dateCreate && !!errors.dateCreate}
                      helperText={touched.dateCreate && errors.dateCreate}
                      name="dateCreate"
                      fullWidth
                      {...params}
                      sx={{
                        gridColumn: isNonMobile ? "span 2" : "span 4",
                        svg: { fill: colors.primary[500] },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                fullWidth
                variant="containe"
                sx={CustomButton.root}
              >
                <Typography>Conferm</Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormMonth;
