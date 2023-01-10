import { useState } from "react";
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
import CircularIndeterminate from "../../components/Circular";

// my style
import { useStyledTextField, useStyledButton } from "../../styleComponent";

const initialValues = {
  hoursDone: "",
  dateCreate: dayjs(new Date()).locale("it").format("YYYY-MM-DD"),
  month: dayjs(new Date()).locale("it").format("MMMM YYYY"),
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
  const [loading, setLoading] = useState(false);
  // date piker UseState
  const [monthValue, setMonthValue] = useState(dayjs(new Date()));
  const [createValue, setCreateValue] = useState(dayjs(new Date()));
  const [userCredensial, setUserCredensial] = useState(
    reactLocalStorage.getObject("user")
  );
  const [stateSuccessfully, setStateSuccessfully] = useState({
    state: false,
    title: "",
  });

  const CustomTextField = useStyledTextField({
    color: colors.pink[500],
    globalColor: colors.grey[800],
  });
  const CustomButton = useStyledButton({
    color: colors.pink[600],
    hoverColor: colors.pink[500],
  });
  // const CustomInputGlobaol = useStyleInputGlobal({ color: colors.grey[800] });
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const handleFormSubmit = async (values, actions) => {
    setLoading(true);
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_DOMAIN}/api/create/month/${userCredensial.id}`,
        values,
        config
      );
      if (response.status === 200) {
        setStateSuccessfully({
          state: true,
          title: "Successfully Created.",
        });
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            hoursDone: "",
            dateCreate: dayjs(new Date()).locale("it").format("YYYY-MM-DD"),
            month: "",
          },
        });
        setMonthValue(null);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box m="20px">
      <CustomizedSnackbars
        SnackbarOpen={stateSuccessfully}
        setSnackbarOpen={setStateSuccessfully}
        severity="success"
      />
      <Box display="flex" justifyContent="space-between" mb="15px">
        <Header
          title="Sum by Month"
          TitleColor={colors.pink[500]}
          subtitle="Created a New Sum by Month"
        />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>
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
