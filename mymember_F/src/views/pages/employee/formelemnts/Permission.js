import React, { useEffect, useRef } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Button, Checkbox, FormControlLabel, Switch } from "@material-ui/core";
import { Input, Select } from "antd";
import { GET_EMPLOYEE_ROLES_LIST } from "../../../../redux/actions/employee_subusers_roles";
import { connect } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

const Permission = (props) => {
  const {
    employeeRolesList,
    payload,
    handleRoleSelect,
    GET_EMPLOYEE_ROLES_LIST,
    handleSubmit,
    handleStatusChange,
    selectedEmployee,
    actionType,
    handleChange,
  } = props;

  useEffect(() => {
    GET_EMPLOYEE_ROLES_LIST();
  }, [GET_EMPLOYEE_ROLES_LIST]);
  const methods = useForm({
    defaultValue: {},
  });

  return (
    <div className="w-100 m-2 mt-0">
      <h4>Permission</h4>
      <br />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Row>
            <Col sm="12" md="3" lg="3">
              <Label className="label" htmlFor="username">
                User Name
              </Label>
              <FormGroup>
                <Input
                  placeholder="User Name"
                  variant="outlined"
                  name="username"
                  type="text"
                  id="username"
                  style={{
                    border: "1px solid #ced4da",
                    background: "white",
                    width: "100%",
                  }}
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.username
                      : payload.username
                  }
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="3" lg="3">
              <Label className="label" htmlFor="phone_number">
                Status
              </Label>
              <FormGroup>
                <Select
                  style={{ width: "100%" }}
                  defaultValue={
                    actionType === "Edit" ? "Select Status" : "Select Status"
                  }
                  onChange={handleStatusChange}
                >
                  <Select.Option value="Active">Active</Select.Option>
                  <Select.Option value="Inactive">Inactive</Select.Option>
                  <Select.Option value="Terminate">Terminate</Select.Option>
                </Select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="3" lg="3">
              <Label className="label" htmlFor="password">
                Password
              </Label>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  name="password"
                  id="password"
                  style={{
                    border: "1px solid #ced4da",
                    background: "white",
                    width: "100%",
                  }}
                  onChange={handleChange}
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.password
                      : payload?.password
                  }
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="3" lg="3">
              <Label className="label" htmlFor="password">
                Re Enter Password
              </Label>
              <FormGroup>
                <Input
                  placeholder="Password"
                  variant="outlined"
                  name="password"
                  id="password"
                  style={{
                    border: "1px solid #ced4da",
                    background: "white",
                    width: "100%",
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="3" lg="3">
              <Label className="label" htmlFor="phone_number">
                Employee Type
              </Label>
              <FormGroup>
                <Select
                  style={{ width: "100%" }}
                  defaultValue={
                    actionType === "Edit" ? "Select Role" : "Select Role"
                  }
                  onChange={handleRoleSelect}
                >
                  {employeeRolesList?.map((info, index) => {
                    return (
                      <Select.Option value={info?._id} key={index + 1}>
                        {info?.rolename}
                      </Select.Option>
                    );
                  })}
                </Select>
              </FormGroup>
            </Col>
          </Row>
          <div>
            <FormControlLabel
              control={<Checkbox name="email" color="primary" />}
              label="Invite to Mymember via Email/SMS"
            />
          </div>
          <Button
            variant="contained"
            className="primary"
            style={{
              borderRadius: "6px",
            }}
            type="submit"
          >
            Save
          </Button>
          <Button className="action">Discard Changes</Button>
        </form>
      </FormProvider>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    employeeRolesList: state.employeeSubUser.employeeRolesList,
  };
};
export default connect(mapStateToProps, { GET_EMPLOYEE_ROLES_LIST })(
  Permission
);
