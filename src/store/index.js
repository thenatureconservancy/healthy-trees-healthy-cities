import { createStore } from 'vuex';
import axios from 'axios';
import authStore from './modules/authStore';
import userStore from './modules/userStore';

export default createStore({
  state: {
    app: {
      defaultProject: 'My Trees',
      selectedView: '',
      appliedFilter: false,
      leftDrawerOpen: false,
    },
    user: {},
    apiUrl: 'http://hthc.us-west-2.elasticbeanstalk.com/v0/',
  },
  mutations: {
    updateDefaultProject(state, val) {
      state.app.defaultProject = val;
    },
    updateSelectedView(state, val) {
      console.log('getshere');
      state.app.selectedView = val;
    },
    updateAppliedFilter(state, bool) {
      console.log(bool);
      state.app.appliedFilter = bool;
    },
  },
  actions: {
    // api requests can be called from other stores and in components from these functions
    apiRequest(context) {},
    // a protected api requests requires an idToken from AWS cognito and can be used to query user/private info
    async protectedApiRequest(context, params) {
      console.log(`INFO: api ${params.type} request, Route:`, params.route);
      const idToken = await context.dispatch('getCurrentUserIdToken');
      if (idToken) {
        const url = context.state.apiUrl + params.route;
        const body = params.body;
        const options = {
          headers: {
            Authorization: idToken,
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
  },
  modules: {
    authStore,
    userStore,
  },
});
