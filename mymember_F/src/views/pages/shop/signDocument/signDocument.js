import { Typography, Dialog, DialogContent, Button, makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { GET_MEMBERSHIP_FOLDER_LIST } from "../../../../redux/actions/shop";
import { connect } from "react-redux";
import Home from "./Home";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SchemaIcon from '@mui/icons-material/Schema';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DoneIcon from '@mui/icons-material/Done';
import MailSentSuccess from "./mailSentSuccess";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateFormstepper from "../../../formbuilder/pages/CreateFormstepper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Automation from "../../../../assets/img/Automation.png";
import Money from "../../../../assets/img/money.png";
import { Plus, X } from "react-feather";
import {
  AppBar,
  Toolbar,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import Steps from "../../../formbuilder/pages/funnelsteps/Steps";
import { Col, Row } from "reactstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProgressBar from "../../../../components/material/ProgressBar";
import { DropzoneArea } from "material-ui-dropzone";
import DocuSignNew from "./DocuSignNew";


const useStyles = makeStyles((theme) => ({
  styleDropZone: {
    margin: "6px 0px 4px 0px",
    padding: "10px",
    border: "4px dashed #2796f3",
    background: "#F7FDFF",
  },
}));

const DocumentSign = (props) => {
  const classes = useStyles()
  const { getmebershipfolderlisting, memberShipDetail } = props;
  const [open, setOpen] = useState(false);
  const [signedDocument, setSignedDocument] = useState();
  const docTypes = [
    { id: 1, type: "None" },
    { id: 2, type: "Document" },
    { id: 2, type: "Digital" },
  ];
  const [docType, setDocType] = useState(docTypes?.map((res) => res?.type));

  const [islinksent2Email, setIslinksent2Email] = useState(false);
  console.log(getmebershipfolderlisting);

  const handleChange = (event) => {
    setDocType(event.target.value);
  };
  const handleUploadSignedDocument = (files) => {
    setSignedDocument(files)
  }

  useEffect(() => {
    GET_MEMBERSHIP_FOLDER_LIST();
  }, [GET_MEMBERSHIP_FOLDER_LIST]);

  return (
    <div>
      {/* <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={docType}
          label="docType"
          onChange={handleChange}
        >
          <MenuItem value={"Digital"}>Digital</MenuItem>
          <MenuItem value={"Document"}>Document</MenuItem>
          <MenuItem value={"None"}>None</MenuItem>
        </Select>
      </FormControl> */}
      <div >
        {memberShipDetail?.docType === "Digital" ? (
          <div className="w-100 my-1">
            <Card >
              <Row className="d-flex ">
                <Col sm="5" md="5" lg="5" className="d-flex align-items-center">
                  <AccessTimeIcon fontSize="medium" className="mx-1" style={{ color: "#878787" }} />
                  <div >
                    <p className="mb-0">Document Name</p>
                    <small style={{ color: "#878787" }} className="mt-0">To: Clinton, Ajay, Monu</small>
                  </div>
                </Col>
                <Col sm="3" md="3" lg="3" className="d-flex align-items-center">
                  <div className="w-100">
                    <div className="d-flex">
                      <div className="d-flex align-items-center" style={{ width: "70%", paddingRight: "5px" }}>
                        <ProgressBar
                          className="mt-1"
                          color={"#427d49"}
                          value={parseFloat(40)}
                        />
                      </div>
                      <small>2/5 done</small>
                    </div>
                    <p className="mt-0">waiting for others</p>
                  </div>
                </Col>
                <Col sm="2" md="2" lg="2" className="d-flex align-items-center">
                  <div>
                    <p className="mb-0">12/13/2022</p>
                    <p className="mt-0">03:35:35 PM</p>
                  </div>
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
                    Resend
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card className="mt-1 p-1">
              <h3>Document Name</h3>
              <div>
                <p className="my-0" style={{ fontSize: "12px" }}>From : Clinton Oh</p>
                <p className="my-0" style={{ fontSize: "12px" }}>Last Change On 12/13/2022 | 03:35:35 PM </p>
                <p className="my-0" style={{ fontSize: "12px" }}>Sent on 11/18/2022 | 01:58:46 PM</p>
              </div>
              <div className=" mt-1 d-flex">
                <AccessTimeIcon fontSize="small" />

                <p className="mb-0" style={{ marginLeft: "5px" }}> <b>Waiting for others</b></p>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <Button className="" style={{ borderRadius: "6px", backgroundColor: "#2d96d6", color: "#fff" }} >
                    Sign
                  </Button>
                  <Button className="ml-1" style={{ borderRadius: "6px" }} variant="outlined">
                    Correct
                  </Button>
                  <Button className="ml-1" style={{ borderRadius: "6px" }} variant="outlined">
                    Move
                  </Button>
                  <Button className="ml-1" style={{ borderRadius: "6px" }} variant="outlined">
                    Resend
                  </Button>
                  <Button className="ml-1" style={{ borderRadius: "6px" }} variant="outlined">
                    More
                  </Button>
                </div>
                <div>
                  <Button className="" style={{ borderRadius: "6px" }} variant="outlined" >
                    <DownloadIcon />
                  </Button>
                  <Button className="ml-1" style={{ borderRadius: "6px" }} variant="outlined" >
                    <PrintIcon />
                  </Button>
                </div>
              </div>
              <Divider />
              <div className="mt-2">
                <div className="d-flex justify-content-between mb-0 mx-1">
                  <div>
                    <p className="mb-0"><b>Recipients</b></p>
                  </div>
                  <div className="d-flex mb-0">
                    <SchemaIcon fontSize="small" className="mb-0" />
                    <p className="mb-0" style={{ marginLeft: "5px", fontSize: "12px" }}><b>SIGNING ORDER</b></p>
                  </div>
                </div>
                <Divider className="mt-0" style={{ color: "#878787" }}>COMPLETED</Divider>
                <div className="d-flex justify-content-between align-items-center  mb-0 ">
                  <div className="d-flex">
                    <DoneIcon style={{ color: "#54d820" }} />
                    <div className="ml-1">
                      <p className="mb-0"><b>Clinton Oh</b></p>
                      <p style={{ fontSize: "12px" }} className="mt-0">ceo@clintonoh.com</p>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                      <BorderColorIcon className="mb-0" fontSize="small" />
                      <p className="mb-0"><b style={{ marginLeft: "5px" }}>Signed</b></p>
                    </div>
                    <p style={{ fontSize: "12px" }} className="my-0">11/18/2022 | 01:59:19 PM</p>
                    <p style={{ fontSize: "12px" }} className="mt-0">Signed in location</p>
                  </div>
                </div>
                <Divider className="mt-0" />
                <div className="d-flex justify-content-between align-items-center mb-0 ">
                  <div className="d-flex">
                    <DoneIcon style={{ color: "#54d820" }} />
                    <div className="ml-1">
                      <p className="mb-0"><b>Monu Kushwaha</b></p>
                      <p style={{ fontSize: "12px" }} className="mt-0">monu@gmail.com</p>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                      <BorderColorIcon className="mb-0" fontSize="small" />
                      <p className="mb-0"><b style={{ marginLeft: "5px" }}>Signed</b></p>
                    </div>
                    <p style={{ fontSize: "12px" }} className="my-0">11/18/2022 | 01:59:19 PM</p>
                    <p style={{ fontSize: "12px" }} className="my-0">Signed in location</p>
                  </div>
                </div>
                <Divider className="mt-0" style={{ color: "#878787" }}>WAITING</Divider>
                <div className="d-flex justify-content-between align-items-center mb-0 ">
                  <div className="ml-3">
                    <p className="mb-0"><b>Ajay</b></p>
                    <p style={{ fontSize: "12px" }} className="mt-0">ajay@gmain.com</p>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                      <BorderColorIcon className="mb-0" fontSize="small" />
                      <p className="mb-0"><b style={{ marginLeft: "5px" }}>Need to Sign</b></p>
                    </div>
                    <p style={{ fontSize: "12px" }} className="my-0">11/18/2022 | 01:59:19 PM</p>
                    {/* <p style={{ fontSize: "12px" }} className="my-0">Signed in location</p> */}
                  </div>
                </div>
                <Divider className="mt-0" />
                <div className="d-flex justify-content-between align-items-center mb-0 ">
                  <div className="ml-3">
                    <p className="mb-0"><b>Diwakar</b></p>
                    <p style={{ fontSize: "12px" }} className="mt-0">diwakar@gmain.com</p>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                      <BorderColorIcon className="mb-0" fontSize="small" />
                      <p className="mb-0"><b style={{ marginLeft: "5px" }}>Need to Sign</b></p>
                    </div>
                    <p style={{ fontSize: "12px" }} className="my-0">11/18/2022 | 01:59:19 PM</p>
                    {/* <p style={{ fontSize: "12px" }} className="my-0">Signed in location</p> */}
                  </div>
                </div>
                <Divider className="mt-0" />
                <div className="d-flex justify-content-between align-items-center mb-0 ">
                  <div className="ml-3">
                    <p className="mb-0"><b>Ranjan</b></p>
                    <p style={{ fontSize: "12px" }} className="mt-0">ranjan@gmain.com</p>
                  </div>
                  <div>
                    <div className="d-flex mb-0">
                      <BorderColorIcon className="mb-0" fontSize="small" />
                      <p className="mb-0"><b style={{ marginLeft: "5px" }}>Need to Sign</b></p>
                    </div>
                    <p style={{ fontSize: "12px" }} className="my-0">11/18/2022 | 01:59:19 PM</p>
                    {/* <p style={{ fontSize: "12px" }} className="my-0">Signed in location</p> */}
                  </div>
                </div>

              </div>
            </Card>
          </div>
        ) : memberShipDetail?.docType === "None" ? (
          <div>
            {/* <p>My Name is Ajay</p> */}
            <div className="my-2">
              <DropzoneArea
                dropzoneText="Click or drag and drop to Attach your Signed Document"
                dropzoneClass={classes.styleDropZone}
                onChange={handleUploadSignedDocument}
                showAlerts={true}
                // showPreviews={true}
                filesLimit={1}
                // showPreviewsInDropzone
                showPreviewsInDropzone={true}
              />
            </div>
          </div>

        ) : (

          <Fragment>
            {memberShipDetail?.docType === "Attach File" ? (
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
            )
              : ""
            }
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img
                src="/images/signature-Image-removebg-preview.png"
                alt="signature "
                style={{ width: "70%",maxHeight:"40vh", objectFit: "contain" }}
              />
              <Button
                fullWidth
                variant="contained"
                className="rounded text-white"
                style={{ width: "60%", background: "#2191fd" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Create Document
              </Button>
              <Typography color="textSecondary">
                Continue to document signature..{" "}
              </Typography>
            </div>
          </Fragment>
        )}
        {/* </div> */}
        <Dialog className="p-0" fullScreen maxWidth open={open}>
          <DialogTitle className="d-flex justify-content-end">
            <div className="close-icon">
              <X
                className="cursor-pointer"
                size={20}
                onClick={() => setOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogContent>
            <DocuSignNew
              setOpen={setOpen}
            />
            {/* <Home
              setOpen={setOpen}
              setIslinksent2Email={setIslinksent2Email}
              agreementType="membership"
            /> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// GET_STUDENT_LIST
const mapStateToProps = (state) => {
  return {
    membershipList: state.shop.membershipList,
    getmebershipfolderlisting: state.shop.getmebershipfolderlisting,
  };
};
export default connect(mapStateToProps, {
  GET_MEMBERSHIP_FOLDER_LIST,
})(DocumentSign);
