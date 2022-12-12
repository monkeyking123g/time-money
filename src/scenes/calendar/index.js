// export default Calendar;
import css from "../../fullcalendar-vars.css";
import { rows } from "../time";
import React from "react";
import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FormDialog from "../../components/Dialog"
import { useStyledTextField } from "../../styleComponent";

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

const newRow = rows.map(element =>{
  return ({
    id : element.id,
    title : `${element.hours} h`,
    date : element.dateCreated,
    display: "list-item"
  })

})

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [togglePop, setTogglePop] = useState(false);
  const [hours, setHours] = useState(newRow);
  const [error, setError] = useState(false);
  const [time, setTime] = useState({})
  const [dataAweit, setDataAweit] = useState(false);
  const [open, setOpen] = useState(false);
  const [calendarApiGlobal, setCalendarApiGlobal] = useState()
  const CustomeTextField = useStyledTextField({color : colors.greenAccent[500]}) 

  
  
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    // Update the document title using the browser API
      if (dataAweit) {
        console.log("data pass ")
        const calendar = calendarApiGlobal.view.calendar;
        calendar.unselect()
        calendar.addEvent({
                 id: `${time.endHour}-${time.startHour}`,
                 title : `${time.startHour} - ${time.endHour}`,
                date: calendarApiGlobal.dateStr, // a property!
                display: "list-item"
          //      //  end: selected.dateStr 
          });
          setDataAweit(false)
          handleClosePopwindow()
      }
    
  });
  const pull_data = (data) => {
       setTime(data)
       setDataAweit(true)
   }
   const handleDateClick = (selected) => {
     const openPopWindow = handleOpen()
      setCalendarApiGlobal(selected);
    }
    // rows.push({
    //   id : `${selected.dateStr}-${title}`,
    //   company : "",
    //   hours : title,
    //   dateCreated: selected.dateStr
   const handleClosePopwindow = () => {
    setOpen(false);
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  return (
    <Box m="20px">
      {/* <Greeting errorMessage={error ? setTimeout(() => {setError(false);}, 4000): error}/> */}
      { open ? <FormDialog clous={handleClosePopwindow} pull={pull_data}/> : null}
      <Header title="Calendar" TitleColor={colors.pink[500]} subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.secondary[500]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {rows.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.primary[500],
                  color : "#000",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.company}
                  secondary={
                    <Typography>
                      {event.hours + " h." }
                      {/* {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })} */}
                      <Typography >
                      {formatDate(event.dateCreated, {
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
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px" sx={{
          ".fc .fc-list-event:hover td" : {
            backgroundColor: colors.grey[800]
          },
          ".fc .fc-daygrid-day.fc-day-today":   {
            color : colors.greenAccent[500]
        },
        ".fc .fc-button-primary:disabled" : {
            color : "#000",
            backgroundColor: colors.primary[500],
            borderColor: colors.primary[500],
            opacity : 0.9
        },
        ".fc .fc-button:focus" :  {
          outline : "none"
        },
        ".fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active" :{
          color: "#000"
          
      },
      ".fc-daygrid-dot-event .fc-event-title" : {
        color: colors.textColor[100],
        fontSize : "13px"
      },
      ".fc-theme-standard .fc-popover-header" : {
        color : colors.textColor[200] 
      },
      ".fc .fc-button-primary:disable":  {
         color : "#000",
         backgroundColor: "#dbe0e6",
         borderColor: "#dbe0e6",
      }
        }}>
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={hours}
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
  );
};

export default Calendar;