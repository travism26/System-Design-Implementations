import axios from 'axios';

// This is a helper function that will create an axios client with
// some default options that are customized to our ingress-nginx
// setup.
export default ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // requests can be made with a base url of ''
    return axios.create({
      baseURL: '/',
    });
  }
};
