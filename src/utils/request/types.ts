import { AxiosRequestConfig } from "axios";
export interface CustomerRequestConfig extends AxiosRequestConfig {
    /**
     * 登录链接地址
     */
    loginUrl?:string; 
    /**
     * token 的唯一表示key
     */
    tokenKey?:string;
}   