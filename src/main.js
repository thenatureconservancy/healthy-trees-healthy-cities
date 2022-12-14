import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import './registerServiceWorker';

const app = createApp(App);
app.use(store);
app.use(Quasar, quasarUserOptions);
app.mount('#app');
