import {
  combineReducers
} from "redux";

const images = (state = [], action) => {
  if(action.type === 'set_images'){
    return [...action.images];
  }
  return state;
}
const loading = (state = false, action) => {
  if(action.type === 'loading'){
    return action.loading;
  }
  return state;
}
const total = (state = 0, action) => {
  if(action.type === 'set_total'){
    return action.total;
  }
  return state;
}
export default combineReducers({
  images,
  loading,
  total
});