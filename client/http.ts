import axios, { AxiosRequestConfig } from "axios";

export class HttpRequest {
    constructor() {
        
    }

    async get(url: string, config?: AxiosRequestConfig) {
        return axios.get(url, config);
    }

    async post(url: string, body: any, config?: AxiosRequestConfig) {
        return axios.post(url, body, config);
    }

    async put(url: string, body: any, config?: AxiosRequestConfig) {
        return axios.put(url, body, config);
    }

    async delete(url: string, config?: AxiosRequestConfig) {
        return axios.delete(url, config);
    }
}