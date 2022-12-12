import { createStore } from 'vuex';
import axios from 'axios';
import authStore from './modules/authStore';
import userStore from './modules/userStore';
import apiAccessStore from './modules/apiAccessStore';

export default createStore({
  state: {
    app: {
      defaultProject: 'My Trees',
      selectedView: '',
      appliedFilter: false,
      leftDrawer: { open: false, content: '', width: 310 },
      screenWidth: '',
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
    updateLeftDrawer(state, obj) {
      //obj = {open: bool, content: string};
      console.log(obj);
      state.app.leftDrawer = obj;
    },
    updateScreenWidth(state, int) {
      console.log(int);
      state.app.screenWidth = int;
    },
  },
  actions: {},
  modules: {
    authStore,
    userStore,
    apiAccessStore,
  },
});
