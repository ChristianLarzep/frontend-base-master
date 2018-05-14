import { ApolloClient, createNetworkInterface } from 'react-apollo';

import config from '../config';

const networkInterface = createNetworkInterface({
  uri: config.graphql,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        // Create the header object if needed.
        req.options.headers = {};
      }
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface,
});

export default client;
