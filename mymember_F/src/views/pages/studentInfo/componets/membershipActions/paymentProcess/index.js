import React, { useEffect } from "react";
import moment from "moment";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import NumberFormat from "react-number-format";
import CardDetails from "../cardDetails";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Spinner from "../../../../../../components/@vuexy/spinner/Loading-spinner";
const PaymentProcess = ({
  viewActiveStudentInfo,
  data,
  payload,
  changeHandler,
  handleTabChange,
  paymentData,
  cardDetails,
  isExistingCard,
  setStripePayload,
  isLoading,
}) => {
  const { membership_name } = data;
  const { lastName, firstName } = viewActiveStudentInfo;

  return (
    <Row>
      {isLoading && (
        <Box sx={{ zIndex: 9999 }} id="loading-bar">
          <Spinner loading={isLoading} />
        </Box>
      )}
      <Col sm="12">
        <FormGroup>
          <div>
            <Label for="pname">Membership Name</Label>
          </div>
          <Input type="text" value={membership_name} id="pname" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="fName">First Name</Label>
          </div>
          <Input type="text" value={firstName} id="fName" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="lname">Last Name</Label>
          </div>
          <Input type="text" value={lastName} id="lname" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="amount">Amount</Label>
          </div>
          <Input type="text" value={paymentData.Amount} id="amount" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="due-date">Due Date</Label>
          </div>
          <Input
            type="text"
            value={moment(paymentData?.date).format("MM-DD-YYYY")}
            id="due-date"
          />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="payment_type">Payment Type</Label>
          </div>
          <Input
            type="select"
            name="payment_type"
            id="payment_type"
            value={payload.payment_type}
            onChange={changeHandler}
          >
            <option value="cash">Cash</option>
            <option value="credit card">Card</option>
            <option value="cheque">Cheque</option>
          </Input>
        </FormGroup>
      </Col>
      {payload.payment_type === "credit card" && (
        <CardDetails
          cardDetails={cardDetails}
          changeHandler={changeHandler}
          handleTabChange={handleTabChange}
          isExistingCard={isExistingCard}
          setStripePayload={setStripePayload}
        />
      )}
      {payload.payment_type === "cheque" && (
        <>
          <Col sm="4" md="4">
            <FormGroup>
              <div>
                <Label htmlFor="cheque_number">Check Number</Label>
              </div>
              <NumberFormat
                required
                name="cheque_number"
                id="cheque_number"
                value={payload?.cheque_number}
                placeholder="Check number"
                onChange={changeHandler}
                format="#### #### ####"
                className="form-control"
              />
              {!payload?.cheque_number && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  cheque number required!
                </span>
              )}
            </FormGroup>
          </Col>
        </>
      )}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { isLoading: state.shop?.isLoading };
};
export default connect(mapStateToProps)(PaymentProcess);
