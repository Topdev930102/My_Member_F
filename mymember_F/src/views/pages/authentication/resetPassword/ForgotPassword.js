// ** React Imports
import React from "react";
import { Redirect } from "react-router-dom";

// ** Redux
import { useSelector } from "react-redux";

// ** Custom Components
import SendOTP from "./SendOTP";
import ResetPassword from "./ResetPassword";
import registerImage from "../../../../assets/img/pages/register.jpg";
import LogoImg from "../../../../assets/img/logo/logo.png";

// ** Third Party Components
import { Col, Row, Card, Typography } from "antd";

// ** Styles
import "../../../../assets/scss/pages/authentication.scss";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const isOtpSended = useSelector((state) => state.auth.resetPass.status);

  console.log(isOtpSended);

  const token = localStorage.access_token;
  if (token && token !== "null") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div className="m-2">
        <div>
          <img src={LogoImg} style={{ width: "100px" }} alt="logo" />
        </div>
        <Row>
          <Col
            span={16}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              className="mr-1"
              src={registerImage}
              style={{ width: "700px" }}
              alt="registerImg"
            />
          </Col>
          <Col
            span={8}
            className="d-flex align-items-center justify-content-center"
          >
            <Card
              style={{
                width: 370,
              }}
            >
              <div className="mb-2">
                <Title level={4} style={{ color: "#5e5873" }} className="mb-0">
                  Forgot Password?🔒
                </Title>
                <Text type="secondary">
                  Enter your email and follow the next steps. Check mail for an
                  OTP.
                </Text>
              </div>
              {isOtpSended ? <ResetPassword /> : <SendOTP />}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ForgotPassword;
