import ajax from 'axios'

const defaultHost = 'localhost';
const defaultUrl = 'http://' + defaultHost + ':10002';
const header = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
};

const http = {
  defaultIp: defaultHost,
  get: (path) => {
    return ajax.get(defaultUrl + path, {
      headers: header
    }).then(res => {
      return res;
    }).catch((error) => {
      console.log(JSON.stringify(error));
      if (error.response.data.status === 403) {
        window.location.href = '/login';
      }
    });
  },
  post: (path, body) => {
    return ajax.post(defaultUrl + path, body, {
      headers: header
    }).then((res) => {
      return res;
    });
  },
  put: (path, body) => {
    return ajax.put(defaultUrl + path, body, {
      headers: header
    }).then((res) => {
      return res;
    });
  }
};

export default http;
