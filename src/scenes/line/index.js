import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import useMediaQuery from "@mui/material/useMediaQuery";

const Line = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box
      m="20px"
      sx={
        isNonMobile
          ? undefined
          : {
              overflowX: "auto",
              whiteSpace: "nowrap",
              overflowY: "hidden",
            }
      }
    >
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box
        height={isNonMobile ? "75vh" : "74vh"}
        width={isNonMobile ? "100%" : "1000px"}
      >
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
