import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import  { rows }  from "../time";
import { useEffect } from "react";
// Icons 
import { DownloadOutlined } from "@mui/icons-material";
import { PointOfSale } from "@mui/icons-material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
//Chart 
import LineChart from "../../components/LineChart";
import StateBox from "../../components/StateBox";
import ProgressCircle from "../../components/ProgressCircle";

import { useStyledButton } from "../../styleComponent";
// DB connetct
// import getTime from "../../../server/index"
import Axios from 'axios'

const Dashboard = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const CustomButton  = useStyledButton({color : colors.pink[600], hoverColor: colors.pink[500]})
    useEffect(()=>{
        Axios.get("http://localhost:3002/api/get").then((data)=>{
            console.log(data)
            //setPostList(data.data)
        });
        },[])
    return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcom to your dashboard."/> 
        
        <Box>
            <Button sx={CustomButton.root} >
                <DownloadOutlined sx={{mr: "10px"}}/>
                Download Reports 
            </Button>
        </Box>
        </Box>
        <Box 
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="15px"
        >
            {/* {Row 1} */}
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.secondary[500]}
                borderRadius="4px"
                border="1px solid #292929"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StateBox 
                    title="150:00 HH"
                    subtitle="Total this Month"
                    process="0.75"
                    increase="+75%"
                    icon={
                        <AccessTimeOutlinedIcon sx={{color: colors.greenAccent[500], fontSize: "26px"}}/>
                    }
                />
            </Box>
             
              <Box 
                gridColumn="span 3" 
                backgroundColor={colors.secondary[500]} 
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="4px"
                border="1px solid #292929"
            >
                <StateBox 
                    title={`${150 * 9.23} $`}
                    subtitle="Earning this Month"
                    process="0.5"
                    increase="+50%"
                    icon={
                        <PointOfSale sx={{color: colors.greenAccent[500], fontSize: "26px"}}/>
                    }
                />
            </Box>
             
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.secondary[500]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="4px"
                border="1px solid #292929"
            >
                <StateBox 
                    title="1320 h"
                    subtitle="Total this Year"
                    process="0.30"
                    increase="+30%"
                    icon={
                        <AccessTimeFilledOutlinedIcon sx={{color: colors.greenAccent[500], fontSize: "26px"}}/>
                    }
                />
            </Box>
             
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.secondary[500]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="4px"
                border="1px solid #292929"
            >
                <StateBox 
                    title="$8"
                    subtitle="Price Per Hour"
                    process="0.75"
                    increase="+43%"
                    icon={
                        <EuroOutlinedIcon sx={{color: colors.greenAccent[500], fontSize: "26px"}}/>
                    }
                />
            </Box>
            {/* ROW 2 */}
            <Box 
                    gridColumn="span 8"
                    gridRow="span 2"
                    // backgroundColor={colors.primary[100]}
                    p="30px"
                    borderRadius="4px"
                >
                    <Typography variant="h5" fontWeight={600} color={"#808080"}>
                        Campingn
                    </Typography>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center" 
                        mt="25px"
                    >
                        <ProgressCircle size="125" progressColor={colors.greenAccent[500]}/>
                        <Typography variant="h5" color={colors.greenAccent[500]} sx={{
                            mt : "15px"
                        }}>
                            ${1320 * 9.23} Revenue gerated this year.
                        </Typography>
                        <Typography color={"#808080"}>
                            Inclides extra misc expenditures and cost
                        </Typography>

                    </Box>
                </Box>
           
                {/* TRANSCTION */}
                <Box 
                    gridColumn="span 4" 
                    gridRow="span 2"
                    // backgroundColor={colors.primary[100]}
                    overflow="auto"
                    borderRadius="4px"
                >
                    <Box 
                        display="flex" 
                        justifyContent="space-between"
                        alignItems="end"
                        borderBottom = {`2px solid ${colors.grey[800]}`}
                        color={colors.textColor[200]}
                        p="15px" 
                    >
                        <Typography 
                            color={"#808080"} 
                            variant="h5" 
                            fontWeight={600}
                        >
                            Recent Transactios
                        </Typography>
                    </Box>
                    {rows.map((trasaction) => (
                        //console.log(trasaction)
                        <Box
                            key={`${trasaction.id}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom = {`2px solid ${colors.grey[800]}`}
                            p="15px"
                        >
                            <Box>
                            <Typography 
                                color={colors.grey[600]} 
                                variant="h5" 
                                fontWeight={600}
                            >
                                    {trasaction.id}
                            </Typography>
                            <Typography 
                                color={colors.pink[500]} 
                            >
                                    {trasaction.company}
                            </Typography>
                            </Box>
                            <Box color={colors.textColor[200]} fontSize="16px">{trasaction.dateCreated}</Box>
                            <Box 
                                // backgroundColor={colors.greenAccent[500]} 
                                p="5px 10px"
                                borderRadius="4px"
                                fontSize="16px"
                                color={colors.greenAccent[500]}
                            >
                                {trasaction.hours + " h"}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box
                gridColumn="span 12"
                gridRow="span 1"
                // backgroundColor={colors.primary[100]}
                borderRadius="4px"
            >
                <Box
                    // mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography 
                            variant="h5" 
                            fontWeight="600"
                            color={"#808080"} 
                        >
                            Revenue Generated
                        </Typography>
                        <Typography 
                            variant="h3" 
                            fontWeight="500"
                            color={colors.greenAccent[500]} 
                        >
                            $59,342,32
                        </Typography>
                    </Box>
                    {/* <Box>
                        <IconButton>
                            <DownloadOutlined
                                sx={{
                                    fontSize: "26px",
                                    color : colors.textColor[400]
                                }} 
                            />
                        </IconButton>
                    </Box> */}
                </Box>
                <Box height="250px" m="0 0 0 0">
                        <LineChart isDashboard={true} />
                </Box>
                </Box>

                {/* ROW 3 */}
               

            {/* ROW 4    */}
        </Box>
    </Box> 

    
    )
}

export default Dashboard;