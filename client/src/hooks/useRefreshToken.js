import axios from "axios";

const useRefreshToken = () => {
    const refresh = async () => {
        axios.get("httpt://localhost:5000/refresh", { withCredentials: true }).then((response) => {
            console.log(response.data.accessToken);
            return response.data.accessToken;
        }).catch((error) => {
            console.log(error.message);
        })
    }
    
    return refresh;
}

export default useRefreshToken;