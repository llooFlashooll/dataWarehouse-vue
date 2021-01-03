import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import Login from "@/views/Login";
import Home from "@/views/Home"
import Condition from "@/views/Condition";
import Neo4j from "@/views/Neo4j";
import Statistic from "@/views/Statistic";
import Cooperation from "@/views/Cooperation";
import TopCooperation from "@/views/TopCooperation";
import SameSeriesMovie from "@/views/SameSeriesMovie";
import MovieProduct from "@/views/MovieProduct";
import Hive from "@/views/Hive";

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
            path: 'mysql_movieCondition',
            component: Condition,
            meta: {
                name: '电影条件查询mysql'
            }

        }, {
            path: 'hive_movieCondition',
            component: Hive,
            meta: {
                name: '电影条件查询hive'
            }
        }, {
            path: 'neo4j_movieCondition',
            component: Neo4j,
            meta: {
                name: '电影条件查询neo4j'
            }

        }, {
            path: 'movieCollection',
            component: Statistic,
            meta: {
                name: '分类查询'
            }

        }, {
            path: 'cooperation',
            component: Cooperation,
            meta: {
                name: '合作查询'
            }
        }, {
            path: 'topCooperation',
            component: TopCooperation,
            meta: {
                name: '最多合作查询'
            }
        }, {
            path: 'sameSeriesMovie',
            component: SameSeriesMovie,
            meta: {
                name: '同系列电影'
            }
        }, {
            path: 'movieProduct',
            component: MovieProduct,
            meta: {
                name: '电影产品查询'
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