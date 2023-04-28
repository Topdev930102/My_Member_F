import { Button, Card, Chip, Divider, Skeleton, Switch, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { Col, Row } from "reactstrap";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';



const BookingsTypeSetting = () => {
    return (
        <Fragment>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <h3>Booking Types</h3>
                    <Button
                        className="ml-1"
                        style={{
                            color: "#6b6b6b",
                            // height: 40,
                            borderRadius: "4px",
                            border: "1px solid #b8c2cc",
                        }}
                    >
                        + Create New Booking Type
                    </Button>
                </div>
                <div>
                    <Button
                        className="d-flex align-items-center"
                        endIcon={<OpenInNewIcon />}>
                        View Your Bookings Page
                    </Button>
                </div>
            </div>
            <div className="mt-4">
                <Row>
                    <Col sm={4} md={4} lg={4}>
                        <Card className="p-1 m-1">
                            <h4>15 Minute Meeting</h4>
                            <div className="d-flex justify-content-between mb-0">
                                <Button>/15-minute-meeting</Button>
                                <Button>Copy link</Button>
                            </div>
                            <Divider className="mt-0" />
                            <div className="d-flex justify-content-start align-items-center">
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={true}
                                    size="small"
                                    // onChange={handleChange}
                                    name="isproof"
                                // inputProps={{ "aria-label": "primary checkbox" }}
                                />
                                <h5 style={{ marginLeft: "6px" }} className="mb-0">Booking is ON</h5>
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-1">
                                <AccessTimeIcon />
                                <h5 style={{ marginLeft: "6px" }} className="mb-0">15 minute</h5>
                            </div>
                            <Divider />
                            <div
                                style={{
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                    height: "8vh",
                                }}>
                                <Typography>
                                    Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute!
                                </Typography>
                            </div>
                            <Divider />
                            <div className="d-flex ">
                                <h4>Share:</h4>
                                <div className="d-flex justify-content-between w-100 mx-1">
                                    <ChatBubbleIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <EmailIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <LinkedInIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <FacebookIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <TwitterIcon fontSize="large" style={{ color: "#babfc7" }} />
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <h4>Embed on your website</h4>
                            </div>
                            <Divider />
                            <div className="d-flex justify-content-between align-items-center">
                                <Button variant="outlined" color="error" style={{ borderRadius: "4px" }}>
                                    Delete
                                </Button>
                                <Button variant="outlined" style={{ borderRadius: "4px" }}>Clone</Button>
                                <Button variant="outlined" style={{ borderRadius: "4px" }}>Edit</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                        <Card className="p-1 m-1">
                            <h4>15 Minute Meeting</h4>
                            <div className="d-flex justify-content-between mb-0">
                                <Button>/15-minute-meeting</Button>
                                <Button>Copy link</Button>
                            </div>
                            <Divider className="mt-0" />
                            <div className="d-flex justify-content-start align-items-center">
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={true}
                                    size="small"
                                    // onChange={handleChange}
                                    name="isproof"
                                // inputProps={{ "aria-label": "primary checkbox" }}
                                />
                                <h5 style={{ marginLeft: "6px" }} className="mb-0">Booking is ON</h5>
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-1">
                                <AccessTimeIcon />
                                <h5 style={{ marginLeft: "6px" }} className="mb-0">15 minute</h5>
                            </div>
                            <Divider />
                            <div
                                style={{
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                    height: "8vh",
                                }}>
                                <Typography>
                                    Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute!
                                </Typography>
                            </div>
                            <Divider />
                            <div className="d-flex ">
                                <h4>Share:</h4>
                                <div className="d-flex justify-content-between w-100 mx-1">
                                    <ChatBubbleIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <EmailIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <LinkedInIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <FacebookIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <TwitterIcon fontSize="large" style={{ color: "#babfc7" }} />
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <h4>Embed on your website</h4>
                            </div>
                            <Divider />
                            <div className="d-flex justify-content-between align-items-center">
                                <Button variant="outlined" color="error" style={{ borderRadius: "4px" }}>
                                    Delete
                                </Button>
                                <Button variant="outlined" style={{ borderRadius: "4px" }}>Clone</Button>
                                <Button variant="outlined" style={{ borderRadius: "4px" }}>Edit</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                        <Card className="p-1 m-1">
                            <h4>15 Minute Meeting</h4>
                            <div className="d-flex justify-content-between mb-0">
                                <Button>/15-minute-meeting</Button>
                                <Button>Copy link</Button>
                            </div>
                            <Divider className="mt-0" />
                            <div className="d-flex justify-content-start align-items-center">
                                <Switch
                                    style={{ color: "#0184FF" }}
                                    checked={true}
                                    size="small"
                                    // onChange={handleChange}
                                    name="isproof"
                                // inputProps={{ "aria-label": "primary checkbox" }}
                                />
                                <h5 style={{ marginLeft: "6px" }} className="mb-0">Booking is ON</h5>
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-1">
                                <AccessTimeIcon />
                                <h5 style={{ marginLeft: "6px" }} className="mb-0">15 minute</h5>
                            </div>
                            <Divider />
                            <div
                                style={{
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                    height: "8vh",
                                }}>
                                <Typography>
                                    Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute! Book a meeting with me for 15 minute!
                                </Typography>
                            </div>
                            <Divider />
                            <div className="d-flex ">
                                <h4>Share:</h4>
                                <div className="d-flex justify-content-between w-100 mx-1">
                                    <ChatBubbleIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <EmailIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <LinkedInIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <FacebookIcon fontSize="large" style={{ color: "#babfc7" }} />
                                    <TwitterIcon fontSize="large" style={{ color: "#babfc7" }} />
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <h4>Embed on your website</h4>
                            </div>
                            <Divider />
                            <div className="d-flex justify-content-between align-items-center">
                                <Button variant="outlined" color="error" style={{ borderRadius: "4px" }}>
                                    Delete
                                </Button>
                                <Button variant="outlined" style={{ borderRadius: "4px" }}>Clone</Button>
                                <Button variant="outlined" style={{ borderRadius: "4px" }}>Edit</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
export default BookingsTypeSetting;