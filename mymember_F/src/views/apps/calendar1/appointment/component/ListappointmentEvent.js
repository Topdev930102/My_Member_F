import React, { useEffect, useState } from "react";
import { withStyles, Tooltip, TablePagination } from "@material-ui/core";
import { Button, ButtonGroup } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { FormGroup, CustomInput } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import {
  DELETE_APPOINTMENT_OR_EVENT,
  UPDATE_APPOINTMENT,
  FETCH_EVENTS_OR_APPOINMENT,
} from "../../../../../redux/actions/appointment";
import { connect } from "react-redux";
import RowSkeleton from "../../../../dashboard1/components/RowSkeleton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditAndDeleteEventOrAppt from "./EditAndDeleteEventOrAppt";
const TextOnlyTooltip = withStyles({
  tooltip: {
    color: "gray",
    backgroundColor: "#fff",
    fontSize: "12px",
    border: `2px solid rgb(109 117 141 / 10%)`,
    boxShadow: "0 12px 48px rgb(109 117 141 / 30%)",
  },
})(Tooltip);

const EventAppButton = styled(Button)(({ theme }) => ({}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  color: theme.palette.primary.white,
}));

const ListOfEventAndAppointment = (props) => {
  const {
    filterbydata,
    DELETE_APPOINTMENT_OR_EVENT,
    gobackdata,
    getEvent_or_ApppoitnmentBy_cetegory,
    handleCloseOpen,
    isEdit,
    showEvents,
    type,
  } = props;
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [loading, setloading] = useState(true);
  const [tabsActive, setActiveTab] = useState(type);
  const [pageNumber, setpageNumber] = useState(0);
  const [defaultAlert2, setdefaultAlert2] = useState(false);
  const [data, setdata] = useState(null);
  const rowsPerPage = 10;
  const [id, setId] = useState(null);
  const [item, setitems] = useState(null);

  const confirmAnswer = () => {
    setdefaultAlert(false);
    props.UPDATE_APPOINTMENT(
      { status: !item?.status },
      id,
      pageNumber,
      10,
      tabsActive
    );
  };

  const handleDefalt = (item) => {
    setdefaultAlert2(true);
    setId(item);
  };
  const ConFirmDelete = (id) => {
    DELETE_APPOINTMENT_OR_EVENT(id);
    setdefaultAlert2(false);
  };

  const handleAlert = (item) => {
    setdefaultAlert(true);
    setId(item?._id);
    setitems(item);
  };
  const handlePagination = async (e, value) => {
    setpageNumber(value);
    gobackdata(pageNumber, rowsPerPage, tabsActive);
    setloading(false);
  };
  useEffect(() => {
    setloading(true);
    if (getEvent_or_ApppoitnmentBy_cetegory === null) {
      gobackdata(pageNumber, 10, tabsActive);
      setdata(getEvent_or_ApppoitnmentBy_cetegory);
    } else {
      setloading(false);
    }
  }, [
    gobackdata,
    getEvent_or_ApppoitnmentBy_cetegory,
    pageNumber,
    data,
    tabsActive,
  ]);

  const handleActivetab = async (value) => {
    setloading(true);
    await setActiveTab(value);
    await gobackdata(pageNumber, rowsPerPage, value);
    setloading(false);
  };
  const handleFilterByday = async (e) => {
    let { value } = e.target;
    await setloading(true);
    await filterbydata(tabsActive, pageNumber, rowsPerPage, value);
    await setloading(false);
  };
  return (
    <div
      className={`add-event-sidebar ${showEvents ? "show" : "hidden"}`}
      style={{ width: "590px" }}
    >
      <div className="p-1 d-flex justify-content-between">
        <div>
          <StyledButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <EventAppButton
              sx={{
                backgroundColor: tabsActive === type ? "#00a9e2" : "#fff",
                color: tabsActive === type ? "#fff" : "#00a9e2",
              }}
              key={type}
              onClick={() => {
                handleActivetab(type);
              }}
            >
              {type === "event" ? `Event List` : `Appointment List`}
            </EventAppButton>
            {/*  <EventAppButton
              sx={{
                backgroundColor:
                  tabsActive === "appointment" ? "#00a9e2" : "#fff",
                color: tabsActive === "appointment" ? "#fff" : "#00a9e2",
              }}
              key="appointment"
              onClick={() => {
                handleActivetab("appointment");
              }}
            >
              Appointment
            </EventAppButton> */}
          </StyledButtonGroup>
        </div>

        <FormGroup className="form-label-group">
          <CustomInput
            onChange={handleFilterByday}
            required
            type="select"
            id="profiletype"
            style={{ cursorL: "pointer" }}
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </CustomInput>
        </FormGroup>
      </div>
      {loading ? (
        [1, 2, 3, 4, 5, 6, 7].map((i) => {
          return <RowSkeleton key={i} />;
        })
      ) : (
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>
                  <b>Date</b>
                </TableCell>
                <TableCell align="left">
                  <b>Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Type</b>
                </TableCell>

                <TableCell>
                  <b>Manage</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getEvent_or_ApppoitnmentBy_cetegory?.data?.map((Map_item) => (
                <TableRow
                  key={Map_item?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ textAlign: "center" }}>
                    {moment(`${Map_item?.start}`).format("MM/DD/YYYY")}
                    <br />
                    {moment(`${Map_item?.start_time}`).format("hh:mm A")}
                  </TableCell>
                  <TableCell>{Map_item?.title}</TableCell>
                  <TableCell>{Map_item?.appointment_type}</TableCell>

                  <TableCell>
                    <EditAndDeleteEventOrAppt
                      OpenAlert={handleDefalt}
                      item={Map_item}
                      handleCloseOpen={handleCloseOpen}
                      isEdit={isEdit}
                      perpage={pageNumber}
                      perrows={10}
                      cetogary={tabsActive}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <center>
            <TablePagination
              component="div"
              count={getEvent_or_ApppoitnmentBy_cetegory?.totalCount || 0}
              page={pageNumber}
              onPageChange={handlePagination}
              rowsPerPage={10}
              rowsPerPageOptions={[]}
            />
          </center>
        </TableContainer>
      )}

      <Dialog
        open={defaultAlert}
        onClose={() => {
          setdefaultAlert(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex">
            <div className="mt-1">
              <CheckCircleOutlineIcon
                style={{
                  color: item?.status === true ? "#e05252" : "#55a65b",
                  marginTop: "0.2em",
                }}
              />
            </div>
            <div className="m-1" style={{ fontSize: "1.2em" }}>{`Mark As ${
              item?.status ? "Not Completed" : "Completed"
            }`}</div>
          </div>{" "}
        </DialogTitle>
        <DialogActions>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setdefaultAlert(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              confirmAnswer();
            }}
            className="btn btn-success"
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert2}
        title="Are you sure?"
        onConfirm={() => {
          ConFirmDelete(id);
        }}
        onCancel={() => {
          setdefaultAlert2(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you Delete it ?"
      />
      {/* <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert2}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, Delete"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete(id);
        }}
        onCancel={() => {
          setdefaultAlert2(false);
        }}
      >
        Are you sure you want to delete?
      </SweetAlert> */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    getEvent_or_ApppoitnmentBy_cetegory:
      state.appointmentAndEvent.getEvent_or_ApppoitnmentBy_cetegory,
    getsearchappoinmnt: state.appointmentAndEvent.getsearchappoinmnt,
  };
};

export default connect(mapStateToProps, {
  DELETE_APPOINTMENT_OR_EVENT,
  UPDATE_APPOINTMENT,
  FETCH_EVENTS_OR_APPOINMENT,
})(ListOfEventAndAppointment);
