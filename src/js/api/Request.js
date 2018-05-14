import request from 'superagent';

import config from '../config';

let token;

function auth() {
  if (token) {
    this.set('Authorization', `Bearer ${token}`);
  }
}

function handleError(body) {
  const { path, code, data } = body.error;
  let { message } = body.error;

  if (typeof message !== 'string') {
    message = String(message);
  }

  return {
    code,
    path,
    message,
    data,
    type: body.type,
  };
}

function connection(type, endpoint, data) {
  const { attach, headers, ...others } = data || {};
  const params = { ...others };
  console.log('muere');
  const req = request(type, config.apiHost + endpoint);

  Object.keys(params).forEach(key => params[key] === null && delete params[key]);

  req
    .set('Accept', 'application/json')
    .use(auth.bind(req))
    .query({
      no_cache: new Date().getTime(),
    });

  if (attach) {
    const attachs = [].concat(attach);
    for (let i = 0; i < attachs.length; i += 1) {
      req.attach(attachs[i].name, attachs[i].file);
    }
    Object.keys(params).forEach(key => req.field(key, params[key]));
  } else if (type === 'GET') {
    req.query(params);
  } else {
    req.send(params);
  }

  return new Promise((resolve, reject) => {
    req.end((err, res) => {
      if (err) {
        reject(err);
      } else {
        const { body } = res;

        if (body && body.error) {
          reject(handleError(body));
        } else if (res.body) {
          resolve(res.body);
        } else if (res.text) {
          resolve({
            text: res.text,
          });
        }
      }
    });
  });
}

const Request = {
  setToken(t) {
    token = t;
  },

  post(endpoint, data) {
    return connection('POST', endpoint, data);
  },

  put(endpoint, data) {
    return connection('PUT', endpoint, data);
  },

  get(endpoint, data) {
    return connection('GET', endpoint, data);
  },

  del(endpoint, data) {
    return connection('DELETE', endpoint, data);
  },
};

export default Request;
