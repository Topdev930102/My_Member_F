import React from "react";
import DrawerEventAppoinment from "./drawerEventAppoinment";

const AddEventOrAppointment = (props) => {
  const { type, handleCloseOpen, open } = props;

  return (
    <>
      <DrawerEventAppoinment
        type={type}
        handleCloseOpen={handleCloseOpen}
        open={open}
      />
    </>
  );
};

export default AddEventOrAppointment;
