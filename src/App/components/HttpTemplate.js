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
  notAuth: function (error) {
    if (error.response.data && error.response.data.status === 403) {
      alert("권한이 없습니다.");
      window.location.href = '/#/auth/signin';
    } else {
      alert("시스템 오류가 발생되었습니다. 관리자에게 문의하시기 바랍니다.");
    }
  },
  get: (path) => {
    return ajax.get(defaultUrl + path, {
      headers: header,
      withCredentials: true
    }).then(res => {
      return res;
    }).catch((error) => {
      http.notAuth(error);
    });
  },
  post: (path, body, externalHeader) => {
    return ajax.post(defaultUrl + path, body, {
      headers: Object.assign(header, externalHeader),
      withCredentials: true
    }).then((res) => {
      return res;
    }).catch(error => {
      alert("error: " + error);
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
    });
  }
};

export default http;
