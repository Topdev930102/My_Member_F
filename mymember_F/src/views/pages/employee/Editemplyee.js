import {
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import Profile from "./uploadProfilePic";
import { connect, useDispatch } from "react-redux";
import {
  UPDATE_EVENT,
  GET_SUB_USERS_LIST,
  CREATE_SUB_USER,
  STORE_ROLE_ID,
  GET_EMPLOYEE_ROLES_LIST,
  CREATE_ROLE_LIST,
  UPDATE_SUB_USER,
} from "../../../redux/actions/employee_subusers_roles";
import { useHistory, useParams } from "react-router-dom";
import { Label } from "reactstrap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Menu, MenuItem } from "@mui/material";
import { Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";
import {
  Chip,
  Badge,
} from "@mui/material";
import "./employ.scss";
import Personal from "./formelemnts/Personal";
import Permission from "./formelemnts/Permission";
import DocumentActiveData from "./formelemnts/DocumentActiveData";
import DocumentEmployeeTable from "./formelemnts/DocumentEmployeeTable";
import EmployeeDocumentList from "./formelemnts/EmployeeDocumentList";
import Wagesandpayment from "./formelemnts/Wagesandpayment";
import Notes from "./formelemnts/Notes";
import Employement from "./formelemnts/Employement";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import WorkHistory from "../workHistory/workHistory";
import { PlayArrow, Stop } from "@material-ui/icons";
import {
  set_work_status,
  setProject,
  setStream,
  setDuration,
} from "../../../redux/actions/work-history";
import {
  // endWork,
  formatDuration,
  getCurrentWork,
  // startWork,
  updateWork,
} from "./utils";
import { startWork, endWork } from "../../../redux/actions/work-history";
import { ArrowDown } from "react-feather";
import { ChevronRight } from "@mui/icons-material";

import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  avatrStyle: {
    width: "10em",
    height: "10em",
    borderRadius: "50%",
    padding: "0.6em",
  },
  begIcon: {
    height: "2rem",
    width: "2rem",
    background: "#40a7e1",
    borderRadius: "50% !important",
    marginLeft: "-2rem",
    marginTop: "-3rem",
    position: "absolute",
    top: "-1em",
    left: "-6em",
  },
  ChipStyle: {
    borderRadius: "2px",
    margin: "1em",
    color: "#1992d7",
    background: "#c8dce8",
  },
  maindiv: {
    display: "flex",
    flex: "column",
    justifyContent: "center",
  },
}));

