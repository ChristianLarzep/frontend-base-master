import Request from './Request';

const { post, get } = Request;
export default {
  login({ email, password }) {
    return post('api/v1/login', { email, password });
  },

  logout() {
    const resp = get('api/v1/logout');
    Request.setToken(null);

    return resp;
  },
};
