// ** React Imports
import React from "react";
import { Link } from "react-router-dom";

// ** Redux
import { connect } from "react-redux";
import { RESET_PASS } from "../../../../redux/actions/auth/resetPassActions";

// ** Third Party Components
import { FormGroup, Form, Input, Label } from "reactstrap";
import { Button } from "antd";

// ** Icons Import
import { ArrowLeft } from "react-feather";

class ResetPassword extends React.Component {
  state = {
    otp: "",
    password1: "",
    password2: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.RESET_PASS(this.state);
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup
            className="form-label-group"
            style={{ paddingBottom: "5px" }}
          >
            <Input
              type="number"
              placeholder="Enter OTP"
              className="ps-1"
              onChange={(e) => this.setState({ otp: e.target.value })}
              required
            />
            <Label>OTP</Label>
          </FormGroup>
          <FormGroup
            className="form-label-group"
            style={{ paddingBottom: "5px" }}
          >
            <Input
              type="password"
              placeholder="Enter New Password"
              className="ps-1"
              onChange={(e) => this.setState({ password1: e.target.value })}
              required
            />
            <Label>New Password</Label>
          </FormGroup>
          <FormGroup
            className="form-label-group"
            style={{ paddingBottom: "5px" }}
          >
            <Input
              type="password"
              placeholder="Confirm Password"
              className="ps-1"
              onChange={(e) => this.setState({ password2: e.target.value })}
              required
            />
            <Label>Confirm Password</Label>
          </FormGroup>
          <Button type="primary" block htmlType="submit">
            Reset Password
          </Button>
          <div className="mt-1 d-flex justify-content-center">
            <Link to="/login">
              <ArrowLeft size={16} />
              &nbsp; Back to login
            </Link>
          </div>

          {/* {this.props.error && (
          <div className="alert alert-danger mt-1" role="alert">
            {this.props.error}{" "}
          </div>
        )} */}
        </Form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    resetPass: state.auth.resetPass,
  };
};
export default connect(mapStateToProps, {
  RESET_PASS,
})(ResetPassword);
