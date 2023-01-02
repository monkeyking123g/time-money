import * as React from "react";
import { Button, Dialog, useTheme, Typography, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useStyledTextField, useStyledButton } from "../styleComponent";
import { tokens } from "../theme";

const initialValues = {
  startHour: "",
  endHour: "",
};
//const validaFloat = /^\d*\.{1}\d*$/
const userSchema = yup.object().shape({
  startHour: yup.string(),
  endHour: yup.string(),
});

export default function FormDialog({ clous, pull }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const CustomButton = useStyledButton({
    color: colors.greenAccent[600],
    hoverColor: colors.greenAccent[500],
  });
  const [open, setOpen] = React.useState(true);
  const CustomTextField = useStyledTextField({
    color: colors.greenAccent[500],
    globalColor: colors.grey[800],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const C = () => {
  //   setOpen(false);
  // };
  const handleFormSubmit = (value) => {
    console.log(value);
    pull(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={clous}>
        <DialogTitle sx={{ backgroundColor: colors.secondary[500] }}>
          <Typography>Created</Typography>
        </DialogTitle>
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
              <DialogContent
                sx={{
                  backgroundColor: colors.secondary[500],
                  display: "flex",
                  flexDirection: "column",
                  "input[type=time]": {
                    border: "none",

                    fontSize: "16px",
                    fontFamily: "helvetica",
                    width: "250px",
                  },
                  // "input[type=time]::-webkit-datetime-edit-fields-wrapper" : {
                  //   display: "flex"
                  // },
                  // "input[type=time]::-webkit-datetime-edit-text" : {
                  //   padding: "19px 4px",
                  // },
                  // //  Hour */
                  // "input[type=time]::-webkit-datetime-edit-hour-field" : {
                  //     backgroundColor: "trasparent",
                  //     color: "#000",
                  //     borderRadius: "15%",
                  //     padding: "19px 13px"
                  // },
                  // "input[type=time]::-webkit-datetime-edit-minute-field" : {
                  //   // backgroundColor: colors.greenAccent[500],
                  //   color: "#000",
                  //   borderRadius: "15%",
                  //   padding: "19px 13px"
                  // },
                  // "input[type=time]::-webkit-datetime-edit-ampm-field" : {
                  //   backgroundColor: "#7155d3",
                  //   borderRadius: "15%",
                  //   color: "#000",
                  //   padding: "19px 13px"
                  // },
                  // "input[type=time]::-webkit-clear-button" : {
                  //   display: "none"
                  // },
                  // "input[type=time]::-webkit-inner-spin-button"  : {
                  //   display: "none"
                  // },
                  "input[type='time']::-webkit-calendar-picker-indicator": {
                    display: "none",
                    filter:
                      "invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)",
                  },

                  // 'input[type="number"]::-webkit-inner-spin-button' : {
                  //                          "-webkit-appearance": "none !important",
                  //   }
                }}
              >
                <DialogContentText
                  sx={{ backgroundColor: colors.secondary[500] }}
                >
                  A New Time of Day.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="startHour"
                  label="From"
                  type="time"
                  //fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startHour}
                  name="startHour"
                  error={!!touched.startHour && !!errors.startHour}
                  helperText={touched.startHour && errors.startHour}
                  sx={CustomTextField.root}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="endHour"
                  label="At"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endHour}
                  name="endHour"
                  error={!!touched.endHour && !!errors.endHour}
                  helperText={touched.endHour && errors.endHour}
                  sx={CustomTextField.root}
                />
              </DialogContent>
              <DialogActions sx={{ backgroundColor: colors.secondary[500] }}>
                <Button
                  onClick={clous}
                  sx={{ border: `1px solid #cf6679`, color: "#cf6679" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="containe"
                  sx={{
                    border: `1px solid ${colors.greenAccent[500]}`,
                    color: colors.greenAccent[500],
                  }}
                >
                  Conferm
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
