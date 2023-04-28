import React from "react";
import { Plus } from "react-feather";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  handleSidebar,
  handleSelectedEvent,
  handleSettingSidebar,
} from "../../../../redux/actions/calendar/index";

const SideBarButton = styled(Button)(({ theme }) => ({
  color: "#00a9e2",
  borderColor: "#00a9e2",
  "&:hover": {
    borderColor: "#00a9e2",
  },
}));

const AddEventButton = (props) => {
  return (
    <>
      <Stack spacing={2}>
        <SideBarButton
          onClick={() => {
            props.handleSettingSidebar(true);
            props.handleSidebar(null);
            props.handleSelectedEvent(null);
          }}
          variant={props.app.sidebar ? "contained" : "outlined"}
          key="Attendance-History"
        >
          <span className="align-middle">Setting</span>
        </SideBarButton>
      </Stack>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.calendar,
  };
};
export default connect(mapStateToProps, {
  handleSidebar,
  handleSelectedEvent,
  handleSettingSidebar,
})(AddEventButton);
