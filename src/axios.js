import axios from 'axios'
import ElementUI from 'element-ui';
import router from './router'


axios.defaults.baseURL = "http://localhost:8081"

//axios前置拦截
axios.interceptors.request.use(config => {
    return config
})

//axios后置拦截
axios.interceptors.response.use(response => {
        let res = response.data

        if (res.code == 200) {
            //如果状态码为200 放行
            return response
        } else {
            ElementUI.Message.error({
                message: '密码不正确',
                center: true,
            });
            //状态码不为200 阻止放行
            return Promise.reject(response.data.msg)
        }
    },
    //其他error状态码处理
    error => {
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status === 401) {
            //清空store
            store.commit("REMOVE_INFO")
            //跳转到登录页面
            router.push("/login")
        }
        ElementUI.Message.error({
            message: error.message,
            center: true,
        });
        return Promise.reject(error)
    }
)