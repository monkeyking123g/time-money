import * as React from "react";
import { Box, useTheme, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  useStyledButton,
  useStyleInputGlobal,
  useStyledTextField,
} from "../../styleComponent";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import CustomizedSnackbars from "../../components/Alert";

const initialValues = {
  companyName: "",
  startHour: "",
  endHour: "",
  dateCreate: dayjs(new Date()).format("YYYY-MM-DD"),
};
// const phoneRegExp =
//         /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
// const validaNumber = /^[0-9]+$/;
// const moment = require("moment");
const userSchema = yup.object().shape({
  companyName: yup.string(),
  startHour: yup.string(),
  endHour: yup
    .string()
    .test("is-greater", "end time should be greater", function (value) {
      const { startHour } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(startHour, "HH:mm"));
    }),
  dateCreate: yup.date(),
});

const Form = () => {
  const isNonMobile = useMediaQuery("min-width:600px");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stateSuccessfully, setStateSuccessfully] = React.useState({
    state: false,
    title: "",
  });
  //   const CustomTextField = useStyledTextField({ color: colors.pink[500] });
  const CustomTextField = useStyledTextField({
    color: colors.pink[500],
    globalColor: colors.grey[800],
  });
  const CustomButton = useStyledButton({
    color: colors.pink[600],
    hoverColor: colors.pink[500],
  });
  const CustomInputGlobaol = useStyleInputGlobal({ color: colors.grey[800] });
  const [value, setValue] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [userCredensial, setUserCredensial] = React.useState(
    reactLocalStorage.getObject("user")
  );
  console.log(value);
  const handleFormSubmit = (values, actions) => {
    if (values.dateCreate === "") {
      values.dateCreate = value.toLocaleDateString();
    }

    const startTimeTs = new Date(`2022-01-01 ${values.startHour}`).valueOf();
    const endTimeTs = new Date(`2022-01-01 ${values.endHour}`).valueOf();
    const durationTs = endTimeTs - startTimeTs;
    const durationInSecondes = durationTs / 1000;
    const durationInMinutes = durationInSecondes / 60;
    const durationInHours = durationInMinutes / 60;

    console.log(durationInHours);
    const newValuse = Object.assign(values, { total: durationInHours });
    console.log(newValuse);
    Axios.post(
      `http://localhost:3002/api/create/time/${userCredensial.id}`,
      newValuse,
      {}
    ).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setStateSuccessfully({ state: true, title: "Successfully Created." });
      }
    });
    actions.setSubmitting(false);
    actions.resetForm({
      values: {
        companyName: "",
        startHour: "",
        endHour: "",
        dateCreate: dayjs(new Date()).format("YYYY-MM-DD"),
      },
    });
  };
  return (
    <Box m="20px">
      <CustomizedSnackbars
        SnackbarOpen={stateSuccessfully}
        setSnackbarOpen={setStateSuccessfully}
        severity="success"
      />
      <Header
        title="Add Hours"
        TitleColor={colors.pink[600]}
        subtitle="Created a New Time of Day"
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
                type="text"
                label="Comapny Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"de"}
              >
                <DatePicker
                  label="Date Created"
                  onChange={(newValue) => (
                    setValue(dayjs(newValue).format("YYYY-MM-DD")),
                    setFieldValue(
                      "dateCreate",
                      dayjs(newValue).format("YYYY-MM-DD")
                    )
                  )}
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      error={!!touched.dateCreate && !!errors.dateCreate}
                      helperText={touched.dateCreate && errors.dateCreate}
                      name="dateCreate"
                      fullWidth
                      {...params}
                      sx={{
                        gridColumn: "span 2",
                        svg: { fill: colors.primary[500] },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                type="time"
                label="From"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startHour}
                name="startHour"
                error={!!touched.startHour && !!errors.startHour}
                helperText={touched.startHour && errors.startHour}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& :hover fieldset": {
                    borderColor: "#111",
                  },
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                type="time"
                label="At"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endHour}
                name="endHour"
                error={!!touched.endHour && !!errors.endHour}
                helperText={touched.endHour && errors.endHour}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& :hover fieldset": {
                    borderColor: "#111",
                  },
                  gridColumn: "span 2",
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" variant="containe" sx={CustomButton.root}>
                Conferm
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
