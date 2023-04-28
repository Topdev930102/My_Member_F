import { history } from "../../../history";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const signupWithJWT = (
  email,
  password,
  firstname,
  lastname,
  phone,
  bussinessname,
  bussinessaddress,
  industrytype,
  username
) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/api/signup`, {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        bussinessname: bussinessname,
        bussinessaddress: bussinessaddress,
        industrytype: industrytype,
        username: username,
      })
      .then((response) => {
        var loggedInUser;
        if (response.data) {
          loggedInUser = response.data.user;

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userdata", JSON.stringify(response.data));

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" },
          });

          history.push("/");
        }
      })
      .catch((err) => toast.error(err));
  };
};
export const SIGN_UP_JWT = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/api/send-otp`, data);

      if (response.data && response.status === 200) {
        window.scrollTo(0, 0);
        dispatch({
          type: "SIGNUP",
          payload: { status: true, data: response.data },
        });
        // dispatch(
        //   SEND_OTP_FOR_EMAILVERIFICATION({
        //     email: [data?.email],
        //   })
        // );
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.common?.msg);
    }
  };
};
export const SEND_OTP_FOR_EMAILVERIFICATION = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/api/sendOTP_to_email`, data);
      if (response.data && response.status === 200) {
        dispatch({
          type: "SISEND_OTP_FOR_EMAILVERIFICATIONGNUP",
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const SEND_OTP = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/api/signup`, data);
      console.log(response);
      if (response.data && response.status === 200) {
        dispatch({
          type: "SEND_OTP",
          payload: true,
        });
        setTimeout(() => {
          dispatch({
            type: "SEND_OTP",
            payload: false,
          });
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
