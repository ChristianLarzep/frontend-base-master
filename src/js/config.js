export default {
  title: 'Frontend',
  port: process.env.PORT || 4000,
  apiHost: window.apiHost || process.env.API_HOST || 'http://localhost:3000/',
  graphql: window.graphql || `${process.env.API_HOST}graphql`,
};
