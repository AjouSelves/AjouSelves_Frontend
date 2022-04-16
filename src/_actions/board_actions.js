import axios from "axios";

import {
  MODE_ADD,
  MODE_EDIT,
  MODE_GET_ALL,
  MODE_GET_BY_ID,
  MODE_GET_BY_TITLE,
  MODE_REMOVE,
} from "./types";

export function boardAdd(dataToAdd) {
  const request = axios
    .post("/post/add", dataToAdd)
    .then((response) => response.data);
  return { type: MODE_ADD, payload: request };
}

export function boardEdit(id, dataToEdit) {
  const request = axios
    .put(`/post/edit/${id}`, dataToEdit)
    .then((response) => response.data);
  return { type: MODE_EDIT, payload: request };
}

export function boardGetAll() {
  const request = axios.get("/post/getall").then((response) => response.data);
  return { type: MODE_GET_ALL, payload: request };
}

export function boardGetById(id) {
  const request = axios
    .get(`/post/get/${id}`)
    .then((response) => response.data);
  return { type: MODE_GET_BY_ID, payload: request };
}

export function boardGetByTitle(title) {
  const request = axios
    .post(`/post/search`, title)
    .then((response) => response.data);
  return { type: MODE_GET_BY_TITLE, payload: request };
}

export function boardRemove(id) {
  const request = axios
    .delete(`/post/delete/${id}`)
    .then((response) => response.data);
  return { type: MODE_REMOVE, payload: request };
}
