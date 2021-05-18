import router from './router'

//前置路由 防止未登录访问权限页面

//路由判断登录 根据路由配置文件的参数判断
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requireAuth)) { //判断该路由是否需要登录权限
        const token = localStorage.getItem("token")
        if (token) {
            if (to.path === '/login') {

            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})