import { createStore } from 'vuex';

export default createStore({
  state: {
    app: { defaultProject: 'My Trees', selectedView: '' },
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
  },
  actions: {},
  modules: {},
});
