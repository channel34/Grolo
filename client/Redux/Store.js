import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      user: null,
      menuItem: [],
      routes: [],
      currentBusiness: localStorage.grolo_currentBusiness || null
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.user,
      roles: action.user.roles
    };
  }
  if (action.type === "SET_BUSINESS") {
    localStorage.grolo_currentBusiness = action.currentBusiness; // YUCK: side effect in reducer but whatever :)lol
    return {
      ...state,
      currentBusiness: action.currentBusiness
    };
  }
  if (action.type === "SET_MENU_ITEM") {
    return {
      ...state,
      menuItem: action.menuItem
    };
  }
  if (action.type === "SET_CMS_PAGES_ROUTES") {
    return {
      ...state,
      routes: action.routes
    };
  }
}
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
