import axios from "axios";
import jwt_decode from "jwt-decode";

export const actionTypes = Object.freeze({
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
});

export const initAuth = () => (dispatch) => {
  try {
    const token = localStorage.getItem("token") || "";
    const decoded = jwt_decode(token);
    const isTokenExpired = Date.now() >= decoded.exp * 1000;

    if (isTokenExpired) throw new Error("");

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: decoded });
  } catch (err) {
    localStorage.clear();
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      error: "Auto sign-in failed",
    });
  }
};

export const signIn = (credentials) => {
  // ....
  return async (dispatch) => {
    try {
      // Start Login Process
      dispatch({ type: actionTypes.LOGIN_START });

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      }

      const details = {
        "_username": credentials.username,
        "_password": credentials.password,
        "_subdomain": "face"
      }

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      // Login http request
      const httpResponse = await axios.post("https://face.ox-sys.com/security/auth_check", formBody, config);
      if (httpResponse.status === 200) {
        localStorage.setItem("token", httpResponse.data.token);
        const decoded = jwt_decode(httpResponse.data.token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: decoded,
        });
        credentials.history.push("/");
      } else {
        console.log("Error with request");
        localStorage.clear();
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          error: httpResponse.statusText,
        });
      }
    } catch (err) {
      localStorage.clear();
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        error: err,
      });
    }
  };
};

export const signOut = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: actionTypes.LOGOUT });
};
