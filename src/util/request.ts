import axios from "axios";
import {ElMessage} from "element-plus";

const request=axios.create({
    baseURL:import.meta.env.VITE_URL
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const user=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")+""):{}
    if (user&&config.headers!=undefined)
        config.headers['token']=user.userName+":"+user.password
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let resp=response.data
    if(resp.code==200){//成功
        return resp
    }else {//失败
        ElMessage.error(resp.message)

        if (resp.code==401)
            localStorage.clear()
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error("请求出错，错误代码（"+error+"）")
    console.log(error)
    return Promise.reject(error);
});

export default request