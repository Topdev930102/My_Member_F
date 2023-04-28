// ** React Imports
import { Fragment, useState } from "react";

// ** Custom Components
import classnames from "classnames";

// ** Reactstrap Imports

import { CardText } from "reactstrap";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { Button, Box } from "@material-ui/core";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";
import "../../../assets/scss/pages/finance.scss";
// ** illustration import

import AddEventOrAppointment from "./appointment/component/AddEventAppoinment";
import AttendanceTableSidebar from "./attendance/tablesidebar";
import AddEventButton from "./attendance/AddEventButton";
import Settings from "./settings/settings";
// ** Filters Checkbox Array

const SideBarButton = styled(Button)(({ theme }) => ({
  color: "#00a9e2",
  borderColor: "#00a9e2",
  "&:hover": {
    borderColor: "#00a9e2",
  },
}));

const SidebarLeft = (props) => {
  // ** Props
  const { setFilterType, filterType, showEventsAppList, isShowEventsAppList } =
    props;
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [settingCloseOpen, setSettingCloseOpen] = useState(false);
  const handleAddAppointmentCloseOpen = () => {
    setIsAddAppointmentOpen(!isAddAppointmentOpen);
  };
  const handleSettingCloseOpen = () => {
    setSettingCloseOpen(!settingCloseOpen);
  };

  return (
    <Fragment>
      <div className="sidebar-wrapper">
        <Box>
          <Stack spacing={2} paddingX="15px">
            {filterType === "Attendance" && (
              <>
                <AddEventButton type="Setting" />
                <AttendanceTableSidebar type="Attendance" />
              </>
            )}
            {filterType === "Appointments" && (
              <>
                <AddEventOrAppointment
                  type="appointment"
                  handleCloseOpen={handleAddAppointmentCloseOpen}
                  open={isAddAppointmentOpen}
                />
                <SideBarButton
                  onClick={handleAddAppointmentCloseOpen}
                  variant={isAddAppointmentOpen ? "contained" : "outlined"}
                  key="Add-Appointment"
                  type="appointment"
                >
                  <b> + Add Appointment</b>
                </SideBarButton>
                <SideBarButton
                  variant={isShowEventsAppList ? "contained" : "outlined"}
                  key="View-Appointments"
                  type="appointment"
                  onClick={showEventsAppList}
                  sx={{
                    color: "#00a9e2",
                  }}
                >
                  <b>View Appointments</b>
                </SideBarButton>
              </>
            )}
            {filterType === "Events" && (
              <>
                <AddEventOrAppointment
                  type="event"
                  handleCloseOpen={handleAddAppointmentCloseOpen}
                  open={isAddAppointmentOpen}
                />
                <SideBarButton
                  onClick={handleAddAppointmentCloseOpen}
                  variant={isAddAppointmentOpen ? "contained" : "outlined"}
                  key="Add-events"
                  type="event"
                >
                  <b> + Add Event</b>
                </SideBarButton>
                <SideBarButton
                  variant={isShowEventsAppList ? "contained" : "outlined"}
                  key="View-events"
                  onClick={showEventsAppList}
                  sx={{
                    color: "#00a9e2",
                  }}
                  type="event"
                >
                  <b>View Events</b>
                </SideBarButton>
              </>
            )}
          </Stack>
        </Box>
        <div className="section-header">
          <div className="divider" />
        </div>
        <div
          onClick={() => setFilterType("Appointments")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${
              filterType === "Appointments" ? "bullet active-bullet" : "bullet"
            }`}
          />
          <CardText className={`${filterType === "Appointments" && "active"}`}>
            Appointments
          </CardText>
        </div>
        <div
          onClick={() => setFilterType("Events")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${
              filterType === "Events" ? "bullet active-bullet" : "bullet"
            }`}
          />
          <CardText className={`${filterType === "Events" && "active"}`}>
            Events
          </CardText>
        </div>
        <div
          onClick={() => setFilterType("Attendance")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${
              filterType === "Attendance" ? "bullet active-bullet" : "bullet"
            }`}
          />
          <CardText className={`${filterType === "Attendance" && "active"}`}>
            Attendance
          </CardText>
        </div>

        <div className="section-header">
          <span className="section-title">Filters</span>
          <div className="divider" />
        </div>
      </div>
      <div className="mt-auto">
        <div className="section-header">
          <span className="section-title">Settings</span>
          <div className="divider" />
        </div>
        <Settings
          type="Setting"
          handleCloseOpen={handleSettingCloseOpen}
          open={settingCloseOpen}
        />
        <div
          onClick={handleSettingCloseOpen}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <SettingsIcon
            style={{
              fontSize: "2em",
              color: "#AAAAAA",
              marginRight: "10px",
            }}
          />
          <CardText>Setting</CardText>
        </div>
      </div>
    </Fragment>
  );
};

export default SidebarLeft;
