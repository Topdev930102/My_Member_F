import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  Button,
} from "reactstrap";
import { InputBase } from "@material-ui/core";
import "./style.css";
import Chart from "react-apexcharts";
import { Chip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductionTabs from "./ProductionTabs";
import GeneralTabs from "./GanaralTabs";
import notFound from "../../../../../assets/img/notfound.jpg";
import NoDataImage from "../../../../../assets/img/nodatafound.png";
import { Copy } from "react-feather";

import moment from "moment";
import {
  FETCH_TEST_LIST_COUNT,
  FETCH_APPOINMENT_DETAILS,
  FETCH_EVENT_DETAILS,
  GET_ATTENDED_INVITESE,
  GET_GENERAL_RANK_DETAILS,
  GET_PROMPTION_RANK_DETAILS,
  GET_INVITEES_OF_EVENT,
  GET_INVITEES_OF_EVENT_COUNT,
  GET_REGISTERED_FOR_EVENT,
  FETCH_EVENTS,
  SELECTED_EVENT,
} from "../../../../../redux/actions/test";
import RankDetails from "./RankDetails";

const EventDetails = (props) => {
  const {
    FETCH_TEST_LIST_COUNT,
    selectedEvent,
    testListCount,
    SELECTED_EVENT,
    GET_ATTENDED_INVITESE,
    GET_INVITEES_OF_EVENT,
    GET_GENERAL_RANK_DETAILS,
    GET_PROMPTION_RANK_DETAILS,
    GET_INVITEES_OF_EVENT_COUNT,
    GET_REGISTERED_FOR_EVENT,
    getInvitestudentsCount,
    getInvitestudents,
    getRegisteredforEvent,
    promotionRankDetails,
    generalRankDetails,
    getAttendedforEvent,
  } = props;
  const { eventId } = useParams();
  const history = useHistory();
  const [openRankDetails, setOpenRankDetails] = useState(false);
  const [pwCopy, setPwCopy] = useState("");
  const [isReadMore, setIsReadMore] = useState(true);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const CopyPassWord = (item) => {
    window.navigator.clipboard.writeText(item);
    setPwCopy(item);
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    FETCH_TEST_LIST_COUNT(eventId);
    GET_INVITEES_OF_EVENT(eventId);
    GET_INVITEES_OF_EVENT_COUNT(eventId);
    GET_REGISTERED_FOR_EVENT(eventId);
    GET_GENERAL_RANK_DETAILS(eventId);
    GET_PROMPTION_RANK_DETAILS(eventId);
    GET_ATTENDED_INVITESE(eventId);
    FETCH_EVENTS(moment(new Date()).format("MM-DD-YYYY"));
  }, [eventId]);
  useEffect(() => {
    FETCH_APPOINMENT_DETAILS(eventId).then((resp) => {
      SELECTED_EVENT(resp.data.result);
    });
  }, [eventId]);

  const options = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%",
          },
          track: {
            background: "#fff",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: "Montserrat",
              fontSize: "1rem",
            },
            value: {
              offsetY: 15,
              fontFamily: "Montserrat",
              fontSize: "1.714rem",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        dashArray: 8,
      },
      labels: ["Registered"],
    },
    // series = selectedEvent?.appointment_type === "Promotion Test" ? testListCount?.recommeded || testListCount?.Registered ?
    //     [Math.round(testListCount?.Registered / (testListCount?.recommeded + testListCount?.Registered) * 100)] : [0]
    //     : getInvitestudentsCount?.invitees || getInvitestudentsCount?.registeredInvitee ?
    //         [Math.round(getInvitestudentsCount?.registeredInvitee / (getInvitestudentsCount?.invitees + getInvitestudentsCount?.registeredInvitee) * 100)] : [0]
    series = [85];
  return (
    <div
      style={{
        color: "#5E5873",
        fontFamily: "Montserrat",
      }}
    >
      <div className="d-flex justify-content-start align-items-center mb-1">
        <Chip
          onClick={() => {
            history.fromback = true;
            history.goBack();
          }}
          label="Back"
          icon={<ArrowBackIcon color="secondary" />}
        />
        <h2 className="ml-1 content-header-title float-left mb-0">
          {"Event Details"}
        </h2>
      </div>
      <Row className="match-height">
        <Col md={4}>
          <Card>
            <CardImg
              alt="Card image cap"
              src={
                selectedEvent?.eventBanner
                  ? selectedEvent?.eventBanner
                  : notFound
              }
              top
              width="100%"
              height="170px"
              className="eventImage"
            />
            <CardBody>
              <Row style={{ marginBottom: "2rem" }}>
                <div
                  className="text-center "
                  style={{
                    borderRight: "1px solid #d8d6de",
                    paddingRight: "1.3rem",
                    marginRight: "1.3rem",
                  }}
                >
                  <h6>{moment(selectedEvent?.start_time).format("ddd")}</h6>
                  <h3>{moment(selectedEvent?.start_time).format("DD")}</h3>
                </div>
                <div>
                  <h4 className="mb-25 card-title">{selectedEvent?.title}</h4>
                  <p className="mb-0 card-text">
                    {isReadMore
                      ? selectedEvent?.notes?.slice(0, 120)
                      : selectedEvent?.notes}
                    {selectedEvent?.notes?.length > 120 && (
                      <span
                        onClick={handleReadMore}
                        style={{ color: "#2FA4FC" }}
                      >
                        {isReadMore ? " Read more..." : " Read less..."}
                      </span>
                    )}

                    {/* // {selectedEvent?.notes} */}
                  </p>
                </div>
              </Row>
              <div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "8px" }}
                >
                  <div className="iconsColor-event-card">
                    <i
                      className="fa fa-calendar-o"
                      style={{
                        width: "32px",
                        height: "37px",
                        fontSize: "18px",
                        lineHeight: "37px",
                      }}
                    ></i>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      {moment(selectedEvent?.start_time).format(
                        "ddd, MMM DD, YYYY"
                      )}
                      <br />
                    </h6>
                    <p
                      className="mb-0"
                      style={{ fontSize: "0.857rem", fontFamily: "Montserrat" }}
                    >
                      {moment(selectedEvent?.start_time).format("HH:mm A")} To{" "}
                      {moment(selectedEvent?.end_time).format("HH:mm A")}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center" style={{marginBottom: '20px'}}>
                  <div className="iconsColor-event-card">
                    <i
                      className="fa fa-map-marker"
                      style={{
                        width: "32px",
                        height: "37px",
                        fontSize: "18px",
                        lineHeight: "37px",
                      }}
                    ></i>
                  </div>
                  <div>
                    <h6 className="mb-0">
                      {selectedEvent?.eventLocation}
                      <br />
                    </h6>
                    <p
                      className="mb-0"
                      style={{ fontSize: "0.857rem", fontFamily: "Montserrat" }}
                    >
                      {selectedEvent?.eventCity}, {selectedEvent?.eventState}
                    </p>
                  </div>
                </div>
              </div>
              
              <MockUsers />
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <div className="d-flex m-1 justify-content-between">
              <h3>Guest Tracker</h3>
              <Button
                onClick={() => setOpenRankDetails(true)}
                style={{
                  color: "#6b6b6b",
                  height: 40,
                  borderRadius: "6px",
                  width: "100px",
                  border: "1px solid #b8c2cc",
                }}
              >
                Ranks
              </Button>
              {openRankDetails ? (
                <RankDetails
                  setOpenRankDetails={setOpenRankDetails}
                  promotionRankDetails={promotionRankDetails}
                  generalRankDetails={generalRankDetails}
                  openRankDetails={openRankDetails}
                  eventType={selectedEvent?.appointment_type}
                />
              ) : (
                ""
              )}
              <Link to={`/app/school/test/add-guest/${eventId}`}>
                <Button color="primary">Add Guests</Button>
              </Link>
            </div>
            <div className="d-flex ml-2">
              <div>
                <p
                  className="font-weight-bold mb-0 pl-1"
                  style={{ fontSize: "28px", color: "#000" }}
                >
                  {selectedEvent?.appointment_type === "Promotion Test"
                    ? testListCount?.recommeded ||
                      testListCount?.Registered ||
                      testListCount?.Promoted
                      ? testListCount?.recommeded +
                        testListCount?.Registered +
                        testListCount?.Promoted
                      : 0
                    : getInvitestudentsCount?.invitees ||
                      getInvitestudentsCount?.registeredInvitee ||
                      getInvitestudentsCount?.attendee
                    ? getInvitestudentsCount?.invitees +
                      getInvitestudentsCount?.registeredInvitee +
                      getInvitestudentsCount?.attendee
                    : 0}
                </p>
                <span
                  className="font-weight-normal mt-0"
                  style={{ fontSize: "14px", color: "#626262" }}
                >
                  {" "}
                  Total
                </span>
              </div>
              <Chart
                options={options}
                series={series}
                type="radialBar"
                height={290}
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="d-flex mx-2 pt-2 m-2 my-1 justify-content-between">
              <div className="text-center">
                <span
                  className="mt-1 "
                  style={{ fontSize: "14px", color: "#626262" }}
                >
                  {selectedEvent?.appointment_type === "Promotion Test"
                    ? "Recommended"
                    : "Invited"}
                </span>
                <br />
                <span
                  className="font-weight-bold"
                  style={{ fontSize: "28px", color: "#000" }}
                >
                  {selectedEvent?.appointment_type === "Promotion Test"
                    ? testListCount?.recommeded
                      ? testListCount?.recommeded
                      : 0
                    : getInvitestudentsCount?.invitees
                    ? getInvitestudentsCount?.invitees
                    : 0}
                </span>
              </div>
              <div className="text-center">
                <span
                  className="mt-1 "
                  style={{ fontSize: "14px", color: "#626262" }}
                >
                  Registered
                </span>
                <br />
                <span
                  className="font-weight-bold"
                  style={{ fontSize: "28px", color: "#000" }}
                >
                  {selectedEvent?.appointment_type === "Promotion Test"
                    ? testListCount?.Registered
                      ? testListCount?.Registered
                      : 0
                    : getInvitestudentsCount?.registeredInvitee
                    ? getInvitestudentsCount?.registeredInvitee
                    : 0}
                </span>
              </div>
              <div className="text-center">
                <span
                  className="mt-1 "
                  style={{ fontSize: "14px", color: "#626262" }}
                >
                  {selectedEvent?.appointment_type === "Promotion Test"
                    ? "Promoted"
                    : "Attended"}
                </span>
                <br />
                <span
                  className="font-weight-bold"
                  style={{ fontSize: "28px", color: "#000" }}
                >
                  {selectedEvent?.appointment_type === "Promotion Test"
                    ? testListCount?.Promoted
                      ? testListCount?.Promoted
                      : 0
                    : getInvitestudentsCount?.attendee
                    ? getInvitestudentsCount?.attendee
                    : 0}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ padding: "21px" }}>
            <div className="">
              <h6>Invitation Details</h6>
            </div>
            <img
              className="mt-1 mb-1 d-flex justify-content-center align-items-center"
              src={
                selectedEvent?.eventBanner
                ? selectedEvent?.eventBanner
                : notFound
              }
              style={{
                width: "92%",
                height: "130px",
                backgroundSize: "cover",
                boxShadow: "1px 2px 9px #babfc7",

                // backgroundRepeat: "no-repeat"
              }}
              alt="Event banner Image"
            />
            <div>
              <h4>{selectedEvent?.title}</h4>
              <a href={`${baseUrl}/public/events/${selectedEvent?._id}`}>
                Preview Invitation
              </a>
            </div>
            <div style={{ paddingTop: "21px"}}>
              <div>
                <h5 className="">Send Invitation</h5>
                {/* <div className="d-flex ml-1 mb-1 shareBtns ">
                <div className="one">
                  <i className="fa fa-paperclip" aria-hidden="true"></i>
                </div>
                <div className="two">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                </div>
                <div className="three">
                  <i className="fa fa-send-o" aria-hidden="true"></i>
                </div>
              </div> */}
                <div role="group" class="mb-1 btn-group">
                  <button class="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </button>
                  <button class="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </button>
                  <button class="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h5>Share Your Event</h5>
                {/* <div className="d-flex ml-1 mb-1 social">
                                <div className="one">
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </div>
                                <div className="two">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </div>
                                <div className="three">
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                </div>
                            </div> */}
                <div role="group" class="mb-1 btn-group">
                  <button class="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </button>
                  <button class="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </button>
                  <button class="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* <div >
              <h5 className="">Copy Link to Share</h5>
              <div className="mb-1 relative" style={{position: 'relative'}}>
                <InputBase
                  className="pr-3 urlInput"
                  style={{
                    width: "90%",
                    border: "2px solid #0184ff",
                    borderRadius: "4px",
                    paddingLeft: "5px",
                    paddingRight: '40px',
                    fontSize: "12px",
                  }}
                  type="text"
                  value={`${baseUrl}/public/events/${selectedEvent?._id}`}
                />
                <Button
                  className="copyBtn p-0"
                  size="small"
                  style={{top: '3px'}}
                  onClick={() => {
                    CopyPassWord(
                      `${baseUrl}/public/events/${selectedEvent?._id}`
                    );
                  }}
                >
                  {pwCopy ===
                  `${baseUrl}/public/events/${selectedEvent?._id}` ? (
                    <span style={{ fontSize: "0.8em" }}></span>
                  ) : (
                    <Copy
                      style={{
                        color: "#2FA4FC",
                        position: "absolute",
                        top: '0px',
                        right: '0px'
                      }}
                    />
                  )}
                </Button>
              </div>
            </div> */}
          </Card>
        </Col>
      </Row>
      {selectedEvent?.appointment_type !== "Promotion Test" ? (
        <GeneralTabs
          getInvitestudents={getInvitestudents}
          selectedrow={selectedEvent}
          getRegisteredforEvent={getRegisteredforEvent}
          getAttendedforEvent={getAttendedforEvent}
        />
      ) : (
        <ProductionTabs selectedrow={selectedEvent} eventId={eventId} />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
    selectedEvent: state.appointmentAndEvent.selectedEvent,
    getInvitestudentsCount: state.test.getInvitestudentsCount,
    getInvitestudents: state.test.getInvitestudents,
    getRegisteredforEvent: state.test.getRegisteredforEvent,
    getAttendedforEvent: state.test.getAttendedforEvent,
    testListCount: state.test.testListCount,
    promotionRankDetails: state.test.promotionRankDetails,
    generalRankDetails: state.test.generalRankDetails,
  };
};
export default connect(mapStateToProps, {
  FETCH_TEST_LIST_COUNT,
  GET_GENERAL_RANK_DETAILS,
  GET_PROMPTION_RANK_DETAILS,
  GET_INVITEES_OF_EVENT,
  GET_INVITEES_OF_EVENT_COUNT,
  FETCH_EVENT_DETAILS,
  FETCH_APPOINMENT_DETAILS,
  GET_REGISTERED_FOR_EVENT,
  GET_ATTENDED_INVITESE,
  SELECTED_EVENT,
  FETCH_EVENTS,
})(EventDetails);

