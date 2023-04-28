// ** React Imports
import React from "react";

// ** Custom Components
import RegisterJWT from "./RegisterJWT";
import registerImage from "../../../../assets/img/pages/register.jpg";
import LogoImg from "../../../../assets/img/logo/logo.png";

// ** Third Party Components
import { Col, Row, Card, Typography, Divider, Button, Space } from "antd";

// ** Styles
import "../../../../assets/scss/pages/authentication.scss";

// ** Icons Import
import { Facebook, Mail, Linkedin, Twitter } from "react-feather";

const { Title, Text } = Typography;

class Register extends React.Component {
  state = {
    activeTab: "1",
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  render() {
    return (
      <>
        {/* <div className="bg-full-screen-image1">
          <div className="flexbox-container">
            <Row className="m-0 justify-content-center">
              <Col
                sm="8"
                xl="7"
                lg="10"
                md="8"
                className="d-flex justify-content-center"
              >
                <Card
                  className="bg-authentication rounded mb-0 w-100"
                  style={{ marginTop: "15vh" }}
                >
                  <Row className="m-0">
                    <Col
                      lg="6"
                      className="d-lg-block d-none text-center align-self-center px-1 py-0"
                    >
                      <img src={LogoImg} style={{ width: "50%" }} alt="logo" />
                      <img
                        className="mr-1"
                        src={registerImg}
                        alt="registerImg"
                      />
                    </Col>
                    <Col lg="6" md="12" className="p-0">
                      <Card className="rounded mb-0 p-2">
                        <CardHeader className="pb-1 pt-50">
                          <CardTitle>
                            <h4 className="mb-0">Create Account</h4>
                          </CardTitle>
                        </CardHeader>
                        <p className="px-2 auth-title mb-0">
                          Fill the below form to create a new account.
                        </p>
                        <CardBody className="pt-1 pb-50">
                          <RegisterJWT />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div> */}
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
                  <Title
                    level={4}
                    style={{ color: "#5e5873" }}
                    className="mb-0"
                  >
                    Create Your Account
                  </Title>
                  <Text type="secondary">
                    Manage your members in one place!
                  </Text>
                </div>
                <RegisterJWT />
                <Divider plain>Or</Divider>
                <div className="d-flex justify-content-center">
                  <Space>
                    <Button
                      className="cursor-pointer"
                      type="primary"
                      shape="circle"
                      icon={<Facebook size={15} />}
                    />
                    <Button
                      style={{ backgroundColor: "#ff5542", cursor: "pointer" }}
                      shape="circle"
                      icon={<Mail size={15} color="#ffffff" />}
                    />
                    <Button
                      style={{ backgroundColor: "#6397ff", cursor: "pointer" }}
                      shape="circle"
                      icon={<Linkedin size={15} color="#ffffff" />}
                    />
                    <Button
                      style={{ backgroundColor: "#5bbbff", cursor: "pointer" }}
                      shape="circle"
                      icon={<Twitter size={15} color="#ffffff" />}
                    />
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default Register;
