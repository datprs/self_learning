require('./bootstrap');

window.Vue = require('vue').default;

import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import excel from 'vue-excel-export';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import LazyYoutube from 'vue-lazytube'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

//Routes
import router from './router';
import Vue from 'vue';
import auth from './services/auth';
import role from './services/role';
import App from './App.vue';

Vue.use(LazyYoutube);
Vue.use(excel)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSweetalert2)
Vue.use(VueBreadcrumbs, {
    template:
        '<section class=content-header>\n' +
        '    <div class="container-fluid">\n' +
        '        <div class="row mb-2">\n' +
        '            <div class="col-sm-6" v-if="$breadcrumbs.length">\n' +
        '                <h1 class="m-0" v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb && key == $breadcrumbs.length-1" :key="key" >{{getBreadcrumb(crumb.meta.breadcrumb)}}</h1>\n' +
        '            </div>\n' +
        '            <div v-if="$breadcrumbs.length" class="col-sm-6">\n' +
        '                <ol class="breadcrumb float-sm-right" v-if="$breadcrumbs.length>=3">\n' +
        '                    <li v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb && key >= 1" :key="key" class="breadcrumb-item">\n' +
        '                        <router-link :to="{ path: getPath(crumb) }">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>' +
        '                    </li>\n' +
        '                </ol>\n' +
        '                <ol class="breadcrumb float-sm-right" v-else>\n' +
        '                    <li v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key" class="breadcrumb-item">\n' +
        '                        <router-link :to="{ path: getPath(crumb) }">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>' +
        '                    </li>\n' +
        '                </ol>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>'
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 */

Vue.component('app-header', require('./components/Header.vue').default);
Vue.component('app-footer', require('./components/Footer.vue').default);
Vue.component('admin-header', require('./components/AdminHeader.vue').default);
Vue.component('admin-footer', require('./components/AdminFooter.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    store,
    auth,
    role,
    render: h => h(App)
}).$mount('#app')
