import apiAuthService from "../../services/apiAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import configureStore from "../Store";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

const { Store, Persistor } = configureStore();

export function loginWithEmailAndPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    apiAuthService
      .loginWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(setUserData(user));
        //console.log("history",history)
        if (history.location.prev) {
          history.push({
            pathname: history.location.pathname != history.location.prev ? history.location.prev : "/"
          });
        } else {
          history.push({
            pathname: (history.state && history.state != "/session/signin") ? history.state :  "/"
          });
        }

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}