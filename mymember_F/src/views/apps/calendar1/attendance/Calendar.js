import React, { useEffect, useState } from "react";
import AddEventSidebar from "./AddEventSidebar";
import SettingAddEventSidebar from "./setting/AddEventSidebar";
import SettingEditEventSidebar from "./setting/EditEventSidebar";
import { Card, CardBody, Button } from "reactstrap";
import { toast } from "react-toastify";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// import Tablesidebar from "./tablesidebar";
import {
  fetchEvents,
  handleSidebar,
  handleSettingSidebar,
  handleEditSettingSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  FETCH_CLASS_STUDENTS,
  UPDATE_CLASS_SCHEDULE,
} from "../../../../redux/actions/calendar/index";
import "react-toastify/dist/ReactToastify.css";
// import { ChevronLeft, ChevronRight } from "react-feather";
import MuiChip from "@material-ui/core/Chip";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../../assets/scss/plugins/calendars/react-big-calendar.scss";
import CalendarToolbar from "./calendarToolbar";

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const eventColors = {
  business: "bg-success",
  work: "bg-warning",
  personal: "bg-danger",
  others: "bg-primary",
};
function hexToRGB(hex, alpha) {
  try {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  } catch (error) {
    return hex;
  }
}

const CalendarApp = (props) => {
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState(props.app.selectedEvent);
  const [selectedEvent, setSelectedEvent] = useState(props.app.selectedEvent);
  const [event, setEvent] = useState(null);
  const [views] = useState({
    month: true,
    week: true,
    day: true,
  });
  //const [IsEditOrMarkAttendance, setIsEditOrMarkAttendance] = useState(false);
  const [activeTab, setActiveTab] = useState("MarkAttendance");

  const handleTabChange = (event, tabValue) => {
    if (tabValue === "MarkAttendance") {
      props.handleSidebar(true);
      props.handleEditSettingSidebar(false);
      handleSelectEventAttendance();
    } else {
      props.handleSidebar(false);
      props.handleEditSettingSidebar(true);
      handleSelectEventEdit();
    }
    setActiveTab(tabValue);
  };
  const { sidebar, settingSidebar, editSettingSidebar } = props.app;

  useEffect(() => {
    if (props?.app?.events !== undefined) {
      let dateToObj = props.app.events?.map((event) => {
        let startTimeH = null;
        let startTimeM = null;

        let endTimeH = null;
        let endTimeM = null;
        if (moment(event?.start_time)?.isValid) {
          startTimeH = moment(event?.start_time)?.format("HH");
          startTimeM = moment(event?.start_time)?.format("MM");

          endTimeH = moment(event?.end_time)?.format("HH");
          endTimeM = moment(event?.end_time)?.format("MM");
        } else {
          startTimeH = event?.start_time.split(":")[0];
          startTimeM = event?.start_time.split(":")[1];

          endTimeH = event?.end_time.split(":")[0];
          endTimeM = event?.end_time.split(":")[1];
        }

        event.start = new Date(
          moment(event.start_date).set({
            hour: Number(startTimeH),
            minute: Number(startTimeM),
          })?._d
        );
        event.title = event.class_name;
        event.end = new Date(
          moment(event.end_date).set({
            hour: Number(endTimeH),
            minute: Number(endTimeM),
          })?._d
        );
        return event;
      });
      setEvents(dateToObj);
    }
  }, [props?.app?.events]);

  useEffect(() => {
    props.fetchEvents();
  }, []);

  const handleEventColors = (event) => {
    var style = {
      // marginTop: '0.4em',
      fontWeight: "bold",
      borderRadius: "6px",
      // height: '2em',
      paddingTop: "0.2em",
      borderLeft: `0.2em solid ${event.program_color}`,
      color: event.program_color,
      backgroundColor: hexToRGB(event.program_color, 0.16),
    };

    return {
      style: style,
      className: eventColors[event.label],
    };
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const idx = events.indexOf(event);
    let allDay = event.allDay;
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = { ...event, start, end, allDay };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
    props.updateDrag(updatedEvent);
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
    props.updateResize({ ...event, start, end });
  };

  const handleSelectEventAttendance = () => {
    console.log(event, "event");
    props.handleSelectedEvent(event);
    props.FETCH_CLASS_STUDENTS(event?._id);
    // let _event = event;
    // _event.start_time = new Date();
    //setEventInfo(_event);
  };

  const handleSelectEventEdit = () => {
    props.handleSelectedEvent(event);
    setEventInfo(event);
    setSelectedEvent(event);
  };

  return (
    <div
      className="app-calendar position-relative"
      style={{ overflow: "hidden" }}
    >
      <div
        className={`app-content-overlay ${
          sidebar || settingSidebar || editSettingSidebar ? "show" : "hidden"
        }`}
        onClick={() => {
          props.handleSidebar(false);
          props.handleSettingSidebar(false);
          props.handleEditSettingSidebar(false);
          setEventInfo(null);
          props.handleSelectedEvent(null);
        }}
      ></div>
      <Card
        className="app-calendar-card-div"
        style={{
          marginBottom: "0px !important",
          borderRadius: "0px !important",
        }}
      >
        <CardBody>
          <DragAndDropCalendar
            localizer={localizer}
            events={props?.eventsList || []}
            resizable
            startAccessor="start"
            endAccessor="end"
            resourceAccessor="url"
            views={views}
            components={{ toolbar: CalendarToolbar }}
            eventPropGetter={handleEventColors}
            popup={true}
            //   style={{ height: 600 }}
            onSelectEvent={(event) => {
              setEvent(event);
              setEventInfo(event);
              props.handleSidebar(true);
              props.handleEditSettingSidebar(false);
              handleSelectEventAttendance();
            }}
            // onSelectSlot={({ start, end }) => {
            //   let checkRightDate =
            //     moment(start).format("YYYY/MM/DD") >=
            //     moment(new Date()).format("YYYY/MM/DD");
            //   if (checkRightDate) {
            //     props.handleSettingSidebar(true);
            //     props.handleSelectedEvent({
            //       title: "",
            //       label: null,
            //       start: new Date(start),
            //       end: new Date(end),
            //       url: "",
            //     });
            //   } else {
            //     toast.info(
            //       "Sorry!!! Please select a valid date to add your EVENT.",
            //       toastCSS()
            //     );
            //   }
            // }}
            selectable={true}
            messages={{
              showMore: (total) => (
                <MuiChip
                  size="small"
                  color="primary"
                  label={`+${total} more`}
                  style={{
                    cursor: "pointer",
                    background: "#40a7e1",
                    color: "#fff",
                    height: "1.4rem",
                  }}
                  onMouseOver={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                />
              ),
            }}
          />
        </CardBody>
      </Card>

      {(sidebar || editSettingSidebar) && (
        <div
          className={`add-event-sidebar ${
            sidebar || editSettingSidebar ? "show" : "hidden"
          }`}
          style={{ width: sidebar ? "620px" : "400px" }}
        >
          <TabContext value={activeTab} centered>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="Class tabs">
                <Tab label="Mark Attendance" value="MarkAttendance" />
                <Tab label="Edit Class" value="EditClass" />
              </TabList>
            </Box>
            <TabPanel value="MarkAttendance">
              {" "}
              <AddEventSidebar
                sidebar={sidebar}
                handleSidebar={props.handleSidebar}
                addEvent={props.addEvent}
                events={events}
                eventInfo={eventInfo}
                selectedEvent={props.handleSelectedEvent}
                updateEvent={props.updateEvent}
                resizable
              />
            </TabPanel>
            <TabPanel value="EditClass">
              {" "}
              <SettingEditEventSidebar
                sidebar={editSettingSidebar}
                handleSidebar={props.handleEditSettingSidebar}
                addEvent={props.addEvent}
                events={events}
                eventInfo={eventInfo}
                selectedEvent={props.handleSelectedEvent}
                updateEvent={props.updateEvent}
                event={selectedEvent}
                resizable
              />
            </TabPanel>
          </TabContext>
        </div>
      )}

      {props?.handleSettingSidebar && settingSidebar && (
        <SettingAddEventSidebar
          sidebar={settingSidebar}
          handleSidebar={props.handleSettingSidebar}
          addEvent={props.addEvent}
          events={events}
          eventInfo={eventInfo}
          selectedEvent={props.handleSelectedEvent}
          updateEvent={props.updateEvent}
          event={selectedEvent}
          resizable
        />
      )}
      {/*IsEditOrMarkAttendance && (
        <SweetAlert
          custom
          showCancel
          showCloseButton
          btnSize="md"
          title={
            <span>
              <small>Choose class action</small>!
            </span>
          }
          confirmBtnText="Mark Attendance"
          cancelBtnText="Edit / Delete"
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="primary"
          onConfirm={() => {
            props.handleSidebar(true);
            props.handleEditSettingSidebar(false);
            handleSelectEventAttendance();
          }}
          onCancel={() => {
            props.handleSidebar(false);
            props.handleEditSettingSidebar(true);
            handleSelectEventEdit();
          }}
          customClass="event-edit-alert"
          style={{
            width: "24em",
            left: "240px",
          }}
          closeBtnStyle={{
            fontWeight: 500,
          }}
        ></SweetAlert>
        ) */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.calendar,
    eventsList: state.calendar.events,
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  handleSidebar,
  handleEditSettingSidebar,
  handleSettingSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  FETCH_CLASS_STUDENTS,
  UPDATE_CLASS_SCHEDULE,
})(CalendarApp);
