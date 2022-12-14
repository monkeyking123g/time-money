// export default Calendar;
import css from "../../fullcalendar-vars.css";

import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import CircularIndeterminate from "../../components/Circular";
//import allLocales from "@fullcalendar/core/locales-all";
import itLocale from "@fullcalendar/core/locales/it";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FormDialog from "../../components/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import Axios from "axios";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { reactLocalStorage } from "reactjs-localstorage";

const Calendar = () => {
  const [hours, setHours] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [time, setTime] = useState({});
  const [dataAweit, setDataAweit] = useState(false);
  const [open, setOpen] = useState(false);
  const [calendarApiGlobal, setCalendarApiGlobal] = useState();
  const [data, setData] = useState([]);
  const userCredensial = reactLocalStorage.getObject("user");
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const dataReset = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/get/time/${userCredensial.id}`,
        config
      );
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_DOMAIN}/api/get/time/${userCredensial.id}`,
          config
        );
        if (Array.isArray(response.data)) {
          setData(response.data);
          const newRow = response.data.map((element) => {
            return {
              id: element.ID,
              title: `${element.start.slice(0, 5)} - ${element.end.slice(
                0,
                5
              )}`,
              date: dayjs(element.dateCreated).format("YYYY-MM-DD"),
              display: "list-item",
            };
          });
          setHours(newRow);
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
    loadData();
  }, []);

  useEffect(() => {
    if (dataAweit) {
      try {
        const calendar = calendarApiGlobal.view.calendar;
        console.log(calendarApiGlobal.dateStr);
        calendar.unselect();
        calendar.addEvent({
          id: `${time.endHour}-${time.startHour}`,
          title: `${time.startHour} - ${time.endHour}`,
          date: calendarApiGlobal.dateStr, // a property!
          display: "list-item",
        });
        setDataAweit(false);
        handleClosePopwindow();

        function precisionRound(number, precision) {
          let factor = Math.pow(10, precision);
          return Math.round(number * factor) / factor;
        }

        const startTimeTs = new Date(`2022-01-01 ${time.startHour}`).valueOf();
        const endTimeTs = new Date(`2022-01-01 ${time.endHour}`).valueOf();
        const durationTs = endTimeTs - startTimeTs;
        const durationInSecondes = durationTs / 1000;
        const durationInMinutes = durationInSecondes / 60;
        const durationInHours = durationInMinutes / 60;
        const values = {
          companyName: "",
          startHour: time.startHour,
          endHour: time.endHour,
          total: precisionRound(durationInHours, 2),
          dateCreate: calendarApiGlobal.dateStr,
        };
        const response = Axios.post(
          `${process.env.REACT_APP_DOMAIN}/api/create/time/${userCredensial.id}`,
          values,
          config
        );
        dataReset();
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  }, [dataAweit]);

  const pull_data = (data) => {
    setTime(data);
    setDataAweit(true);
  };
  const handleDateClick = (selected) => {
    handleOpen();
    setCalendarApiGlobal(selected);
  };
  const handleClosePopwindow = () => {
    setOpen(false);
  };
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      Axios.delete(
        `${process.env.REACT_APP_DOMAIN}/api/delete/time/${selected.event.id}`
      );
      selected.event.remove();
    }
  };
  return (
    <Box m={isNonMobile ? "20px" : "15px"}>
      {open ? (
        <FormDialog clous={handleClosePopwindow} pull={pull_data} />
      ) : null}
      <Box display="flex" justifyContent="space-between">
        <Header
          title="Calendar"
          TitleColor={colors.pink[500]}
          subtitle="Full Calendar Interactive Page"
        />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.secondary[500]}
          p="15px"
          borderRadius="4px"
          display={isNonMobile ? undefined : "none"}
        >
          <Typography variant="h5">Last Events</Typography>
          {loading ? (
            <CircularIndeterminate />
          ) : (
            <List>
              {data.slice(Math.max(data.length - 8, 0)).map((event) => (
                <ListItem
                  key={event.ID}
                  sx={{
                    backgroundColor: colors.primary[500],
                    color: "#000",
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    // primary={event.company}
                    secondary={
                      <Typography component={"span"}>
                        {"Total : " + event.total + " hour."}
                        <br />
                        <Typography component={"span"}>
                          {"Date : " +
                            formatDate(event.dateCreated, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* CALENDAR */}
        <Box
          flex={isNonMobile ? "1 1 100%" : undefined}
          width={isNonMobile ? undefined : "600px"}
          sx={
            isNonMobile
              ? undefined
              : {
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }
          }
        >
          <Box
            // flex="1 1 100%"
            ml="15px"
            width={isNonMobile ? "none" : "600px"}
            sx={{
              ".fc .fc-list-event:hover td": {
                backgroundColor: colors.grey[800],
              },
              ".fc .fc-daygrid-day.fc-day-today": {
                color: colors.greenAccent[500],
              },
              ".fc .fc-button-primary:disabled": {
                color: "#000",
                backgroundColor: colors.primary[500],
                borderColor: colors.primary[500],
                opacity: 0.9,
              },
              ".fc .fc-button:focus": {
                outline: "none",
              },
              ".fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active":
                {
                  color: "#000",
                },
              ".fc-daygrid-dot-event .fc-event-title": {
                color: colors.textColor[100],
                fontSize: "13px",
              },
              ".fc-theme-standard .fc-popover-header": {
                color: colors.textColor[200],
              },
              ".fc .fc-button-primary:disable": {
                color: "#000",
                backgroundColor: "#dbe0e6",
                borderColor: "#dbe0e6",
              },
            }}
          >
            <FullCalendar
              height="75vh"
              contentHeight="1000px"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: isNonMobile ? "prev,next today" : "prev,next",
                center: isNonMobile ? "title" : null,
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView={"dayGridMonth"}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              //initialEvents={hours}
              locale="it"
              events={hours}
              // Excemple data initial
              // {
              //    id: "12315",
              //    title: "All-day event",
              //    date: "2022-09-14",
              // },
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
