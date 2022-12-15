import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CustomerRequestConfig } from "./types"

export const createAxiosByinterceptors = (
    config?: CustomerRequestConfig
): AxiosInstance => {
    const instance = axios.create({
        timeout: 1000,    //超时配置
        withCredentials: true,  //跨域携带cookie
        ...config,   // 自定义配置覆盖基本配置
    });

    // 添加请求拦截器
    instance.interceptors.request.use(
        function (config: any) {
            // 在发送请求之前做些什么
            console.log("config:", config);
            // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
            return config;
        },
        function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        }
    );


    // 添加响应拦截器
    instance.interceptors.response.use(
        function (response) {
            // 对响应数据做点什么
            console.log("response:", response);
            const { code, data, message } = response.data;
            if (code === 200) return data;
            else if (code === 401) {
                if(config?.loginUrl){
                    window.location.href = `${config?.loginUrl}?redirect=${encodeURIComponent(window.location.href)}`
                }
                return Promise.resolve(response.data);
            } else {
                // Message.error(message);
                return Promise.reject(response.data);
            }
        },
        function (error) {
            // 对响应错误做点什么
            console.log("error-response:", error.response);
            console.log("error-config:", error.config);
            console.log("error-request:", error.request);
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = `${config?.loginUrl}?redirect=${encodeURIComponent(window.location.href)}`
                }   
                return Promise.reject(error);
            }
            // Message.error(error?.response?.data?.message || "服务端异常");
            return Promise.reject(error);
        }
    );
    return instance;
};


export interface requestType {
    name: string
}

const request = (parms: requestType) => {

}


export default request;