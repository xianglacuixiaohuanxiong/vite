import { createApp } from 'vue'
import App from './App.vue'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './index.css'

const app = createApp(App)
//  引入element组件
app.use(ElementUI);

app.mount('#app')
