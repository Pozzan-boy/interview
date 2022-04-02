import { createStore } from "redux";
import reducer from "../reducers/interviewReducer";

const store = createStore(reducer);

export default store;