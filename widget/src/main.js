import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(router)
app.use(VueAxios, axios)
new WaveUI(app, {
  // Some Wave UI options.
})

app.mount("#app");