const Editemplyee = (props) => {
  const { CREATE_ROLE_LIST } = props;
  const [activeStep, setActiveStep] = useState("Personal");
  const { id, actionType } = useParams();
  const history = useHistory();
  const {
    role_id,
    UPDATE_EVENT,
    CREATE_SUB_USER,
    employeeSubUsersList,
    GET_SUB_USERS_LIST,
    isStartWork,
    set_work_status,
    setProject,
    project,
    stream,
    setStream,
    setDuration,
    duration,
    GET_EMPLOYEE_ROLES_LIST,
    employeeRolesList,
  } = props;

  const [optionData, setOptionData] = useState("update");
  const [profileImg, setProfileImg] = useState();
  const [roleNameId, setRoleNameId] = useState();
  const [rolesData, setRolesData] = useState([]);

  const selectedEmployee = employeeSubUsersList.filter(
    (item) => item?._id === id
  );

  const videosRef = React.useRef(null);
  const classes = useStyles();
  const myRef = React.createRef();

  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileNo: "",
    homeNo: "",
    pronouns: "",
    birthday: "",
    Address: "",
    zipCode: "",
    city: "",
    state: "",
    contactName: "",
    contactNo: "",
  });

  console.log(profileImg);

  const colors = ["#000000", "#60b644", "#ff4361"];

  const handleChange = (e) => {
    console.log(payload);
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (e) => {
    setRoleNameId(e);
    employeeRolesList.map((res) => {
      if (e === res?._id) {
        let data = JSON.stringify(res?.roles);
        payload?.roles?.push(data);
        setRolesData(data);
        setPayload({ ...payload, role: res?._id });
      }
    });
    // setPayload({ ...payload, role: e });
  };

  const imageHandler = (e) => {
    setProfileImg(e.target.files?.item(0));
  };

  const handleStatusChange = (e) => {
    if (e !== null) {
      setPayload({ ...payload, status: e });
    }
  };

  const handleSubmit = async (e) => {
    console.log(e);
    let formData = new FormData();
    console.log(payload);
    if (actionType === "Create") {
      formData.append(
        "firstname",
        payload?.firstname ? payload?.firstname : ""
      );
      formData.append("lastname", payload?.lastname ? payload?.lastname : "");
      formData.append("birthday", payload?.birthday ? payload?.birthday : "");
      formData.append("mobileNo", payload?.mobileNo ? payload?.mobileNo : "");
      formData.append("homeNo", payload?.homeNo ? payload?.homeNo : "");
      formData.append("pronouns", payload?.pronouns ? payload?.pronouns : "");
      formData.append("Address", payload?.Address ? payload?.Address : "");
      formData.append("city", payload?.city ? payload?.city : "");
      formData.append("state", payload?.state ? payload?.state : "");
      formData.append("email", payload?.email ? payload?.email : "");
      formData.append(
        "contactName",
        payload?.contactName ? payload?.contactName : ""
      );
      formData.append(
        "contactNo",
        payload?.contactNo ? payload?.contactNo : ""
      );
      formData.append("role", payload?.role ? payload?.role : "");
      formData.append("profile_img", profileImg ? profileImg : "");
      formData.append("username", payload.username ? payload.username : "");
      formData.append("password", payload.password ? payload.password : "");
      formData.append("roles", payload?.roles);
      formData.append("status", payload.status ? payload.status : "");
      await CREATE_SUB_USER(formData, roleNameId);
    } else {
      if (payload?.firstname !== undefined) {
        formData.append("firstname", payload?.firstname);
      }
      if (payload?.lastname !== undefined) {
        formData.append("lastname", payload?.lastname);
      }
      if (payload?.birthday !== undefined) {
        formData.append("birthday", payload?.birthday);
      }
      if (payload?.mobileNo !== undefined) {
        formData.append("mobileNo", payload?.mobileNo);
      }
      if (payload?.homeNo !== undefined) {
        formData.append("homeNo", payload?.homeNo);
      }
      if (payload?.pronouns !== undefined) {
        formData.append("pronouns", payload?.pronouns);
      }
      if (payload?.address !== undefined) {
        formData.append("Address", payload?.Address);
      }
      if (payload?.city !== undefined) {
        formData.append("city", payload?.city);
      }
      if (payload?.state !== undefined) {
        formData.append("state", payload?.state);
      }
      if (payload?.email !== undefined) {
        formData.append("email", payload?.email);
      }
      if (payload?.contactName !== undefined) {
        formData.append("contactName", payload?.contactName);
      }
      if (payload?.contactNo !== undefined) {
        formData.append("contactNo", payload?.contactNo);
      }
      if (payload?.username !== undefined || payload?.username === "") {
        formData.append("username", payload?.username ? payload?.username : "");
      }
      if (payload?.password !== undefined) {
        formData.append("password", payload?.password);
      }
      if (payload?.status !== undefined) {
        formData.append("status", payload?.status);
      }
      if (payload?.profileImg !== undefined) {
        formData.append("profile_img", profileImg);
      }
      if (payload?.role !== undefined) {
        formData.append("role", payload?.role);
      }
      if (payload?.roles !== undefined) {
        formData.append("roles", payload?.roles ? payload?.roles : "");
      }
      console.log("STart");
      console.log(formData);
      await UPDATE_EVENT(
        formData,
        selectedEmployee[0]?._id,
        roleNameId,
        rolesData
      );
      console.log("end");
    }
  };

  // const selectRoleHandler = (value) => {
  //   employeeRolesList.map((item) => {
  //     if (value === item?._id) {
  //       setSelectedRoleName(item?.rolename);
  //     }
  //   });
  //   GET_SUB_USERS_LIST(value);
  //   STORE_ROLE_ID(value);
  // };

  useEffect(() => {
    GET_EMPLOYEE_ROLES_LIST();
  }, [GET_EMPLOYEE_ROLES_LIST]);

  useEffect(() => {
    if (employeeRolesList.length) {
      if (role_id === null) {
        const { _id } = employeeRolesList[0];
        GET_SUB_USERS_LIST(_id);
        STORE_ROLE_ID(_id);
      }
    }
  }, [employeeRolesList]);

  return (
    <div className="w-100">
      <div className="d-flex">
        <Chip
          onClick={() => {
            history.fromback = true;
            history.goBack();
          }}
          label="Back"
          icon={<ArrowBackIcon color="primary" />}
        />
        <h2 className="ml-1 content-header-title float-left mb-0">
          {actionType === "Create" ? "Create Employee" : "Update Employee"}
        </h2>
      </div>
      <Card className="w-100 p-2 mt-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="m-1 d-flex">
            <div>
              <Label
                className="cursor-pointer"
                htmlFor="profile_img"
                onClick={imageHandler}
              >
                <Avatar
                  // className={`${classes.avatrStyle}`}
                  style={{ width: "130px", height: "130px" }}
                  src={profileImg ? URL.createObjectURL(profileImg) : ""}
                />
              </Label>
              <input
                type="file"
                name="profile_img"
                id="profile_img"
                accept="image/*"
                style={{ display: "none" }}
                onChange={imageHandler}
              />
            </div>

            <Typography className="ml-1 font-bold" variant="h4">{`${
              actionType === "Edit"
                ? selectedEmployee[0]?.firstname
                : payload?.firstname
            } ${
              actionType === "Edit"
                ? selectedEmployee[0]?.lastname
                : payload?.lastname
            }`}</Typography>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div>
              <TimeTracker
                duration={duration}
                isStartWork={isStartWork}
                project={project}
                setProject={setProject}
                setDuration={setDuration}
                set_work_status={set_work_status}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <Label
              className="cursor-pointer"
              htmlFor="profile_img"
              onClick={imageHandler}
            >
              <Avatar
                // className={`${classes.avatrStyle}`}
                style={{ width: "130px", height: "130px" }}
                src={profileImg ? URL.createObjectURL(profileImg) : ""}
              />
            </Label>
            <input
              type="file"
              name="profile_img"
              id="profile_img"
              accept="image/*"
              style={{ display: "none" }}
              onChange={imageHandler}
            />
          </div>

          <Typography className="ml-1 font-bold" variant="h4">{`${
            payload?.firstname ? payload?.firstname : ""
          } ${payload?.lastname ? payload?.lastname : ""}`}</Typography>
        </div>
        <Divider />
        <div className="mt-0 d-flex w-100 ">
          <List style={{ width: "300px" }} className="pr-1">
            {option?.map((item) => {
              return (
                <ListItem
                  key={item?.name}
                  className={`${`element${
                    activeStep === item?.name ? "-active" : ""
                  }`} w-100 pr-1`}
                  onClick={() => {
                    setActiveStep(item?.name);
                  }}
                >
                  <ListItemText>{item?.name}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          <div className="border-left w-100 m-1">
            {activeStep === "Personal" && (
              <Personal
                handleRoleSelect={handleRoleSelect}
                employeeRolesList={employeeRolesList}
                payload={payload}
                actionType={actionType}
                optionData={optionData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                selectedEmployee={selectedEmployee}
              />
            )}
            {activeStep === "Permission" && (
              <Permission
                handleStatusChange={handleStatusChange}
                handleRoleSelect={handleRoleSelect}
                employeeRolesList={employeeRolesList}
                payload={payload}
                actionType={actionType}
                optionData={optionData}
                selectedEmployee={selectedEmployee}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {activeStep === "My Folder" && <DocumentActiveData />}
            {activeStep === "Wages And Payment" && <Wagesandpayment />}
            {activeStep === "Notes" && <Notes />}
            {activeStep === "Employment" && <Employement />}
            {activeStep === "Work History" && <WorkHistory />}
          </div>
        </div>
      </Card>
      <video ref={videosRef} width={400} height={300} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role_id: state.employeeSubUser.role_id,
    employeeSubUsersList: state.employeeSubUser.employeeSubUsersList,
    isStartWork: state.workhistory.isStartWork,
    project: state.workhistory.project,
    stream: state.workhistory.stream,
    duration: state.workhistory.duration,
    employeeRolesList: state.employeeSubUser.employeeRolesList,
    // role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, {
  UPDATE_EVENT,
  CREATE_SUB_USER,
  GET_SUB_USERS_LIST,
  set_work_status,
  setProject,
  setStream,
  setDuration,
  GET_EMPLOYEE_ROLES_LIST,
  CREATE_ROLE_LIST,
  UPDATE_SUB_USER,
})(Editemplyee);

const option = [
  { name: "My Folder" },
  { name: "Personal" },
  { name: "Employment" },
  { name: "Wages And Payment" },
  { name: "Permission" },
  { name: "Work History" },
  { name: "Notes" },
  { name: "Work History" },
];

const SelectProject = ({ project, setProject, isStartWork }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { Option } = Select;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (projectName) => {
    setProject(projectName);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Input
        disabled={isStartWork}
        style={{ width: "150px" }}
        value={project}
        onChange={(e) => setProject(e.target.value)}
        addonAfter={
          <IconButton disabled={isStartWork} size="small" onClick={handleClick}>
            <ChevronRight sx={{ transform: "rotate(90deg)" }} />
          </IconButton>
        }
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        sx={{ width: "170px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={(e) => handleClose("General")}>General</MenuItem>
        <MenuItem onClick={(e) => handleClose("Meeting")}>Meeting</MenuItem>
        <MenuItem onClick={(e) => handleClose("Project 1")}>Project 1</MenuItem>
      </Menu>
    </div>
  );
};

const TimeTracker = ({
  isStartWork,
  set_work_status,
  project,
  setProject,
  stream,
  setStream,
  duration,
  setDuration,
}) => {
  const videosRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  // const [stream, setStream] = useState();
  // const [duration, setDuration] = useState(0);

  const { id } = useParams();

  const handleStartWorking = async (start) => {
    await startWork(id, "project1", set_work_status, setDuration);
    // if (isStartWork) {
    //   setDuration(0);
    //   let tracks = stream?.getTracks();
    //   tracks?.forEach((track) => track.stop());
    //   if (videosRef.current) videosRef.current.srcObject = null;
    //   localStorage.setItem("currentWork", "");
    // } else {
    //   let createdStream = await navigator.mediaDevices.getDisplayMedia({
    //     video: true,
    //     audio: false,
    //   });
    //   if (videosRef.current) videosRef.current.srcObject = createdStream;
    //   setStream(createdStream);
    //   const response = await startWork(id, project);
    //   localStorage.setItem("currentWork", JSON.stringify(response?.data));
    // }

    // set_work_status(start);
  };

  const handleEndWork = async () => {
    await endWork(set_work_status, setDuration);
  };

  React.useEffect(() => {
    // let timerId;
    // if (isStartWork) {
    //   timerId = setInterval(async () => {
    //     setDuration(duration + 1);
    //     if (duration % 10 === 0) {
    //       const imageCapture = new window.ImageCapture(
    //         stream?.getVideoTracks()[0]
    //       );
    //       if (
    //         !(
    //           imageCapture.track.readyState != "live" ||
    //           !imageCapture.track.enabled ||
    //           imageCapture.track.muted
    //         )
    //       ) {
    //         const frame = await imageCapture.grabFrame();
    //         var ctx = canvasRef.current?.getContext("2d");
    //         const screenshot = canvasRef.current?.toDataURL();
    //         // imageRef.current.src = screenshot;
    //         if (screenshot) await updateWork(getCurrentWork()._id, screenshot);
    //         if (canvasRef.current)
    //           ctx?.drawImage(
    //             frame,
    //             0,
    //             0,
    //             canvasRef.current?.width,
    //             canvasRef.current?.height
    //           );
    //       }
    //     }
    //   }, 1000);
    // }
    // if (isStartWork && !stream?.active) {
    //   set_work_status(false);
    //   setDuration(0);
    //   endWork(getCurrentWork()._id);
    // }
    // return () => clearInterval(timerId);
  }, [isStartWork, duration]);

  // React.useEffect(() => {
  //   console.log("props stream is ", stream);
  //   if(stream?.active) {
  //     setDuration(duration + 1);
  //   }
  // }, [])

  return (
    <div className="d-flex flex-row align-items-start">
      {isStartWork ? (
        <IconButton
          onClick={(e) => handleEndWork(true)}
          aria-label="fingerprint"
          style={{
            backgroundColor: "#eb4e29",
            color: "white",
            marginRight: "14px",
            height: "100%",
          }}
        >
          CLOCK OUT
          <Stop fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          onClick={(e) => handleStartWorking(true)}
          aria-label="fingerprint"
          style={{
            backgroundColor: "#27c26c",
            color: "white",
            marginRight: "14px",
            height: "100%",
          }}
        >
          CLOCK IN
          <PlayArrow fontSize="large" />
        </IconButton>
      )}
      <div>
        <SelectProject
          project={project}
          setProject={setProject}
          isStartWork={isStartWork}
        />
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {formatDuration(duration)}
        </div>
      </div>
      <video ref={videosRef} width={400} height={300} hidden />
      <canvas ref={canvasRef} width={400} height={300} hidden />
    </div>
  );
};
