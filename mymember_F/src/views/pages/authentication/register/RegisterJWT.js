// ** React Imports
import React from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import Otpverification from "./Otpverification";

// ** Third Party Components
import NumberFormat from "react-number-format";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Typography, Button } from "antd";

// ** Icons Import
import { Check } from "react-feather";

// ** Hooks
import {
  signupWithJWT,
  SIGN_UP_JWT,
} from "../../../../redux/actions/auth/registerActions";
import { connect } from "react-redux";
// import { history } from "../../../../history";

const { Text } = Typography;

const Notification = () => {
  return (
    <>
      <div className="rounded bg-docs-transparent-grid">
        <div className="alert alert-success" role="alert">
          Check your mail for an OTP
        </div>
      </div>
    </>
  );
};

class RegisterJWT extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    // bussinessname: "",
    // bussinessAddress: "",
    // industry: "",
    // username: "",
    // location_name: "",
  };

  changeHandler = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  changeHandler2 = (value) => {
    this.setState({ location_name: value });
  };
  handleRegister = (e) => {
    e.preventDefault();
    if (this.state.firstName === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill first name",
      });
    } else if (this.state.lastName === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill last name",
      });
    } else if (this.state.email === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill email",
      });
    } else if (this.state.phone === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly fill phone",
      });
    } else if (this.state.password === "") {
      this.setState({
        error: true,
        errorMsg: "Kindly type a strong password",
      });
    } else {
      this.setState({
        error: false,
        errorMsg: "",
      });
      this.props.SIGN_UP_JWT({ ...this.state });
    }
  };

  render() {
    return (
      <>
        {this.props.register.status?.status && <Notification />}

        {!this.props.register.status?.status ? (
          <Form action="/" onSubmit={this.handleRegister}>
            <FormGroup
              className="form-label-group"
              style={{ paddingBottom: "5px" }}
            >
              <Input
                type="text"
                placeholder="First Name"
                className="ps-1"
                required
                name="firstName"
                onChange={this.changeHandler}
              />
              <Label>First Name</Label>
            </FormGroup>
            <FormGroup
              className="form-label-group"
              style={{ paddingBottom: "5px" }}
            >
              <Input
                type="text"
                placeholder="Last Name"
                className="ps-1"
                required
                name="lastName"
                onChange={this.changeHandler}
              />
              <Label>Last Name</Label>
            </FormGroup>
            <FormGroup
              className="form-label-group"
              style={{ paddingBottom: "5px" }}
            >
              <Input
                type="email"
                placeholder="Email"
                className="ps-1"
                required
                name="email"
                onChange={this.changeHandler}
              />
              <Label>Email</Label>
            </FormGroup>
            <FormGroup
              className="form-label-group"
              style={{ paddingBottom: "5px" }}
            >
              <NumberFormat
                // style={{ height: "3em" }}
                type="text"
                name="phone"
                id="mobile_number"
                placeholder="Phone"
                onChange={this.changeHandler}
                format="###-###-####"
                mask="_"
                className="form-control ps-1"
              />
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="password"
                placeholder="Password"
                className="ps-1"
                required
                name="password"
                onChange={this.changeHandler}
              />
              <Label>Password</Label>
            </FormGroup>
            {/* Fields removed for better user experience start */}
            {/* Do not remove these commented FormGroups unless you are 100% sure that nothing will be affected */}
            {/* <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Bussiness Name"
              className="ps-1"
              required
              name="bussinessname"
              onChange={this.changeHandler}
            />
            <Label>Bussiness Name</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Bussiness Address"
              className="ps-1"
              required
              name="bussinessAddress"
              onChange={this.changeHandler}
            />
            <Label>Bussiness Address</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <CustomInput
              onChange={(e) => this.changeHandler(e, "industry")}
              type="select"
              name="industry"
              id="industry"
              style={{
                height: "35px",
                paddingTop: "6px",
                fontSize: "12px",
                color: "#b0b1b5",
              }}
            >
              <option>General Business</option>
              <option>Real Estate</option>
              <option>Fitness</option>
              <option>Martial Arts</option>
              <option>Dance</option>
              <option>Yoga</option>
              <option>CMA Franchise</option>
            </CustomInput>
            <Label>Industry</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="User Name"
              className="ps-1"
              required
              name="username"
              onChange={this.changeHandler}
            />
            <Label>Username</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="City"
              className="ps-1"
              required
              name="town"
              onChange={this.changeHandler}
            />
            <Label>City</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="State"
              className="ps-1"
              required
              name="state"
              onChange={this.changeHandler}
            />
            <Label>State</Label>
          </FormGroup> */}
            {/* Fields removed for better user experience end */}
            <FormGroup className="d-flex align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                defaultChecked={true}
              />
              <span>I accept the </span>{" "}
              <Link href="#" style={{ marginLeft: "5px" }}>
                Terms & Conditions
              </Link>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button type="primary" block htmlType="submit">
                Sign Up
              </Button>
            </div>
            <div className="mt-1 d-flex justify-content-center">
              <Text type="secondary">Already have an account? </Text>&nbsp;
              <Link to="/login"> Sign In Instead</Link>
            </div>
          </Form>
        ) : (
          <Otpverification data={this.props.register.status?.data} />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    register: state.auth.register,
  };
};
export default connect(mapStateToProps, {
  signupWithJWT,
  SIGN_UP_JWT,
})(RegisterJWT);
