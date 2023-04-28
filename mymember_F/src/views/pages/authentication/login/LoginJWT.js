// ** React Imports
import React from "react";
import { Link, withRouter } from "react-router-dom";

// ** Redux
import { connect } from "react-redux";
import { compose } from "redux";
import {
  loginWithJWT,
  LOGIN_WITH_JWT,
} from "../../../../redux/actions/auth/loginActions";

// ** Custom Components
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";

// ** Third Party Components
import { FormGroup, Form, Input, Label } from "reactstrap";
import { Typography, Button } from "antd";

// ** Icons Import
import { Mail, Lock, Check } from "react-feather";

const { Text } = Typography;

class LoginJWT extends React.Component {
  state = {
    username: "",
    password: "",
    remember: false,
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.LOGIN_WITH_JWT(this.state);
  };
  handleRemember = (e) => {
    this.setState({
      remember: e.target.checked,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleLogin}>
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ paddingBottom: "5px" }}
          >
            <Input
              type="text"
              placeholder="User Name"
              onChange={(e) => this.setState({ username: e.target.value })}
              required
            />
            <div className="form-control-position">
              <Mail size={15} />
            </div>
            <Label>User Name </Label>
          </FormGroup>
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              required
            />
            <div className="form-control-position">
              <Lock size={15} />
            </div>
            <Label>Password</Label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-between align-items-center">
            <Checkbox
              color="primary"
              icon={<Check className="vx-icon" size={16} />}
              label="Remember me"
              defaultChecked={false}
              onChange={this.handleRemember}
            />
            <div className="float-right">
              <Link to="/reset-password">Forgot Password?</Link>
            </div>
          </FormGroup>

          <Button type="primary" block htmlType="submit">
            Sign In
          </Button>
          <div className="mt-1 d-flex justify-content-center">
            <Text type="secondary">New on our platform? </Text>&nbsp;
            <Link to="/register"> Sign Up instead</Link>
          </div>

          {this.props.error && (
            <div className="alert alert-danger mt-1" role="alert">
              {this.props.error}{" "}
            </div>
          )}
        </Form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  let values = state.auth.login.values;
  let error = "";
  if (values) {
    if (values.hasOwnProperty("error")) {
      error = values.error;
    }
  }

  //const error = state.auth.login.values.error;
  return {
    error: error,
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { loginWithJWT, LOGIN_WITH_JWT })
)(LoginJWT);
