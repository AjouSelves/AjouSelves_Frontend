import axios from "axios";

import { SERVER_URL_API } from "./types";

import {
  PROJ_ADD,
  PROJ_ADD_PHOTO,
  PROJ_EDIT,
  PROJ_EDIT_PHOTO,
  PROJ_DELETE,
  PROJ_GET_ALL,
  PROJ_GET_BY_ID,
  PROJ_JOIN,
  PROJ_LEAVE,
} from "./types";

export function projAdd(body, header) {
  const req = axios
    .post(`${SERVER_URL_API}/proj/add`, body, header)
    .then((res) => res.data);
  return { type: PROJ_ADD, payload: req };
}

export function projAddPhoto(body, header) {
  const req = axios
    .post(`${SERVER_URL_API}/proj/add_photo`, body, header)
    .then((res) => res.data);
  return { type: PROJ_ADD_PHOTO, payload: req };
}

// export function projAddMulti(dataToAdd) {
//   const req = axios
//     .post(`${SERVER_URL_API}/proj/add/multi`, dataToAdd)
//     .then((res) => res.data);
//   return { type: PROJ_ADD_MULTI, payload: req };
// }

export function projEdit(id, body, header) {
  const req = axios
    .put(`${SERVER_URL_API}/proj/edit/${id}`, body, header)
    .then((res) => res.data);
  return { type: PROJ_EDIT, payload: req };
}

export function projEditPhoto(id, body, header) {
  const req = axios
    .put(`${SERVER_URL_API}/proj/edit_multi/${id}`, body, header)
    .then((res) => res.data);
  return { type: PROJ_EDIT_PHOTO, payload: req };
}

export function projDelete(id, header) {
  const req = axios
    .delete(`${SERVER_URL_API}/proj/delete/${id}`, header)
    .then((res) => res.data);
  return { type: PROJ_DELETE, payload: req };
}

export function projGetAll() {
  const req = axios.get(`${SERVER_URL_API}/proj`).then((res) => res.data);
  return { type: PROJ_GET_ALL, payload: req };
}

export function projGetById(id) {
  const req = axios.get(`${SERVER_URL_API}/proj/${id}`).then((res) => res.data);
  return { type: PROJ_GET_BY_ID, payload: req };
}
