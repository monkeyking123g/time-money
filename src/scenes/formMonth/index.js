import * as React from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { Formik, } from 'formik';
import * as yup from "yup";
import Header  from "../../components/Header";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../theme";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

// my style
import { useStyledTextField, useStyledButton, useStyleInputGlobal } from '../../styleComponent';




const initialValues = {
    // companyName : "",
    hoursDone : "",
    dateCreate : "",
    month: "",
    
}
const validaNumber = /^[0-9]+$/
const userSchema = yup.object().shape({
    // companyName : yup.string().required("required"),
    
    hoursDone : yup
        .string()
        .matches(validaNumber, "Is not number")
        .required("required"),
    dateCreate : yup.string(),
    month : yup.string().required("required")
   
})

const FormMonth = () => {
    const isNonMobile = useMediaQuery("min-width:600px")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // date piker UseState 
    const [monthValue, setMonthValue] = React.useState(null);
    const [createValue, setCreateValue] = React.useState(new Date());
    const CustomeTextField = useStyledTextField({color : colors.pink[500]})
    const CustomButton = useStyledButton({color: colors.pink[600], hoverColor: colors.pink[500] })
    const CustomInputGlobaol = useStyleInputGlobal({color : colors.grey[800]})
    const handleFormSubmit = (values) => {
        if (values.dateCreate === ""){
             values.dateCreate = createValue.toLocaleDateString();
         }
       
        console.log(values)
        //console.log(value)
    }
    return (
        <Box m="20px">
            <Header title="Add Total"  TitleColor={colors.pink[500]} subtitle="Created a New Total of Month"></Header>
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
                         <CustomeTextField
                            fullWidth
                            type="text"
                            label="Hours Done"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hoursDone}
                            name="hoursDone"
                            error={!!touched.hoursDone && !!errors.hoursDone}
                            helperText={touched.hoursDone && errors.hoursDone}
                           

                            sx={{
                                gridColumn: "span 2", 
                            }}
                        />
                        
                         {/* .toISOString().split('T') */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                onChange={(newValue) => (
                                    setMonthValue(newValue),
                                    setFieldValue("month", new Date(newValue).toLocaleString('default', { month: 'long', year : "numeric" }))
                                )}
                                value={monthValue}
                                views={['year', 'month']}
                                label="Month"
                                renderInput={(params) => (
                                <CustomeTextField
                                    error={!!touched.month && !!errors.month}
                                    helperText={touched.month && errors.month}
                                    name="month"
                                    
                                    fullWidth

                                    {...params}
                                     sx={{
                                            gridColumn: "span 2",
                                            svg : {fill: colors.primary[500]}  
                                          }} 
                                    
                                />
                                )}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date Created"
                                onChange={(newValue) => (
                                    setCreateValue(newValue),
                                    setFieldValue("dateCreate", new Date(newValue).toLocaleDateString())
                                )}
                                value={createValue}
                                renderInput={(params) => (
                                <CustomeTextField
                                    error={!!touched.dateCreate && !!errors.dateCreate}
                                    helperText={touched.dateCreate && errors.dateCreate}
                                    name="dateCreate"
                                    
                                    fullWidth
                                    {...params}
                                     sx={{
                                            gridColumn: "span 2",
                                            svg : {fill: colors.primary[500]}
                                          }} 
                                    
                                />
                              
                                )}
                                />
                            </LocalizationProvider>
                         
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit"  variant="containe" sx={CustomButton.root}>
                            Conferm
                        </Button>
                    </Box>
                </form>
                
              )}
            </Formik>
        </Box>
    )
}


export default FormMonth;