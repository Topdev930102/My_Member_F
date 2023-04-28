import { Button, Card, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from "@mui/material";
import React, { Fragment, useState } from "react";
import { CardText, Col, Input, Row } from "reactstrap";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AllBooking from "./AllBookings";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { X } from "react-feather";


const CreateNewBokking = (props) => {
    const { OpenCreate, setOpenCreate } = props

    return (
        <Fragment>
            <Dialog open={OpenCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="md">
                <DialogTitle>
                    <div className="d-flex justify-content-between">
                        <h3>New Booking</h3>
                        <div className="close-icon">
                            <X
                                className="cursor-pointer"
                                size={20}
                                onClick={() => setOpenCreate(false)}
                            />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="d-flex align-items-center">
                        <div>
                            <b><label>Duration</label></b>
                            <div className="d-flex align-items-center">
                                <Input
                                    style={{ width: "10em" }}
                                    type="number"
                                    name="duration"
                                    id="duration"
                                />
                                <p className="ml-1 mb-0" style={{ fontSize: "16px" }}>minutes</p>
                            </div>
                        </div>
                        <div className="ml-4">
                            <b><label>Minimum meeting padding</label></b>
                            <div className="d-flex align-items-center">
                                <Input
                                    style={{ width: "10em" }}
                                    type="number"
                                    name="duration"
                                    id="duration"
                                />
                                <p className="ml-1 mb-0" style={{ fontSize: "16px" }}>minutes</p>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="d-flex align-items-center">
                        <div>
                            <b><label>How far out can users book?</label></b>
                            <div className="d-flex align-items-center">
                                <Input
                                    style={{ width: "10em" }}
                                    type="number"
                                    name="duration"
                                    id="duration"
                                />
                                <p className="ml-1 mb-0" style={{ fontSize: "16px" }}>days ahead</p>
                            </div>
                        </div>
                        <div className="ml-4">
                            <b><label>Booker's can't schedule within:</label></b>
                            <div className="d-flex align-items-center">
                                <Input
                                    style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                    type="number"
                                    name="duration"
                                    id="duration"
                                />
                                <Input
                                    style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                    type="number"
                                    name="duration"
                                    id="duration"
                                />
                                <p className="ml-1 mb-0" style={{ fontSize: "16px" }}>of current time</p>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <b><label>When are you available for thisbooking?</label></b>
                        <div style={{ border: "1px solid #c8c8c8", borderRadius: "8px" }}>
                            <div className="d-flex align-items-center mt-1">
                                <Checkbox />
                                <span className="">Sunday</span>
                            </div>
                            <Divider />
                            <Row>
                                <Col sm={3} md={3} lg={3}>
                                    <div className="d-flex align-items-center">
                                        <Checkbox defaultChecked />
                                        <span className="">Monday</span>
                                    </div>
                                </Col>
                                <Col sm={5} md={5} lg={5}>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <span className="mx-1">-</span>
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <div className="mr-1">
                                        <Button variant="outlined" style={{ borderRadius: "4px" }}>+ Add window</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col sm={3} md={3} lg={3}>
                                    <div className="d-flex align-items-center">
                                        <Checkbox defaultChecked />
                                        <span className="">Tuesday</span>
                                    </div>
                                </Col>
                                <Col sm={5} md={5} lg={5}>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <span className="mx-1">-</span>
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <div className="mr-1">
                                        <Button variant="outlined" style={{ borderRadius: "4px" }}>+ Add window</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col sm={3} md={3} lg={3}>
                                    <div className="d-flex align-items-center">
                                        <Checkbox defaultChecked />
                                        <span className="">Wednesday</span>
                                    </div>
                                </Col>
                                <Col sm={5} md={5} lg={5}>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <span className="mx-1">-</span>
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <div className="mr-1">
                                        <Button variant="outlined" style={{ borderRadius: "4px" }}>+ Add window</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col sm={3} md={3} lg={3}>
                                    <div className="d-flex align-items-center">
                                        <Checkbox defaultChecked />
                                        <span className="">Thursday</span>
                                    </div>
                                </Col>
                                <Col sm={5} md={5} lg={5}>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <span className="mx-1">-</span>
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <div className="mr-1">
                                        <Button variant="outlined" style={{ borderRadius: "4px" }}>+ Add window</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col sm={3} md={3} lg={3}>
                                    <div className="d-flex align-items-center">
                                        <Checkbox defaultChecked />
                                        <span className="">Friday</span>
                                    </div>
                                </Col>
                                <Col sm={5} md={5} lg={5}>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <span className="mx-1">-</span>
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <div className="mr-1">
                                        <Button variant="outlined" style={{ borderRadius: "4px" }}>+ Add window</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row className="mb-1">
                                <Col sm={3} md={3} lg={3}>
                                    <div className="d-flex align-items-center">
                                        <Checkbox />
                                        <span className="">Saturday</span>
                                    </div>
                                </Col>
                                <Col sm={9} md={9} lg={9} className="d-flex align-items-center">
                                    <span style={{ color: "#66697b", fontStyle: "italic" }} className="mb-0">Unavailable</span>
                                    {/* <div className="d-flex align-items-center">
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <span className="mx-1">-</span>
                                        <Input
                                            style={{ width: "5em", borderRadius: '6px 0px 0px 6px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                        <Input
                                            style={{ width: "5em", borderRadius: '0px 6px 6px 0px' }}
                                            type="number"
                                            name="duration"
                                            id="duration"
                                        />
                                    </div> */}
                                </Col>
                                {/* <Col sm={4} md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <div className="mr-1">
                                        <Button variant="outlined" style={{ borderRadius: "4px" }}>+ Add window</Button>
                                    </div>
                                </Col> */}
                            </Row>
                        </div>
                    </div>
                    <div className="mt-1">
                        <div>
                            <b><label>Ask one or more questions to the person scheduling this Booking <span style={{ fontStyle: "italic" }}>(optional)</span>:</label></b>
                            <div className="p-1" style={{ border: "1px solid #c8c8c8", borderRadius: "8px" }}>
                                <div>
                                    <b><label>Question 1:</label></b>
                                    <Row>
                                        <Col sm={9} md={9} lg={9}>
                                            <Input
                                                className="w-100"
                                                type="number"
                                                name="duration"
                                                id="duration"
                                                placeholder="Write your question here..."
                                            />
                                        </Col>
                                        <Col sm={3} md={3} lg={3}>
                                            <div className="d-flex align-items-center">
                                                <Checkbox />
                                                <span className="">Required</span>
                                                <span style={{ color: "#66697b" }} className="ml-2">Delete</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <label>Answer Type:</label>
                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Input
                                                className="w-100"
                                                type="number"
                                                name="duration"
                                                id="duration"
                                                placeholder="Short text"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />

                </DialogContent>
                <DialogActions className="d-flex justify-content-center ">
                    <Button variant="outlined" onClick={() => setOpenCreate(false)} style={{ borderRadius: "4px" }}>Cancel</Button>
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
                        <b>Create Booking Type</b>
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}
export default CreateNewBokking;