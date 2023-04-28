import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { FETCH_PUBLIC_EVENTS } from "../../../../../redux/actions/test";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import notFound from "../../../../../assets/img/notfound.jpg";
import "./style.css";

const EventPreview = (props) => {
  const { FETCH_PUBLIC_EVENTS, fetchSingleEvents } = props;
  const { eventId } = useParams();
  const history = useHistory();
  const selectedEvent = props?.fetchSingleEvents;
  console.log(selectedEvent);
  const [isReadMore, setIsReadMore] = useState(true);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  useEffect(() => {
    FETCH_PUBLIC_EVENTS(eventId);
  }, [FETCH_PUBLIC_EVENTS]);

  return (
    <div
      className="m-4"
      style={{
        color: "#5E5873",
        fontFamily: "Montserrat",
      }}
    >
      <div className="text-center  eventPreviewTexts">
        <h1 className="text-capitalize">{selectedEvent?.title}</h1>
      </div>
      <div className="mt-1">
        <Row>
          <Col sm={4} md={4} lg={4}>
            <Card>
              <button className="btn btn-primary m-2">Register</button>
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
                    <div className="iconsColor">
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
                        style={{
                          fontSize: "0.857rem",
                          fontFamily: "Montserrat",
                        }}
                      >
                        {moment(selectedEvent?.start_time).format("HH:mm A")} To{" "}
                        {moment(selectedEvent?.end_time).format("HH:mm A")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ marginBottom: "20px" }}
                  >
                    <div className="iconsColor">
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
                        style={{
                          fontSize: "0.857rem",
                          fontFamily: "Montserrat",
                        }}
                      >
                        {selectedEvent?.eventCity}, {selectedEvent?.eventState}
                      </p>
                    </div>
                  </div>
                </div>

                <MockUsers />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                  <h3 className="card-title mb-2">Host Information</h3>
                  <div>
                    <div class="d-flex align-items-center">
                      <div class="avatar rounded me-1 bg-light-primary" style={{background: '#d9edfe', color: '#0783fb'}}>
                        <span class="avatar-content">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </span>
                      </div>
                      <h6 class="mb-0">{selectedEvent?.hostName}</h6>
                    </div>
                    <div class="d-flex align-items-center mt-2" >
                      <div class="avatar rounded me-1 bg-light-primary" style={{background: '#d9edfe', color: '#0783fb'}}>
                        <span class="avatar-content">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </span>
                      </div>
                      <h6 class="mb-0">{selectedEvent?.hostMobileNumber}</h6>
                    </div>
                    <div class="d-flex align-items-center mt-2" >
                      <div class="avatar rounded me-1 bg-light-primary" style={{background: '#d9edfe', color: '#0783fb'}}>
                        <span class="avatar-content">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
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
                        </span>
                      </div>
                      <h6 class="mb-0">{selectedEvent?.hostEmail}</h6>
                    </div>
                  </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm={8} md={8} lg={8} >
            <Card style={{padding: '21px'}}>
              <CardImg
                alt="Card image caps"
                src={selectedEvent?.eventBanner}
                top
                width="100%"
                height="10%"
                className="eventDetailsImage a"
              />
              <Col>
                {/* <h3>Biggest Developer Meetup In The History Of NYC</h3> */}
                
                <div className="mt-2">
                  <h2>Event Description</h2>
                </div>
                <div className="mt-1 mr-1">
                  <p>{selectedEvent?.notes}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                    <button className="btn btn-primary">Register</button>
                </div>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="text-center mt-3 font-weight-bold mapTitle">
        <h1>Find Us Here</h1>
        <div className="dv">
          <hr />
        </div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6753.649862266358!2d76.31998407578007!3d32.18199532462287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b51c788a0bc61%3A0x75e5dd1b8005faa5!2sAlphanzo%20Technology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1655899987388!5m2!1sen!2sin"
          width="100%"
          height="500"
          frameborder="0"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        />
      </div>

      <div className="footerText mt-5 mb-5 text-center">
        <i className="fa fa-map-marker"></i>
        <h4>
          7935 Foster St. <br />
          Lockport, NY 14094
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchSingleEvents: state.appointmentAndEvent.fetchSingleEvents,
  };
};

const MockUsers = () => {
  return (
    // <div></div>
    <div
      class="avatar-group"
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
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

export default connect(mapStateToProps, { FETCH_PUBLIC_EVENTS })(EventPreview);
