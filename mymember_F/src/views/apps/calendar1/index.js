// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import classnames from "classnames";
import { Row, Col, Card, CardBody } from "reactstrap";
// ** Calendar App Component Imports
import AttendanceCalender from "./attendance/Calendar";
import AppointmentCalender from "./appointment/Appointment";
import SidebarLeft from "./SidebarLeft";
// ** Custom Hooks
import { useRTL } from "../../../utility/hooks/useRTL";
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

import "../../../../src/assets/scss/plugins/calendars/app-calendar.scss";

// ** CalendarColors
const calendarsColor = {
  Business: "primary",
  Holiday: "success",
  Personal: "danger",
  Family: "warning",
  ETC: "info",
};

const CalendarComponent = () => {
  // ** states
  const [calendarApi, setCalendarApi] = useState(null);
  const [showEventsAppList, setShowEventsAppList] = useState(false);
  const [filterType, setFilterType] = useState("Attendance");
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [addClassSidebarOpen, setAddClassSidebarOpen] = useState(false);
  const [addAppSidebarOpen, setAddAppSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  // ** Hooks
  const [isRtl] = useRTL();

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);
  // add class sidebar
  const handleSettingSidebar = () =>
    setAddClassSidebarOpen(!addClassSidebarOpen);

  // ** AddAppSidebar Toggle Function
  const handleAddAppSidebar = () => setAddAppSidebarOpen(!addAppSidebarOpen);

  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  // ** Blank Event Object
  const blankEvent = {
    title: "",
    start: "",
    end: "",
    allDay: false,
    url: "",
    extendedProps: {
      calendar: "",
      guests: [],
      location: "",
      description: "",
    },
  };

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle={filterType}
        breadCrumbParent="Calendar"
        breadCrumbActive={filterType}
      />
      <div className="app-calendar overflow-hidden border">
        <Card className="app-calendar-card">
          <CardBody>
            <Row className="g-0">
              <Col
                id="app-calendar-sidebar"
                className={classnames(
                  "col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column",
                  {
                    show: leftSidebarOpen,
                  }
                )}
              >
                <SidebarLeft
                  setFilterType={setFilterType}
                  filterType={filterType}
                  toggleSidebar={toggleSidebar}
                  // updateAllFilters={updateAllFilters}
                  handleAddEventSidebar={handleAddEventSidebar}
                  handleSettingSidebar={handleSettingSidebar}
                  handleAddAppSidebar={handleAddAppSidebar}
                  showEventsAppList={() =>
                    setShowEventsAppList(!showEventsAppList)
                  }
                  isShowEventsAppList={showEventsAppList}
                />
              </Col>
              <Col className="position-relative">
               
                {filterType === "Appointments" && (
                  <AppointmentCalender
                    type="appointment"
                    isRtl={isRtl}
                    blankEvent={blankEvent}
                    calendarApi={calendarApi}
                    toggleSidebar={toggleSidebar}
                    calendarsColor={calendarsColor}
                    setCalendarApi={setCalendarApi}
                    handleAddEventSidebar={handleAddEventSidebar}
                    showEventsAppList={showEventsAppList}
                    setShowEventsAppList={setShowEventsAppList}
                  />
                )}
                {filterType === "Events" && (
                  <AppointmentCalender
                    type="event"
                    isRtl={isRtl}
                    blankEvent={blankEvent}
                    calendarApi={calendarApi}
                    toggleSidebar={toggleSidebar}
                    calendarsColor={calendarsColor}
                    setCalendarApi={setCalendarApi}
                    handleAddEventSidebar={handleAddEventSidebar}
                    showEventsAppList={showEventsAppList}
                    setShowEventsAppList={setShowEventsAppList}
                  />
                )}
                 {filterType === "Attendance" && (
                  <AttendanceCalender
                    type={"Attendance"}
                    isRtl={isRtl}
                    blankEvent={blankEvent}
                    calendarApi={calendarApi}
                    toggleSidebar={toggleSidebar}
                    calendarsColor={calendarsColor}
                    setCalendarApi={setCalendarApi}
                    handleAddEventSidebar={handleAddEventSidebar}
                    handleSettingSidebar={handleSettingSidebar}
                  />
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default CalendarComponent;
