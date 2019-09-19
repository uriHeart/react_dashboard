import ajax from 'axios'

const defaultHost = 'localhost';
const defaultUrl = 'http://' + defaultHost + ':10002';
const header = {
  'Content-Type': 'application/json;charset=UTF-8'
};

const http = {
  defaultIp: defaultHost,
  notAuth: function (error) {
    if (error.response.data && error.response.data.status === 403) {
      window.location.href = '/login';
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
  post: (path, body) => {
    return ajax.post(defaultUrl + path, body, {
      headers: header,
      withCredentials: true
    }).then((res) => {
      return res;
    }).catch(error => {
      http.notAuth(error);
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
