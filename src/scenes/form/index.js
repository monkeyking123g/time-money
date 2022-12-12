import * as React from 'react';
import { Box, useTheme, Button  } from "@mui/material";
import { Formik } from 'formik';
import * as yup from "yup";
import Header  from "../../components/Header";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../theme";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useStyledTextField, useStyledButton, useStyleInputGlobal } from '../../styleComponent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';




const initialValues = {
    companyName : "",
    startHour : "",
    endHour : "",
    dateCreate : "",
    
}
// const phoneRegExp = 
//         /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const validaNumber = /^[0-9]+$/
const userSchema = yup.object().shape({
    companyName : yup.string(),
    startHour : yup.string().required(),
    endHour : yup.string().required(),
    dateCreate : yup.string(),
   
})

const Form = () => {
    const isNonMobile = useMediaQuery("min-width:600px")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const CustomTextField = useStyledTextField({color : colors.pink[500]})
    const CustomButton  = useStyledButton({color : colors.pink[600], hoverColor: colors.pink[500]})
    const CustomInputGlobaol = useStyleInputGlobal({color : colors.grey[800]})
    const [value, setValue] = React.useState(new Date());

    const handleFormSubmit = (values) => {
        if (values.dateCreate === ""){
            values.dateCreate = value.toLocaleDateString();
        }
        console.log(values)
        //console.log(value)
    }
    return (
        <Box m="20px">
            <Header title="Add Hours" TitleColor={colors.pink[600]} subtitle="Created a New Time of Day"></Header>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
              {({values, errors, touched ,handleBlur, handleChange, handleSubmit, setFieldValue}) => (
                <form onSubmit={handleSubmit}>
                    <Box 
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={CustomInputGlobaol.root}
                    >
                
                        <CustomTextField 
                            fullWidth
                            // variant="filled"
                            type="text"
                            label="Comapny Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value = {values.companyName}
                            name = "companyName"
                            error = {!!touched.companyName && !!errors.companyName}
                            helperText={touched.companyName && errors.companyName}
                            sx={{   
                                  gridColumn: "span 2"
                            }}
                            
                            
                        
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date Created"
                                onChange={(newValue) => (
                                    setValue(newValue),
                                    setFieldValue("dateCreate", new Date(newValue).toLocaleDateString())
                                )}
                                value={value}
                                renderInput={(params) => (
                                <CustomTextField
                                    error={!!touched.dateCreate && !!errors.dateCreate}
                                    helperText={touched.dateCreate && errors.dateCreate}
                                    name="dateCreate"
                                    // variant="filled"
                                    fullWidth
                                    {...params}
                                     sx={{
                                        '& :hover fieldset': {
                                            borderColor: '#111',
                                        },
                                        gridColumn: "span 2",
                                        svg : {fill: colors.primary[500]}     
                                    }} 
                                />
                                )}
                                />
                            </LocalizationProvider>
                         <CustomTextField
                            fullWidth
                            // variant="filled"
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
                                '& :hover fieldset': {
                                    borderColor: '#111',
                                  },
                                gridColumn: "span 2",
                            }}
                        />
                        <CustomTextField
                            fullWidth
                            // variant="filled"
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
                                '& :hover fieldset': {
                                    borderColor: '#111',
                                  },
                                gridColumn: "span 2",
                            }}
                        />
                        
                         {/* .toISOString().split('T') */}  
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit"  variant="containe"  sx={CustomButton.root}>   
                                Conferm   
                        </Button>
                    </Box>
                </form>
                
              )}
            </Formik>
        </Box>
    )
}


export default Form;