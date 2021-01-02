import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import Login from "@/views/Login";
import Home from "@/views/Home"
import User from "@/views/User";


Vue.use(Router)


const routes = [{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: '主页',
            name: '首页'
        },

        children: [{
            path: '/user',
            component: User,
            meta: {
                name: '用户信息'
            }

        }]

    }

]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router