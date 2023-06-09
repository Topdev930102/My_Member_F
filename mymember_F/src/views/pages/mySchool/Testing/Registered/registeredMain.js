import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import TopProgramn from "./topProgram";
import TabsMain from "./TabsMain";

class TestingMain extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Registered"
          breadCrumbParent="Testing"
          breadCrumbActive="Registered"
        />
        <Row>
          <Col className="mb-1 invoice-header" md="12" sm="12">
            <TopProgramn />
            <TabsMain />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default TestingMain;
