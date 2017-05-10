import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
// import App from '@/App'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y:0}),
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            name: 'main',
            component: 'Main'
        }
    ]
})
