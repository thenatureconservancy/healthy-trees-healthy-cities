import axios from 'axios';
const state = () => ({
  apiUrl: 'http://hthc.us-west-2.elasticbeanstalk.com/v0/',
});

const getters = {};

const mutations = {};

const actions = {
  // api requests can be called from other stores and in components from these functions
  apiRequest(context) {},
  // a protected api requests requires an idToken from AWS cognito and can be used to query user/private info
  async protectedApiRequest(context, params) {
    console.log(`INFO: api ${params.type} request, Route:`, params.route);
    const session = await context.dispatch('getCurrentUserSession');
    console.log(session);
    if (session) {
      const url = context.state.apiUrl + params.route;
      const body = params.body;
      const options = {
        headers: {
          Authorization: session.idToken.jwtToken,
        },
      };
      if (params.type === 'GET') {
        const response = await axios.get(url, options);
        return response;
      }
      if (params.type === 'POST') {
        const response = await axios.post(url, body, options);
        return response;
      }
      if (params.type === 'PUT') {
        const response = await axios.put(url, body, options);
        return response;
      }
      if (params.type === 'DELETE') {
        const response = await axios.delete(url, options);
        return response;
      }
    } else {
      console.log('could not retrieve monitoring token...');
    }
  },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
