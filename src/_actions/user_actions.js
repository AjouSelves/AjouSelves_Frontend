import axios from "axios";

import { SERVER_URL } from "./types";
import { LOGIN_USER, REGISTER_USER, GET_ALL_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER_URL}/auth/login`, dataToSubmit)
    .then((response) => response.data);
  return { type: LOGIN_USER, payload: request };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER_URL}/auth/register`, dataToSubmit)
    .then((response) => response.data);
  return { type: REGISTER_USER, payload: request };
}

export function getUser() {
  const request = axios
    .get(`${SERVER_URL}/user`)
    .then((response) => response.data);

  return { type: GET_ALL_USER, payload: request };
}
