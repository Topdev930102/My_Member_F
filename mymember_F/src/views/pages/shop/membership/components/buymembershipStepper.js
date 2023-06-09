import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { connect } from "react-redux";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import CheckOutSummary from "./checkoutSummary";
import { Paper } from "@material-ui/core";
import { validationError } from "../../../../../utilities/errorMessage";
import { toast } from "react-toastify";
import DocumentSign from "../../signDocument/signDocument";
import { GET_PROGRAM_LIST } from "../../../../../redux/actions/programe";
import { GET_FUNNEL } from "../../../../../redux/actions/form-builder";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    borderRadius: "6px !important",
  },
  primarybtn: {
    borderRadius: "6px !important",
    background: "#2396f3 !important",
    color: "#fff",
  },
  primarybtn1: {
    borderRadius: "6px !important",
    color: "#fff",
  },
  stepsStyle: {
    width: "100%",
    background: "#f9fbfc",
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#2796f3 !important",
      fontWeight: "bold !important",
      boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#2796f3 !important",
      background: "#fff",
      boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    },
    "& .MuiStepConnector-lineHorizontal": {
      borderTop: "4 solid #2796f3 !important",
    },
  },
}));

function BuyMemberShipStepperForm(props) {
  const {
    MembershipInfoComponent,
    CardPaymentFormComponent,
    allInfo,
    setErrorMessage,
    isPaymentDone,
    loading,
    StripePayment,
    Buydigitalmembership,
    memberShipDetail,
    getmebershipfolderlisting
  } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [redirectData, setRedirectData] = useState("None");
  const [memberdata, setMemberData] = useState(getmebershipfolderlisting?.map((res) => res?.membership))
  const alertInfo = false;
  const steps = ["Membership info", "Checkout summary", "Document sign"];

  const handleNext = () => {
    const {
      payment_type,
      payment_money,
      due_every,
      balance,
      payment_time,
      isPaymentDone,
    } = allInfo;
    if (payment_type === "monthly" || payment_type === "weekly") {
      if (
        parseInt(balance) &&
        parseInt(payment_money) &&
        parseInt(due_every) &&
        parseInt(payment_time)
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        const errorMessage = validationError({
          balance,
          payment_money,
          due_every: parseInt(due_every),
          payment_time,
        });
        setErrorMessage(errorMessage);
      }
    } else {
      if (activeStep === 1 && !isPaymentDone) {
        toast.info("Please Pay First!", {
          position: "top-center",
          autoClose: 3000,
          icon: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className={classes.root}>
      <div className={classes.StepperTrackBox}>
        <Paper square style={{ width: "100%" }}>
          <Stepper
            className={classes.stepsStyle}
            activeStep={activeStep}
            alternativeLabel
          >
            <Step>
              <StepLabel>{"Membership info"}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{"Checkout summary"}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{"Status"}</StepLabel>
            </Step>


            {/* {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))} */}
          </Stepper>
        </Paper>
      </div>
      <div>
        {/* {
          "digital" &&
          <div>
            {Buydigitalmembership}</div>
        } */}
        {alertInfo && (
          <div className=" m-1 alert alert-warning" role="alert">
            <b> EMI is not available with Card!</b>
          </div>
        )}
        {activeStep === 0 && MembershipInfoComponent}
        {steps[activeStep] === "Document sign" &&
          <DocumentSign
            redirectData={redirectData}
            memberShipDetail={memberShipDetail}
            setRedirectData={setRedirectData} />}
        {steps[activeStep] === "Checkout summary" && (
          <div>
            <CheckOutSummary
              handleBack={handleBack}
              memberShipDetail={memberShipDetail}
              HandleChange={props.HandleChange}
              CardPaymentFormComponent={CardPaymentFormComponent}
              StripePayment={StripePayment}
              item={allInfo}
              payNowMethod={props.payNowMethod}
              loading={loading}
              handleNext={handleNext}
            />
          </div>
        )}
        <div className="d-flex justify-content-between">
          {memberShipDetail?.docType === "Digital" && activeStep === 1 ?
            ""
            :
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              className={classes.backButton}
            >
              Back
            </Button>
          }
          {
            memberShipDetail?.docType === "Digital" && activeStep === 1 ?
              ""
              :
              steps[activeStep] !== "Document sign" && (
                <Button
                  style={{
                    background:
                      !isPaymentDone && activeStep === 1 ? "#cdc7c7" : "#2396f3",
                  }}
                  disabled={
                    (!isPaymentDone && activeStep === 1) ||
                      props.studentId === undefined
                      ? true
                      : alertInfo
                  }
                  className={classes.primarybtn1}
                  onClick={handleNext}
                >
                  {"Next"}
                </Button>
              )}
          {activeStep === 2 && (
            <Button
              className={classes.primarybtn}
              onClick={props.closeDrawerFromSteper}
            >
              {activeStep === 2 && memberShipDetail?.docType === "None" ? "Upload" : "Close"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getmebershipfolderlisting: state.shop.getmebershipfolderlisting,
    programList: state.program.programList,
    uforms: state?.formbuilder?.uforms,
  };
};

export default connect(mapStateToProps, {
  GET_PROGRAM_LIST,
  GET_FUNNEL,
})(BuyMemberShipStepperForm);
