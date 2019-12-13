import ajax from 'axios'
import config from "../../config";

const defaultHttp = config.backendHttp

const defaultHost = config.backendHost
const defaultPort = config.backendPort

const defaultUrl = defaultHttp + defaultHost +":"+ defaultPort ;

const header = {
  'Content-Type': 'application/json;charset=UTF-8'
};

const http = {
  defaultIp: defaultHost,
  // notAuth: function (error) {
  //   if (error.response.data && error.response.data.status === 403) {
  //     localStorage.clear();
  //     alert("권한이 없습니다.");
  //     window.location.href = '/#/auth/signin';
  //   } else {
  //     alert("시스템 오류가 발생되었습니다. 관리자에게 문의하시기 바랍니다.");
  //   }
  // },
  get: (path) => {
    return ajax.get(defaultUrl + path, {
      headers: header,
      withCredentials: true
    }).then(res => {
      return res;
    }).catch((error) => {
      http.notAuth(error);
      return error;
    });
  },
  post: (path, body, externalHeader) => {
    return ajax.post(defaultUrl + path, body, {
      headers: Object.assign(header, externalHeader),
      withCredentials: true
    }).then((res) => {
      return res;
    }).catch(error => {
      if(isEmpty(error.response)){
        alert("error: " + error);
      }else if(isEmpty(error.response.data)){
        alert("error: " + error);
      }else{
        alert("error: " + error.response.data.message);
      }
      http.notAuth(error);
      // throw error;
      return error;
    });
  },
  put: (path, body) => {
    return ajax.put(defaultUrl + path, body, {
      headers: header,
      withCredentials: true
    }).then((res) => {
      return res;
    }).catch(error => {
      http.notAuth(error);
      return error;
    });
  },
  delete: (path, body) => {
    return ajax.delete(defaultUrl + path, body, {
      headers: header,
      withCredentials: true
    }).then((res) => {
      return res;
    }).catch(error => {
      // http.notAuth(error);
      return error;
    });
  }
};

const isEmpty = function(value){ if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ return true }else{ return false } };


export default http;