const MockUsers = () => {
  return (
    // <div></div>
    <div class="avatar-group" style={{
        display: 'flex',
        justifyContent: 'flex-start',
    }}>
      <div class="avatar pull-up" id="Billy-Hopkins" placement="bottom">
        <img
          class=""
          src="/images/testimonial-1.jpg"
          alt="avatarImg"
          height="33"
          width="33"
        />
      </div>
      <div class="avatar pull-up" id="Amy-Carson" placement="bottom">
        <img
          class=""
          src="/images/testimonial-2.jpg"
          alt="avatarImg"
          height="33"
          width="33"
        />
      </div>
      <div class="avatar pull-up" id="Brandon-Miles" placement="bottom">
        <img
          class=""
          src="/images/testimonial-3.jpg"
          alt="avatarImg"
          height="33"
          width="33"
        />
      </div>
      <div class="avatar pull-up" id="Daisy-Weber" placement="bottom">
        <img
          class=""
          src="/images/testimonial-2.jpg"
          alt="avatarImg"
          height="33"
          width="33"
        />
      </div>
      <div class="avatar pull-up" id="Jenny-Looper" placement="bottom">
        <img
          class=""
          src="/images/testimonial-1.jpg"
          alt="avatarImg"
          height="33"
          width="33"
        />
      </div>
      <div class="d-flex align-items-center ps-1">+42</div>
    </div>
  );
};
