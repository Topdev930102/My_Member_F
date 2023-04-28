import { connect } from "react-redux";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import { Row, Col, Form } from "reactstrap";
import React, { useState, useEffect, Fragment } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import MembershipActionPopMenu from "./membershipActions/actionPoPupMenu";
import {
  MEMBERSHIP_ACTION,
  MEMBERSHIP_EMI_PAYMENT,
  IS_LOADING,
} from "../../../../redux/actions/shop";
import Freeze from "./membershipActions/freeze";
import Unfreeze from "./membershipActions/unfreeze";
import Refund from "./membershipActions/refund";
import Forfeit from "./membershipActions/forfeit";
import Terminate from "./membershipActions/terminate";
import PaymentProcess from "./membershipActions/paymentProcess";
import { STRIPE_PAYMENT_METHODS_LIST } from "../../../../redux/actions/stripe/index";

const EditMemberShipDrawer = ({
  data,
  MEMBERSHIP_ACTION,
  MEMBERSHIP_EMI_PAYMENT,
  viewActiveStudentInfo,
  isActionONChild,
  paymentData,
  getStudentFinanceInfo,
  stripePaymentMethodList,
  STRIPE_PAYMENT_METHODS_LIST,
  isLoading,
  IS_LOADING,
}) => {
  const [OpenDialog, setOpenDialog] = useState(false);
  const [isMemberActionSubmitted, setIsMemberActionSubmitted] = useState(false);
  const studentId = window.location.pathname.split("student-info/")[1];
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isExistingCard, setIsExistingCard] = useState("newCard");
  const [stripePayload, setStripePayload] = useState({});
  const [formErrors, setFormErrors] = useState({
    refund: {
      Amount: false,
    },
  });
  const memberActionMenu = [
    data?.membership_status === "Active" ? "Freeze" : "Unfreeze",
    "Terminate",
  ];
  if (data?.payment_type === "pif" && !data?.isRefund) {
    memberActionMenu.push("Refund");
  }

  const [payload, setPayload] = useState({
    reason: "",
    refund_percentage: "",
    total_refund: "",
    freeze_stop_date: "",
    freeze_start_date: moment().format("YYYY-MM-DD"),
    payment_type: "cash",
    cheque_number: "",
    paymentIntentId:
      data?.payment_type === "pif"
        ? data?.paymentIntentId
        : paymentData?.paymentIntentId,
  });
  const [cardDetails, setCardDetails] = useState({
    stripePaymentMethod: "",
    card_id: "",
    email: "",
    pan: "",
    cvv: "",
    card_holder_name: "",
    expiry_month: "",
    expiry_year: "",
    address: "",
    street_no: "",
    zip: "",
  });

  const handleTabChange = (event, paymentBy) => {
    let PaymentMethod = { stripePaymentMethod: paymentBy };
    if (paymentBy === "existingCard") {
      PaymentMethod.card_id = stripePaymentMethodList[0]?.card_id;
      PaymentMethod.customer_id = stripePaymentMethodList[0]?.customer_id;
      PaymentMethod.email = stripePaymentMethodList[0]?.email;
    } else {
      PaymentMethod.card_id = "";
    }
    setStripePayload(PaymentMethod);
    setIsExistingCard(paymentBy);
  };

  useEffect(() => {
    if (getStudentFinanceInfo.length) {
      const [cardInfo] = getStudentFinanceInfo;
      setCardDetails({
        ...cardDetails,
        pan: cardInfo?.pan,
        cvv: cardInfo?.cvv,
        card_holder_name: cardInfo?.card_holder_name,
        address: cardInfo?.address?.address,
        street_no: cardInfo?.address?.street_no,
        zip: cardInfo?.address?.zip,
        expiry_month: cardInfo?.expiry_date
          ? cardInfo?.expiry_date.substr(0, 2)
          : "",
        expiry_year: cardInfo?.expiry_date
          ? cardInfo?.expiry_date.substr(2, 3)
          : "",
      });
    }
  }, [cardDetails, getStudentFinanceInfo]);

  useEffect(() => {
    STRIPE_PAYMENT_METHODS_LIST(studentId);
  }, [STRIPE_PAYMENT_METHODS_LIST, studentId]);

  useEffect(() => {
    if (isMemberActionSubmitted === true && isLoading === false) {
      handleClose();
    }
  }, [isMemberActionSubmitted, isLoading]);

  const handleClose = () => {
    setOpenDialog(false);
    setPayload({
      ...payload,
      reason: "",
    });
  };

  const SelectOption = (item) => {
    setSelectedMenu(item);
    setOpenDialog(true);
  };

  const membershipAction = () => {
    IS_LOADING(true);
    setIsMemberActionSubmitted(true);
    const type = selectedMenu.toLowerCase();
    const membershipId = data?._id;
    const { isTerminate, balance } = data;

    let bodyData = {
      payment_type: payload.payment_type,
      ptype: paymentData?.ptype,
    };
    if (
      payload.payment_type === "credit card" &&
      (type === "refund" || type === "payment")
    ) {
      bodyData.cardDetails = cardDetails;
    }
    const createdBy = JSON.parse(localStorage.getItem("userdata"))?.data
      ?.username;
    if (type === "freeze") {
      bodyData = {
        ...bodyData,
        reason: payload.reason,
        isTerminate: isTerminate,
        freeze_start_date: payload.freeze_start_date,
        freeze_stop_date: payload.freeze_stop_date,
        subscription_id: data?.subscription_id,
        expiry_date: data?.expiry_date,
      };
      MEMBERSHIP_ACTION(bodyData, membershipId, type);
    } else if (type === "refund") {
      bodyData = {
        ...bodyData,
        Amount: payload.total_refund,
        reason: payload.reason,
        paymentIntentId: payload.paymentIntentId,
        isTerminate: isTerminate,
        balance: balance + payload.total_refund,
        emiId: paymentData?.Id,
      };
      MEMBERSHIP_ACTION(bodyData, membershipId, type);
    } else if (type === "terminate") {
      bodyData = {
        ...bodyData,
        reason: payload.reason,
        isTerminate: isTerminate,
        subscription_id: data?.subscription_id,
      };
      MEMBERSHIP_ACTION(bodyData, membershipId, type);
    } else if (type === "unfreeze") {
      bodyData = {
        ...bodyData,
        reason: payload.reason,
        isTerminate: isTerminate,
        subscription_id: data?.subscription_id,
      };
      MEMBERSHIP_ACTION(bodyData, membershipId, type);
    } else if (type === "forfeit") {
      let Amount = paymentData?.Amount;
      bodyData = {
        ...bodyData,
        reason: payload.reason,
        isTerminate: isTerminate,
        emiId: paymentData?.Id,
        createdBy: createdBy,
        Amount: Amount,
        balance: balance,
        subscription_id: data?.subscription_id,
      };
      MEMBERSHIP_ACTION(bodyData, membershipId, type);
    } else if (type === "payment") {
      if (isExistingCard === "existingCard") {
        bodyData.cardDetails = { ...bodyData.cardDetails, ...stripePayload };
      }
      let Amount = paymentData?.Amount;
      let payLoadData = {
        ...bodyData,
        createdBy: createdBy,
        Amount: Amount,
        balance: balance,
        cheque_number: payload?.cheque_number,
        subscription_id: data?.subscription_id,
        emiId: paymentData?.Id,
        studentId: studentId,
        stripePaymentMethod: isExistingCard,
      };

      MEMBERSHIP_EMI_PAYMENT(payLoadData, membershipId, paymentData.Id);
    }
    setPayload({
      reason: "",
      refund_percentage: "",
      total_refund: "",
      payment_type: "cash",
      cheque_number: "",
      paymentIntentId: "",
    });
  };
  const changeHandler = (e, cardDetail = false) => {
    const { value, name } = e.target;
    if (cardDetail) {
      setCardDetails({
        ...cardDetails,
        [name]: value,
      });
    } else {
      if (name === "total_refund") {
        const paidAmount = paymentData?.Amount
          ? paymentData?.Amount
          : data?.totalp;
        // const total_refund = (parseInt(value) * parseInt(paidAmount)) / 100; */
        if (Number(value) > Number(paidAmount)) {
          setFormErrors({
            ...formErrors,
            refund: {
              ...formErrors.refund,
              Amount: true,
            },
          });
        } else {
          setFormErrors({
            ...formErrors,
            refund: {
              ...formErrors.refund,
              Amount: false,
            },
          });
          setPayload({
            ...payload,
            [name]: value,
            total_refund: Number(value),
          });
        }
      } else {
        setPayload({
          ...payload,
          [name]: value,
        });
      }
    }
  };

  return (
    <Fragment>
      <MembershipActionPopMenu
        isActionONChild={isActionONChild}
        schedulePaymentsMSstatus={
          data?.payment_type === "pif"
            ? data?.membership_status
            : paymentData?.status
        }
        SelectOption={SelectOption}
        memberShipActionMenu={memberActionMenu}
      />

      <Dialog open={OpenDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{selectedMenu}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Row>
              <Col md="12" sm="12">
                <Form>
                  {selectedMenu === "Freeze" && (
                    <Freeze
                      viewActiveStudentInfo={viewActiveStudentInfo}
                      data={data}
                      payload={payload}
                      changeHandler={changeHandler}
                    />
                  )}
                  {selectedMenu === "Unfreeze" && (
                    <Unfreeze
                      viewActiveStudentInfo={viewActiveStudentInfo}
                      data={data}
                      payload={payload}
                      changeHandler={changeHandler}
                    />
                  )}
                  {selectedMenu === "Refund" && (
                    <Refund
                      viewActiveStudentInfo={viewActiveStudentInfo}
                      data={data}
                      payload={payload}
                      paymentData={paymentData}
                      changeHandler={changeHandler}
                      formErrors={formErrors}
                      cardDetails={cardDetails}
                    />
                  )}
                  {selectedMenu === "Forfeit" && (
                    <Forfeit
                      viewActiveStudentInfo={viewActiveStudentInfo}
                      data={data}
                      payload={payload}
                      changeHandler={changeHandler}
                    />
                  )}
                  {selectedMenu === "Terminate" && (
                    <Terminate
                      viewActiveStudentInfo={viewActiveStudentInfo}
                      data={data}
                      payload={payload}
                      changeHandler={changeHandler}
                    />
                  )}
                  {selectedMenu === "Payment" && (
                    <PaymentProcess
                      viewActiveStudentInfo={viewActiveStudentInfo}
                      data={data}
                      payload={payload}
                      paymentData={paymentData}
                      changeHandler={changeHandler}
                      handleTabChange={handleTabChange}
                      cardDetails={cardDetails}
                      isExistingCard={isExistingCard}
                      setStripePayload={setStripePayload}
                    />
                  )}
                </Form>
              </Col>
            </Row>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="rounded"
            variant="contained"
            color="inherit"
          >
            cancel
          </Button>
          <Button
            onClick={membershipAction}
            color="primary"
            variant="contained"
            className="rounded"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    viewActiveStudentInfo: state.member.viewActiveStudentInfo,
    getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo,
    stripePaymentMethodList: state.stripe.stripePaymentMethodList,
    isLoading: state.shop?.isLoading,
  };
};

export default connect(mapStateToProps, {
  STRIPE_PAYMENT_METHODS_LIST,
  MEMBERSHIP_ACTION,
  MEMBERSHIP_EMI_PAYMENT,
  IS_LOADING,
})(EditMemberShipDrawer);
