import { createApp } from "vue";
import App from "./App.vue";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/message-box/style/css"

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

import { setupStore } from "~/store";
import { setupRouter } from '~/router';
import { setupGlobalComponents } from "~/components";
import { setupDirectives } from '~/directive';


const app = createApp(App);
setupStore(app);
setupRouter(app);
setupGlobalComponents(app);
setupDirectives(app);
app.mount("#app");
