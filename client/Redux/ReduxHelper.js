import Store from "./Store";
import { getCurrentUser } from "../../services/appuser.service";

function setUser(user) {
  Store.dispatch({ type: "SET_USER", user });
}

function setCurrentBusiness(currentBusiness) {
  Store.dispatch({ type: "SET_BUSINESS", currentBusiness });
}

export function updateCurrentUser() {
  return getCurrentUser()
    .then(response => {
      setUser(response.data.item || false);
      return response.data.item;
    })
    .catch(err => setUser(false));
}

export function updateCurrentBusiness(businessId) {
  setCurrentBusiness(businessId || false);
}
