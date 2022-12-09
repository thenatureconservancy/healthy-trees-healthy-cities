import { createStore } from 'vuex';
import userAuthStore from './modules/userAuthStore';

export default createStore({
  state: {
    app: {
      defaultProject: 'My Trees',
      selectedView: '',
      appliedFilter: false,
      leftDrawerOpen: false,
    },
    user: {},
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
  actions: {},
  modules: {
    userAuthStore,
  },
});
