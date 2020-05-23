import axios from 'axios';
import config from "./config";
let actionId = 1
export function setImages(images){
  return {
    id: actionId++,
    type: 'set_images',
    images
  }
}
export function loading(loading){
  return {
    id: actionId++,
    type: 'loading',
    loading
  }
}
export function setTotal(total){
  return {
    id: actionId++,
    type: 'set_total',
    total
  }
}
export function getImages(pageNo, pageSize, imageSetValue){
  return async function(dispatch){
    dispatch(loading(true))
    let result = await axios({
      method: "get",
      url: config.BASEURL+"/getImages",
      params:{
        pageNo,
        pageSize,
        imageSetValue
      }
    })
    console.log(result.data)
    if(result.data.status === 'PASS'){
      dispatch(setImages(result.data.data))
      dispatch(setTotal(result.data.total))
    }
    dispatch(loading(false))
  }
}