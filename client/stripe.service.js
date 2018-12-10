import axios from "axios";

export function newSubscription(payload) {
  return axios.post("/api/pay/newsub", payload);
}

export function unsubscribe(id) {
  return axios.put("/api/pay/cancelsubscription", id);
}

export function getSubscriptionInfo(id) {
  return axios.get("/api/pay/info/" + id);
}
