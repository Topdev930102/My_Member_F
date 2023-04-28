import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const RESET_PASS_OTP = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/api/forgetPassword`, data);

      if (response.data && response.status === 200) {
        dispatch({
          type: "RESET_PASS_OTP",
          payload: { status: true, isOtpSended: true, data: response.data },
        });
        toast.success("Check your mail for OTP.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.common?.msg);
    }
  };
};

export const RESET_PASS = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.patch(`${baseUrl}/api/resetPassword`, data);

      if (response.data && response.status === 200) {
        window.scrollTo(0, 0);
        dispatch({
          type: "RESET_PASS",
          payload: { status: true, data: response.data },
        });
        toast.success("Password changed successfully");
        setTimeout(() => {
          dispatch({
            type: "RESET_PASS",
            payload: false,
          });
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.common?.msg);
    }
  };
};
