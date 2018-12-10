import axios from "axios";

export function getUsers(req) {
  let url = req.search ? "/api/appuser/search/" : "/api/appuser/";
  url += req.pageIndex + "/" + req.pageSize;
  if (req.search) {
    url += "?q=" + encodeURIComponent(req.search);
  }
  return axios.get(url, req);
}

export function login(req) {
  return axios.post("/api/appuser/login", req);
}

export function register(req) {
  return axios.post("/api/appuser/register", req);
}
export function userlist(req) {
  return axios.post("/api/appuser/userlist", req);
}
export function registerConfirm(key) {
  console.log(key);
  return axios.put("/api/appuser/registerConfirm/?token=" + encodeURIComponent(key), key);
}
export function confirm(req) {
  return axios.post("/api/appuser/confirm/", req);
}
export function password(req) {
  return axios.post("/api/appuser/forgotPassword", req);
}

export function resetTokenConfirmation(payload) {
  return axios.post("/api/appuser/passwordConfirmation", payload);
}

export function newPasswordReset(req) {
  return axios.post("/api/appuser/newPassword", req);
}

export function getCurrentUser() {
  return axios.get("/api/appuser/current");
}

export function logout() {
  return axios.post("/api/appuser/logout");
}
export function getById(id) {
  return axios.get("/api/appuser/" + id);
}
export function inviteTenant(payload) {
  return axios.post("/api/appuser/invite", payload);
}
