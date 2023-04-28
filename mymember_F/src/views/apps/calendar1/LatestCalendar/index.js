import { Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from "@mui/material";
import React, { Fragment, useState } from "react";
import { CardText, Col, Input, Row } from "reactstrap";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AllBooking from "./AllBookings";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { X } from "react-feather";
import CreateNewBokking from "./CreateNewBooking";


const MainCalender = () => {
    const [activeTab, setActiveTab] = useState("4");
    const [OpenCreate, setOpenCreate] = useState(false)

    return (
        <Fragment>
            <div style={{ marginBottom: "6px" }} className="d-flex justify-content-between align-items-center">
                <BreadCrumbs
                    // className="d-flex"
                    breadCrumbTitle="Calendar"
                    breadCrumbParent="Calendar"
                    breadCrumbActive="Calendar"
                />
                <div className="d-flex ">
                    <Button
                        className="ml-1"
                        onClick={() => setOpenCreate(true)}
                        style={{
                            color: "#fff",
                            height: "4vh",
                            background: "#0184FF",
                            borderRadius: "6px",
                        }}
                    >
                        <b>Create</b>
                    </Button>
                </div>
            </div>
            <Row className="">
                <Col sm={2} md={2} lg={2}>
                    <Card style={{ minHeight: "80vh" }}>
                        <div className="mb-1 p-1" >
                            <div
                                className="d-flex align-items-center finance-nav cursor-pointer"
                                onClick={() => {
                                    setActiveTab("1");
                                }}
                            >
                                <div
                                    className={`${activeTab === "1" ? "bullet active_bullet" : "bullet"
                                        }`}
                                />
                                <CardText className={`${activeTab === "1" && "text-primary"}`}>
                                    Appointment
                                </CardText>
                            </div>
                            <div
                                className="d-flex align-items-center finance-nav cursor-pointer"
                                onClick={() => {
                                    setActiveTab("2");
                                }}
                            >
                                <div
                                    className={`${activeTab === "2" ? "bullet active_bullet" : "bullet"
                                        }`}
                                />
                                <CardText className={`${activeTab === "2" && "text-primary"}`}>
                                    Attendance
                                </CardText>
                            </div>
                            <div
                                className="d-flex align-items-center finance-nav cursor-pointer"
                                onClick={() => {
                                    setActiveTab("3");
                                }}
                            >
                                <div
                                    className={`${activeTab === "3" ? "bullet active_bullet" : "bullet"
                                        }`}
                                />
                                <CardText className={`${activeTab === "3" && "text-primary"}`}>
                                    Schedule
                                </CardText>
                            </div>
                            <div
                                className="d-flex align-items-center finance-nav cursor-pointer"
                                onClick={() => {
                                    setActiveTab("4");
                                }}
                            >
                                <div
                                    className={`${activeTab === "4" ? "bullet active_bullet" : "bullet"
                                        }`}
                                />
                                <CardText className={`${activeTab === "4" && "text-primary"}`}>
                                    Booking
                                </CardText>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col sm={10} md={10} lg={10}>
                    <Card className="p-1" >
                        {activeTab === "4" ?
                            <AllBooking />
                            : ""}
                    </Card>
                </Col>
            </Row>
            <CreateNewBokking OpenCreate={OpenCreate} setOpenCreate={setOpenCreate} />
        </Fragment >
    )
}
export default MainCalender;