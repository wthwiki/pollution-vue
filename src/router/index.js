import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from '@/store';
import storage from '@/utils/storage';
import { toRaw } from "@vue/reactivity";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import(
                    /* webpackChunkName: "dashboard" */
                    "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '企业排污信息'
                },
                component: () => import(
                    /* webpackChunkName: "table" */
                    "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import(
                    /* webpackChunkName: "charts" */
                    "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单提交'
                },
                component: () => import(
                    /* webpackChunkName: "form" */
                    "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '相关通知'
                },
                component: () => import(
                    /* webpackChunkName: "tabs" */
                    "../views/Tabs.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import(
                    /* webpackChunkName: "permission" */
                    "../views/Permission.vue")
            },{
                path: "/upload",
                name: "upload",
                meta: {
                    title: '文件上传'
                },
                component: () => import(
                    /* webpackChunkName: "upload" */
                    "../views/Upload.vue")
            },  {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import(/* webpackChunkName: "404" */
                    '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import(/* webpackChunkName: "403" */
                    '../views/403.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import(
            /* webpackChunkName: "login" */
            "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from) => {

    // if(to.name === 'login'){
    //     return true
    // }
    // //②检查是否登录，如果已经登录则放行
    // if(!store.getters.ISLOGIN){
    //     //去storage中查看,如果也没有就去登录页面
    //     if(!storage.getSessionObject("loginUser")){
    //         router.push({name:"login"})
    //     }else{
    //         store.dispatch("RECOVERY_USER");
    //         store.dispatch("GET_INFO");
    //     }
    // }
    // //③没有登陆就跳转到登录页面
    // console.log(from)
    // return true

    // if(to.path !== '/login'){
    //     next('/login');
    //     return true
    // }
    // if((!store.getters.ISLOGIN) ){
    //     if(!storage.getSessionObject("loginUser")){
    //         next();
    //         // router.push({name:"login"})
    //     }else{
    //         store.dispatch("RECOVERY_USER");
    //         store.dispatch("GET_INFO");
    //     }
    // }
    // console.log(from)
    // return true
    // console.log(to)
    document.title = `${to.meta.title} | 排污监测系统`;
    // const deptName = localStorage.getItem('ms_deptName');
    const deptName = "admin";
    // console.log(deptName)
    // console.log()
    // if(deptName && to.path !== '/login')

    // if(to.path === '/login'){
    //     next("/login")
    //     next()
    // }


    // if (!deptName && to.path !== '/login') {
    //     // if(to.path === '/403'){
    //     //     next()
    //     // }else{
    //         next("/login")
    //     // }
        
    // }else if (deptName) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     // console.log(to.meta.permission)
    //     // deptName === '/admin'
    //     // ? next() 
    //     // next()
    //     crystal.deptUser.roles[0] === 'admin'
    //         ? next()
    //         : next('/permission');
    //     console.log("shibai")
    //     // : 
    // } else {
    //     next();
    // }


    
    if(to.path === '/login'){
        return true
    }
    //②检查是否登录，如果已经登录则放行
    // if(!store.getters.ISLOGIN){
    //     //去storage中查看,如果也没有就去登录页面
    //     if(!storage.getSessionObject("loginUser")){
    //         router.push({path:"/login"})
    //     }else{
    //         store.dispatch("RECOVERY_USER");
    //         store.dispatch("GET_INFO");
            
    //     }
    // }
    
    //③没有登陆就跳转到登录页面


    
    console.log(from)
    return true


    // } else {
    //     // if (deptName && to.path !== '/login') {
    //         next('/login');

    // else {
    //     next('/403');
    // }
    // }

    // else {
    //     // console.log(store.state.role)

    //     // storage.getSessionObject("loginUser")
    //     // next();


    // }
});

export default router;