import { Button, Card, Chip, Typography } from "@mui/material";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import { CustomInput, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { makeStyles } from "@material-ui/core";
import BookingsTypeSetting from "./BookingTypeSetting";


const useStyles = makeStyles(() => ({
    cardStyle: {
        boxShadow: "0 5px 10px #e4e0e0",
        borderRadius: "8px",
    },
    avtStyle: {
        height: "30px",
        width: "30px",
    },
    inputStyle: {
        height: "3em",
        borderRadius: "0.4em",
        border: "1px solid #b8c2cc",
        "& div": {
            padding: "0px !important",
        },
    },
    row: {
        display: "grid",
        gridTemplateColumns: " 20% 15% 10% 15% 15% 15% 10%",
    },
}));

const TableData = [
    {
        date: "Mon Dec 26 2022 17:47:53 GMT+0530 (India Standard Time)",
        time: "Mon Dec 26 2022 17:47:53 GMT+0530 (India Standard Time)",
        duration: "15 Minutes",
        bookingType: "15 Minutes Meeting",
        with: "Clinton Oh",
        status: "Scheduled"
    }, {
        date: "Mon Dec 26 2022 17:47:53 GMT+0530 (India Standard Time)",
        time: "Mon Dec 26 2022 17:47:53 GMT+0530 (India Standard Time)",
        duration: "15 Minutes",
        bookingType: "15 Minutes Meeting",
        with: "Clinton Oh",
        status: "Scheduled"
    }
]

const AllBooking = (props) => {
    const classes = useStyles();
    const [bookingType, setBookingType] = useState("Select one")
    const handleBookingType = (e) => {
        setBookingType(e.target.value)
    }
    return (
        <Fragment>

            {TableData?.length === 0 ? (
                <div style={{ minHeight: "70vh" }}>
                    <BookingsTypeSetting />
                </div>
            ) : (
                <div style={{ minHeight: "70vh" }}>
                    <div className="d-flex justify-content-between">
                        <h3>Booking</h3>
                        <div className="d-flex align-items-center">
                            <div className="pt-1" style={{ marginRight: "5px" }}>
                                <p style={{ fontSize: "20px" }}>View: </p>
                            </div>
                            <CustomInput
                                type="select"
                                name="docType"
                                value={bookingType}
                                id="docType"
                                onChange={handleBookingType}
                            >
                                <option value="Upcoming Booking">Upcoming Booking</option>
                                <option value="Past Booking">Past Booking</option>
                                <option value="Cancelled Booking">Cancelled Booking</option>
                                <option value="All Booking">All Booking</option>
                            </CustomInput>
                        </div>
                    </div>
                    <div>
                        <div className="pl-1 pr-1 pt-0">
                            <div className={`p-1 pt-0 ${classes.row} border-bottom`}>
                                <div className="d-flex justify-content-start">
                                    <b>Date</b>
                                </div>
                                <div className="d-flex justify-content-start ">
                                    <b>Time</b>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <b>Duration</b>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <b>Booking Type</b>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <b>With</b>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <b>Status</b>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <b>Action</b>
                                </div>
                            </div>
                            {
                                TableData.length > 0 ? (
                                    TableData.map((item, i) => {
                                        return (
                                            <div
                                                key={i}
                                                style={{ borderBottom: "1px solid #dddddd" }}
                                                className="p-1"
                                            >
                                                <div className={classes.row}>
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        {item?.date ?
                                                            <b>{moment(item?.date).format("MMMM, DD YYYY")}</b>
                                                            : "N/A"}
                                                    </div>
                                                    {/* <div className="d-flex justify-content-start align-items-center">
                                            <div className=" d-flex align-items-center">
                                                <Link to={`/student-info/${item._id}`}>
                                                    <Typography
                                                        className="m-0 pl-0"
                                                        color="textSecondary"
                                                    >
                                                        {item?.firstName
                                                            ? `${item?.firstName} ${item?.lastName}`
                                                            : "N/A"}
                                                    </Typography>
                                                </Link>
                                            </div>
                                        </div> */}
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        <div className="d-flex align-items-center justify-content-start">
                                                            {item?.time ?
                                                                moment(item?.time).format("hh:mm a")
                                                                : "N/A"}
                                                        </div>
                                                        {/* {
                                                <Chip
                                                    size="small"
                                                    label={
                                                        item?.status.toLowerCase() === "inactive"
                                                            ? "New"
                                                            : item?.status
                                                    }
                                                    style={{
                                                        marginRight: "1px",
                                                        background:
                                                            item?.status.toLowerCase() === "active"
                                                                ? "#def8e7"
                                                                : item?.status.toLowerCase() === "inactive"
                                                                    ? "#efebeb"
                                                                    : "#f9d2d0",
                                                        color:
                                                            item?.status.toLowerCase() === "active"
                                                                ? "#55a65b"
                                                                : item?.status.toLowerCase() === "inactive"
                                                                    ? "N/A"
                                                                    : "#e05252",
                                                        fontWeight: "bold",
                                                        fontSize: "0.8  em",
                                                    }}
                                                />
                                            } */}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        <Typography
                                                            className="m-0 pl-0"
                                                            color="textSecondary"
                                                        >
                                                            {item?.duration ?
                                                                item?.duration
                                                                : "N/A"}
                                                        </Typography>
                                                        {/* {
                                                <Chip
                                                    size="small"
                                                    label={item?.dayssince ? item?.dayssince : "N/A"}
                                                    style={{
                                                        color: "#ffffff",
                                                        backgroundColor: getRatingColor(item?.dayssince),
                                                    }}
                                                />
                                            } */}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        <Typography
                                                            className="m-0 pl-0"
                                                            color="textSecondary"
                                                        >
                                                            {item?.bookingType ?
                                                                item?.bookingType
                                                                : "N/A"}
                                                        </Typography>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        <Typography
                                                            className="m-0 pl-0"
                                                            color="textSecondary"
                                                        >
                                                            {item?.with ?
                                                                item?.with
                                                                : "N/A"}
                                                        </Typography>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-start">
                                                        <Chip
                                                            size="small"
                                                            label={item?.status ? item?.status : "N/A"}
                                                            style={{
                                                                color: "#ffffff",
                                                                backgroundColor: "#407840",
                                                            }}
                                                        />
                                                    </div>

                                                    {/* <div className="d-flex align-items-center justify-content-start">
                                            {item?.date !== undefined ? moment(item?.date).format("MM/DD/YYYY") : "N/A"}<br />
                                            {item?.time !== undefined ? item?.time : ""}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            {item?.notes ? moment(item?.notes.date).format("MM/DD/YYYY") : "N/A"}<br />
                                            {(item?.notes?.time) ? item?.notes.time : ""}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <span>{item?.notes ? item?.notes.note : "N/A"} </span>
                                        </div> */}
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                tag="div"
                                                                className="cursor-pointer"
                                                            >
                                                                <MoreVertRoundedIcon />
                                                            </DropdownToggle>
                                                            <DropdownMenu tag="ul" className="p-50">
                                                                <DropdownItem tag="li" className="px-25">
                                                                    <div className="d-flex align-items-center">
                                                                        <Edit size={18} className='mr-1' style={{ color: '#0184FF' }} />
                                                                        <span>Edit</span>
                                                                    </div>
                                                                </DropdownItem>
                                                                <DropdownItem tag="li" className="px-25">
                                                                    <div className="d-flex align-items-center">
                                                                        <Trash2 size={18} className='mr-1' style={{ color: '#EB5757' }} />
                                                                        <span>Remove</span>
                                                                    </div>
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <center>
                                        {/* <img src={NoDataImage} height="160px" alt="No Data" />
                            <b />
                            <h4>No Data</h4> */}
                                    </center>
                                )
                            }

                            {/* <TablePagination
                        component="div"
                        count={Number(data?.totalCount) || 0}
                        page={pageNumber}
                        onPageChange={handlePagination}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage="Rows per page"
                        rowsPerPageOptions={[5, 10, 20, 50, 100, 150, 200]}
                    /> */}
                        </div >
                    </div >
                </div>
            )}
        </Fragment >
    )
}
export default AllBooking