import axios from 'axios';
const state = () => ({
  apiUrl: 'https://hthc.us-west-2.elasticbeanstalk.com/v0/',
});

const getters = {};

const mutations = {};

const actions = {
  // api requests can be called from other stores and in components from these functions
  apiRequest(context) {},
  // a protected api requests requires an idToken from AWS cognito and can be used to query user/private info
  async protectedApiRequest(context, params) {
    console.log(
      `INFO: protected api ${params.type} request, Route:`,
      params.route
    );
    const session = await context.dispatch('getCurrentUserSession');
    if (!session) {
      console.log('could not retrieve monitoring token...');
      // probably redirect to login or let user know to login
      return;
    }
    console.log(session);
    const url = context.state.apiUrl + params.route;
    console.log('API URL:', url);
    const body = params.body;
    const options = {
      headers: {
        Authorization: session.idToken.jwtToken,
      },
    };
    console.log('Options:', options);
    if (params.type === 'GET') {
      try {
        const response = await axios.get(url, options);
        return response;
      } catch (error) {
        console.log('ERROR**:', error);
      }
    }
    if (params.type === 'POST') {
      try {
        const response = await axios.post(url, body, options);
        return response;
      } catch (error) {
        console.log('ERROR**:', error);
      }
    }
    if (params.type === 'PUT') {
      const response = await axios.put(url, body, options);
      return response;
    }
    if (params.type === 'DELETE') {
      const response = await axios.delete(url, options);
      return response;
    }
  },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
