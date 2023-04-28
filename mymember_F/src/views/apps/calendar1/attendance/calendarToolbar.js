import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Box } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "react-feather";
import { styled } from "@mui/material/styles";
import { fetchEvents } from "../../../../redux/actions/calendar/index";
import moment from "moment";
import { connect } from "react-redux";

const CalenderButton = styled(Button)(({ theme }) => ({
  minWidth: "45px",
  "& .MuiButton-root": {
    minWidth: "45px",
  },
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  color: theme.palette.primary.white,
}));

const CalendarToolbar = (props) => {
  const preMonth = props.label.split(" ")[0];
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [activeMonth, setActiveMonth] = useState("");
  const [getdataByDate, setGetDataByDate] = useState("");

  useEffect(() => {
    const month = moment(props.label).format("MMMM");
    const year = moment(props.label).format("YYYY");
    setActiveMonth(month);
    setActiveYear(year);
    if (props?.view === "day") {
      setActiveMonth(moment(props.label).format("MMMM"));
    }
    const date = moment(`01, ${month} ${year}`).format("MM-DD-YYYY");
    setGetDataByDate(date);
    localStorage.setItem("appointmentActivedate", date);
    try {
      if (getdataByDate !== date) {
        props.fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.label, props.view]);

  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 0px 10px 0px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CalenderButton
            variant="contained"
            aria-label="small button group"
            onClick={() => props.onNavigate("PREV")}
            sx={{
              color: "#fff",
              bgcolor: "#00a9e2",
            }}
          >
            <ChevronLeft size={15} />
          </CalenderButton>
          {/* <Box>{props.label}</Box> */}

          <div className="month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
            {props.label}
          </div>

          <CalenderButton
            variant="contained"
            aria-label="small button group"
            onClick={() => props.onNavigate("NEXT")}
            sx={{
              color: "#fff",
              bgcolor: "#00a9e2",
            }}
          >
            <ChevronRight size={15} />
          </CalenderButton>
        </Box>
        <Box>
          <StyledButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <CalenderButton
              sx={{
                backgroundColor: props.view === "day" ? "#00a9e2" : "#fff",
                color: props.view === "day" ? "#fff" : "#00a9e2",
              }}
              key="day"
              onClick={() => {
                props.onView("day");
              }}
            >
              day
            </CalenderButton>
            <CalenderButton
              sx={{
                backgroundColor: props.view === "week" ? "#00a9e2" : "#fff",
                color: props.view === "week" ? "#fff" : "#00a9e2",
              }}
              key="week"
              onClick={() => {
                props.onView("week");
              }}
            >
              Week
            </CalenderButton>

            <CalenderButton
              key="month"
              sx={{
                backgroundColor: props.view === "month" ? "#00a9e2" : "#fff",
                color: props.view === "month" ? "#fff" : "#00a9e2",
              }}
              onClick={() => {
                props.onView("month");
              }}
            >
              month
            </CalenderButton>
          </StyledButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default connect(null, {
  fetchEvents,
})(CalendarToolbar);
