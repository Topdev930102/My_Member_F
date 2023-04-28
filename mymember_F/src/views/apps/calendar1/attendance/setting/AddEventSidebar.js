import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { ArrowLeft } from "react-feather";
import { FormGroup, Input, Label, Button, Row } from "reactstrap";
import Delete from "./components/delete";
import EditEvents from "./components/edit";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import "flatpickr/dist/themes/light.css";
import "../../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../../../../assets/scss/pages/users.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  CLEAR_SCHEDULE_STATUS,
  GET_PROGRAM_LIST,
} from "../../../../../redux/actions/settings/schedule";
import {
  DELETE_SCHEDULE_CLASS,
  ADD_CLASS_SCHEDULE,
  UPDATE_CLASS_SCHEDULE,
  UPDATE_WHOLE_CLASS_SCHEDULE,
  IS_LOADING,
} from "../../../../../redux/actions/calendar";
import { fetchEvents } from "../../../../../redux/actions/calendar/index";
import { Chip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { StyledTextField } from "../../../../ui-elements/mui/StyledComponents";

const getDayName = (dateIs) => {
  let m = moment(dateIs);
  return String(m.format("dddd"));
};
const dayNames = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const AddEvent = (props) => {
  const [ActiveTab, setTabActive] = React.useState(0);
  const [wholeStartDate, setWholeStartDate] = React.useState(0);
  const [wholeEndDate, setWholeEndDate] = React.useState(0);

  const [state, setState] = useState({
    program_name: "",
    class_name: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: "",
    end_time: "",
    program_color: "",
    repeat_weekly_on: [],
    defaultAlert: false,
  });

  useEffect(() => {
    props.GET_PROGRAM_LIST();
  }, []);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value, name) => {
    if (name === "start_date") {
      setState({ ...state, [name]: value, start_time: value });
    } else {
      setState({ ...state, [name]: value, end_time: value });
    }
  };

  const SelectProgram = (e) => {
    let program = props?.program?.filter(
      (item) =>
        item?._id === e.target.value || item?.programName === e.target.value
    )[0];
    setState({
      ...state,
      program_name: program?.programName,
      program_color: program?.color,
      program_id: program?._id,
    });
  };

  const checkboxHandler = (value) => {
    let copyState = state.repeat_weekly_on;
    let index = copyState.indexOf(value);
    if (index > -1) {
      copyState.splice(index, 1);
      setState({ ...state, repeat_weekly_on: [...copyState] });
    } else {
      setState({ ...state, repeat_weekly_on: [...copyState, value] });
    }
  };

  const handleAddEvent = async () => {
    await props.IS_LOADING(true);
    const { ...rest } = state;
    rest.start_time = rest.start_date;
    rest.end_time = rest.end_date;
    rest.start_date = moment(rest.start_date).format("MM/DD/YYYY");
    rest.end_date = moment(rest.end_date).format("MM/DD/YYYY");
    const data = await props.ADD_CLASS_SCHEDULE(rest);
    if (data) {
      await props.IS_LOADING(false);
    }
    setState({
      program_name: "",
      class_name: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      repeat_weekly_on: [],
    });
    props.handleSidebar(false);
  };

  const onCancel = () => {
    props.CLEAR_SCHEDULE_STATUS();
  };

  const { repeat_weekly_on } = state;

  return (
    <>
      <div className={`add-event-sidebar ${props.sidebar ? "show" : "hidden"}`}>
        {props.status && (
          <SweetAlert
            success
            title={"Success"}
            onCancel={onCancel}
            customButtons={
              <React.Fragment>
                <Button.Ripple color="primary" onClick={onCancel}>
                  Okay
                </Button.Ripple>
              </React.Fragment>
            }
          >
            {props?.message}
          </SweetAlert>
        )}

        <div className="d-flex justify-content-between">
          <h3 className="text-bold-500 mt-1 ml-1">Add Class</h3>
        </div>
        <div className="p-1">
          <div className="add-event-fields">
            <FormGroup>
              <Label>Program Name</Label>
              <Input
                type="select"
                name="program_name"
                onChange={SelectProgram}
                id="ProgramName"
              >
                <option>
                  {state?.program_name === ""
                    ? "-- Select Program --"
                    : props.eventInfo?.program_name}
                </option>
                {props?.program?.map((item, index) => {
                  return (
                    <option key={index} value={item?._id}>
                      {item.programName}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="text"
                id="ClassName"
                placeholder="Class Name"
                name="class_name"
                value={state.class_name}
                onChange={changeHandler}
              />
              <Label for="ClassName">Class Name</Label>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <FormGroup className="mr-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    id="startDate"
                    renderInput={(params) => <StyledTextField {...params} />}
                    label="Start Date & time"
                    value={state.start_date}
                    onChange={(date) => {
                      handleDateChange(date.$d, "start_date");
                    }}
                  />
                </LocalizationProvider>
              </FormGroup>
              <FormGroup>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(params) => <StyledTextField {...params} />}
                    label="End Date & time"
                    value={state.end_date}
                    onChange={(date) => {
                      handleDateChange(date.$d, "end_date");
                    }}
                    id="endDate"
                  />
                </LocalizationProvider>
              </FormGroup>
            </div>
            <FormGroup>
              <b>Repeat weekly on</b>
              <Row>
                <div className="col-md-12">
                  {repeat_weekly_on?.length > 0 &&
                    repeat_weekly_on?.map((item, i) => {
                      return (
                        <Chip
                          button="true"
                          key={i}
                          size="small"
                          icon={
                            <CheckCircleOutlineIcon
                              style={{ color: "#4f7fff" }}
                            />
                          }
                          onClick={() => checkboxHandler(item)}
                          style={{
                            margin: "4px",
                            background: "#6610f21a",
                            color: "#4f7fff",
                            fontWeight: "bold",
                          }}
                          label={item}
                          variant="outlined"
                        />
                      );
                    })}
                  {dayNames?.map((item, i) => {
                    return (
                      !repeat_weekly_on?.includes(item) && (
                        <Chip
                          button="true"
                          size="small"
                          style={{
                            margin: "4px",
                            background: "#f8f8f8",
                            fontWeight: "bold",
                          }}
                          key={i}
                          variant="outlined"
                          onClick={() => checkboxHandler(item)}
                          label={item.toLocaleLowerCase()}
                        />
                      )
                    );
                  })}
                </div>
              </Row>
            </FormGroup>
            <div className="add-event-actions text-right">
              <Button.Ripple color="primary" onClick={handleAddEvent}>
                Add Class
              </Button.Ripple>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    status: state.setting.class_schedule.status,
    message: state.setting.class_schedule.msg,
    program: state.setting.programList,
  };
};
export default connect(mapStateToProps, {
  DELETE_SCHEDULE_CLASS,
  fetchEvents,
  ADD_CLASS_SCHEDULE,
  CLEAR_SCHEDULE_STATUS,
  UPDATE_CLASS_SCHEDULE,
  UPDATE_WHOLE_CLASS_SCHEDULE,
  GET_PROGRAM_LIST,
  IS_LOADING,
})(AddEvent);
