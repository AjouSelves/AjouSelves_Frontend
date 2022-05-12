import axios from "axios";

import { SERVER_URL } from "./types";

import {
  PROJ_ADD,
  PROJ_ADD_SINGLE,
  PROJ_ADD_MULTI,
  PROJ_EDIT,
  PROJ_EDIT_SINGLE,
  PROJ_EDIT_MULTI,
  PROJ_DELETE,
  PROJ_GET_ALL,
  PROJ_GET_BY_ID,
  PROJ_JOIN,
  PROJ_LEAVE,
} from "./types";

export function projAdd(body, header) {
  const req = axios
    .post(`${SERVER_URL}/proj/add`, body, header)
    .then((res) => res.data);
  return { type: PROJ_ADD, payload: req };
}

export function projAddSingle(body, header) {
  const req = axios
    .post(`${SERVER_URL}/proj/add/single`, body, header)
    .then((res) => res.data);
  return { type: PROJ_ADD_SINGLE, payload: req };
}

export function projAddMulti(dataToAdd) {
  const req = axios
    .post(`${SERVER_URL}/proj/add/multi`, dataToAdd)
    .then((res) => res.data);
  return { type: PROJ_ADD_MULTI, payload: req };
}

export function projEdit(id, body, header) {
  const req = axios
    .put(`${SERVER_URL}/proj/edit/${id}`, body, header)
    .then((res) => res.data);
  return { type: PROJ_EDIT, payload: req };
}

export function projEditSingle(id, body, header) {
  const req = axios
    .put(`${SERVER_URL}/proj/edit/single/${id}`, body, header)
    .then((res) => res.data);
  return { type: PROJ_EDIT_SINGLE, payload: req };
}

export function projEditMulti(id, body, header) {
  const req = axios
    .put(`${SERVER_URL}/proj/edit/multi/${id}`, body, header)
    .then((res) => res.data);
  return { type: PROJ_EDIT_MULTI, payload: req };
}
export function projDelete(id, header) {
  const req = axios
    .delete(`${SERVER_URL}/proj/delete/${id}`, header)
    .then((res) => res.data);
  return { type: PROJ_DELETE, payload: req };
}

export function projGetAll() {
  const req = axios.get(`${SERVER_URL}/proj`).then((res) => res.data);
  return { type: PROJ_GET_ALL, payload: req };
}

export function projGetById(id) {
  const req = axios.get(`${SERVER_URL}/proj/${id}`).then((res) => res.data);
  return { type: PROJ_GET_BY_ID, payload: req };
}
