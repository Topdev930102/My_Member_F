import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CashOptionOrCheck from "./cashOptionOrCheck";
import { CardContent, Card, Button, TextField } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Edit } from 'react-feather';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Col, Row } from "reactstrap";
import ProgressBar from "../../../../../components/material/ProgressBar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';



const useStyles = makeStyles(() => ({
  wrapper: {},
  backButton: {
    borderRadius: "6px !important",
  },
  primarybtn1: {
    borderRadius: "6px !important",

  },
  CheckImageMemberShip: {
    width: "80%",
    objectFit: "contain",
  },
  activeTab: {
    color: "#2796f3 !important",
  },
  inactiveTab: {
    color: "#2796f3",
  },
  cardStyle: {
    width: "100%",
    boxShadow: "2px 0 14px #f8f8f8",
  },
}));

const CheckOutSummary = (props) => {
  const classes = useStyles();
  const [defaultAlert, setdefaultAlert] = useState(false)
  const { HandleChange, handleBack, handleNext, payNowMethod, loading, StripePayment, memberShipDetail } = props;
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
    if (newTab === 0) {
      payNowMethod("stripe");
    } else if (newTab === 1) {
      payNowMethod("cash");
    }
  };

  return (
    <Fragment>
      {memberShipDetail?.docType === "Digital" ? (
        <Fragment>
          <Card className="my-1">
            <Row className="d-flex ">
              <Col sm="5" md="5" lg="5" className="d-flex align-items-center">
                <AccessTimeIcon fontSize="medium" className="mx-1" style={{ color: "#878787" }} />
                <div >
                  <p className="mb-0">Recipient Info</p>
                  <small style={{ color: "#878787" }} className="mt-0">Clinton Oh</small>
                </div>
              </Col>
              <Col sm="3" md="3" lg="3" className="d-flex align-items-center">
                {/* <div className="w-100">
                <div className="d-flex">
                  <div className="d-flex align-items-center" style={{ width: "70%", paddingRight: "5px" }}>
                    <ProgressBar
                      className="mt-1"
                      color={"#427d49"}
                      value={parseFloat(40)}
                    />
                  </div>
                  <small>2/5 done</small>
                </div> */}
                <p className="">ceo@clintonoh.com</p>
                {/* </div> */}
              </Col>
              <Col sm="2" md="2" lg="2" className="d-flex align-items-center">
                {/* <div>
                <p className="mb-0">12/13/2022</p>
                <p className="mt-0">03:35:35 PM</p>
              </div> */}
              </Col>
              <Col sm="1.5" md="1.5" lg="1.5" className="d-flex align-items-center">
                <Button
                  className="mr-1"
                  style={{
                    color: "#fff ",
                    background: "#2396f3",
                    borderRadius: "6px"
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Card>
          <div className="my-1">
            <div className='w-100'>
              <Row>
                <Col sm="1.5" md="1.5" lg="1.5">
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                </Col>
                <Col sm="9" md="9" lg="9">
                  <div className='d-flex '>
                    <TextField
                      fullWidth
                      style={{
                        border: "1px solid #b8c2cc",
                        width: "80%",
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                      }}
                      variant={"outlined"}
                      size="small"
                      type="text"
                      name="customId"
                      // value={publicLink}
                      contentEditable={false}
                    />
                    <Button className='primary'
                      style={{
                        borderRadius: '0px 10px 10px 0px'
                      }}
                      variant='contained'
                    // onClick={() => copyClipBoard()}
                    >
                      <FileCopyIcon /> Copy Url
                    </Button>
                  </div>
                </Col>
                <Col sm="1" md="1" lg="1">
                  <Button
                    style={{
                      color: "#fff ",
                      background: "#2396f3",
                    }}

                    className={classes.primarybtn1}
                    onClick={handleNext}
                  >
                    Send
                  </Button>
                </Col>


              </Row>
              {/* <Button variant='outlined'
              style={{
                borderRadius: '8px',
                width: '20%'
              }}
            >
              <RemoveRedEyeIcon /> View
            </Button> */}
            </div>
            <div>
              <Card
                style={{ height: "100%", borderRadius: 10, marginTop: "1em" }}
                className={`shadow`}
              >
                <CardContent>
                  <iframe
                    scrolling="no"
                    className="shadow-sm"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      border: "none",
                      height: "400px",
                      borderRadius: 10,
                    }}
                    src={"https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"}
                  />
                </CardContent>
              </Card>
              {/* <div className='d-flex justify-content-end mt-2' >
              <Button variant='contained' className='primary'
              // onClick={() => editTemplate()}
              >
                <Edit /> Edit Page
              </Button>
              <Button variant='outlined' className='ml-1'
              // onClick={() => { setdefaultAlert(!defaultAlert) }}
              >
                Remove
              </Button>
              <Button variant='outlined' className='ml-1' color="info">
                Clone
              </Button>
            </div> */}
            </div>
          </div>
        </Fragment>
      ) : (
        < div className={classes.wrapper}>
          <Paper square style={{ width: "100%" }}>
            <Tabs
              value={tab}
              centered
              TabIndicatorProps={{
                style: { background: "#2796f3", height: "2px" },
              }}
              onChange={handleChange}
            >
              <Tab
                className={tab === 0 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b>Pay with Stripe</b>
                    </span>
                  </div>
                }
              />
              <Tab
                className={tab === 1 ? classes.activeTab : ""}
                label={
                  <div>
                    <span>
                      <b>Cash or Check</b>
                    </span>
                  </div>
                }
              />
            </Tabs>
          </Paper>
          <div className="my-1">
            <Card className={classes.cardStyle}>
              <CardContent>
                {tab === 0 && StripePayment}
                {tab === 1 && (
                  <CashOptionOrCheck
                    loading={loading}
                    HandleChange={HandleChange}
                    membershipInfo={props.item}
                    payNowMethod={payNowMethod}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Fragment >
  );
};

export default CheckOutSummary;
