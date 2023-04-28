// ** React Imports
import React from "react";
import { Link } from "react-router-dom";

// ** Redux
import { connect } from "react-redux";
import { RESET_PASS_OTP } from "../../../../redux/actions/auth/resetPassActions";

// ** Third Party Components
import { FormGroup, Form, Input, Label } from "reactstrap";
import { Button } from "antd";

// ** Icons Import
import { ArrowLeft } from "react-feather";

class SendOTP extends React.Component {
  state = {
    email: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.RESET_PASS_OTP(this.state);
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
              type="email"
              placeholder="Enter Email Address"
              className="ps-1"
              onChange={(e) => this.setState({ email: e.target.value })}
              required
            />
            <Label>Email Address</Label>
          </FormGroup>
          <Button type="primary" block htmlType="submit">
            Send Verification OTP
          </Button>
          <div className="mt-1 d-flex justify-content-center">
            <Link to="/login">
              <ArrowLeft size={16} />
              &nbsp; Back to login
            </Link>
          </div>

          {this.props.error && (
            <div className="alert alert-danger mt-1" role="alert">
              {this.props.error}
            </div>
          )}
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
  RESET_PASS_OTP,
})(SendOTP);
