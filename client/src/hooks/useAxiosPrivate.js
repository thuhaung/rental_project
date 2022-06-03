import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import useRefreshToken from "../hooks/useRefreshToken";

const useAxiosPrivate = () => {
    const cookies = new Cookies();
    const refresh = useRefreshToken();
    const isAuth = cookies.get("auth") ? true : false;

    const axiosPrivate = axios.create({
        baseURL: "http://localhost:5000",
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    });

    useEffect(() => {
        const responseInterceptor = axiosPrivate.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const originalConfig = error.config;
            if (error.response) {
                if (error.response.status === 403 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await axios.post("http://localhost:5000/refresh", { refreshToken: localStorage.getItem("refreshToken") });
                        cookies.set("accessToken", rs.data.accessToken);
                        console.log(cookies.get("accessToken"));
                        return axiosPrivate(originalConfig);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
            }

            return Promise.reject(error);
        });

        /*
        axiosPrivate.interceptors.response.use(response => {
            return response;
        }, error => {
            return new Promise(resolve => {
                const prevRequest = error.config;
                if (error.response.status === 401 && !prevRequest._retry) {
                    axios.get("httpt://localhost:5000/refresh", { withCredentials: true }).then((response) => {
                        prevRequest._retry = true;
                        console.log(response.data.accessToken);
                        return response.data.accessToken;
                    }).catch((error) => {
                        console.log(error.message);
                    })
                }
            },)
            
            return Promise.reject(error);
        })*/

        axios.interceptors.request.eject(responseInterceptor);
        
    }, [isAuth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;