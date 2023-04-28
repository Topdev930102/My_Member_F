import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const Personal = (props) => {
  const {
    payload,
    handleChange,
    employeeRolesList,
    handleRoleSelect,
    handleSubmit,
    actionType,
    selectedEmployee,
  } = props;

  const [isEdit, setIsEdit] = useState("Save");

  const methods = useForm({
    defaultValue: {},
  });

  return (
    <div className="w-100 m-2 mt-0">
      <FormProvider {...methods}>
        <form className="w-100" onSubmit={methods.handleSubmit(handleSubmit)}>
          <div className="d-flex justify-content-end">
            <div className="">
              {actionType === "Create" ? (
                <button
                  style={{
                    backgroundColor: "#28c76f",
                    border: "#28c76f",
                    color: "#FFF",
                    padding: "10px",
                    width: "100px",
                    borderRadius: "6px",
                  }}
                  type="submit"
                >
                  Create
                  {/* {actionType === "Create" ? "Create" : "Update"} */}
                </button>
              ) : (
                <button
                  style={{
                    backgroundColor: "#00a6e1",
                    border: "#00a6e1",
                    color: "#FFF",
                    padding: "10px",
                    width: "100px",
                    borderRadius: "6px",
                  }}
                  type="submit"
                >
                  {actionType !== "Create" ? "Update" : "Save"}
                </button>
              )}

              <Button className="action">Discard Changes</Button>
            </div>
          </div>

          <h4>Personal</h4>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="first_name">
                First Name
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.firstname
                      : payload?.firstname
                  }
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="lastname">
                Last Name
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.lastname
                      : payload?.lastname
                  }
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="email">
                Email
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.email
                      : payload?.email
                  }
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="mobileNo">
                Mobile Phone
              </Label>
              <FormGroup>
                <Input
                  type="number"
                  name="mobileNo"
                  id="mobileNo"
                  placeholder="phone number..."
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.mobileNo
                      : payload?.mobileNo
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="homeNo">
                Home Phone
              </Label>
              <FormGroup>
                <Input
                  type="number"
                  name="homeNo"
                  id="homeNo"
                  placeholder="phone number..."
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.homeNo
                      : payload?.homeNo
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="pronouns">
                Pronouns
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="pronouns"
                  id="pronouns"
                  placeholder="pronouns"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.pronouns
                      : payload?.pronouns
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="birthday">
                Birthday
              </Label>
              <FormGroup>
                <Input
                  type="date"
                  name="birthday"
                  id="birthday"
                  placeholder="DOB"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.birthday
                      : payload?.birthday
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="Address">
                Address
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="Address"
                  id="Address"
                  placeholder="Address"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.Address
                      : payload?.Address
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="zipCode">
                Zip/postal code
              </Label>
              <FormGroup>
                <Input
                  type="number"
                  name="zipCode"
                  id="zipCode"
                  placeholder="Zip Code"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.zipCode
                      : payload?.zipCode
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="city">
                City
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="city"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.city
                      : payload?.city
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="state">
                State / province
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="state"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.state
                      : payload?.state
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <h4>Emeraency Contact</h4>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="contactName">
                Contact Name
              </Label>
              <FormGroup>
                <Input
                  type="text"
                  name="contactName"
                  id="contactName"
                  placeholder="Contact Name"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.contactName
                      : payload?.contactName
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="contactNo">
                Contact Number
              </Label>
              <FormGroup>
                <Input
                  type="number"
                  name="contactNo"
                  id="contactNo"
                  placeholder="Contact Number"
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.contactNo
                      : payload?.contactNo
                  }
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <h4>Select Role</h4>
          <Row>
            <Col sm="12" md="4" lg="4">
              <Label className="label" htmlFor="contactNo">
                Roles
              </Label>
              <FormGroup>
                <Select
                  onChange={handleRoleSelect}
                  style={{ width: "200px" }}
                  // value={selectedRoleName}
                  defaultValue={
                    actionType === "Edit"
                      ? selectedEmployee[0]?.role
                      : "Select Role"
                  }
                >
                  {employeeRolesList.map((info) => {
                    return (
                      <Option value={info?._id} key={info?._id}>
                        {info.rolename}
                      </Option>
                    );
                  })}
                </Select>
              </FormGroup>
            </Col>
          </Row>

          <h4>Emeraency Contact</h4>
          <div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Invite to 7shifts via Email/SMS"
              />
            </FormGroup>
            <p className="action">
              Employes recite an ile to gel sores to Bangs ie pulisied
              schediies, Hine and avalaniily.
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Personal;
