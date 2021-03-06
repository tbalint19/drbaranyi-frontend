import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

// Components
const register = (descriptor) => {
  const name = (path) => path.split('/')[path.split('/').length - 1]
  const component = (path) => require('@/components/' + path + '.vue').default
  Vue.component(name(descriptor), component(descriptor))
}

var components = [
  'navbar-top',
  'carousel',

  'button/login-button',
  'button/logout-button',

  'loading',
  'offer-card',
]
components.forEach(register)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
