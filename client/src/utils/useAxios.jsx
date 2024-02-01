import Constants from '@/utils/Constants.jsx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = `${ Constants.serverURL }/api`;


const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL, 
        headers: {
            'Authorization': `Bearer ${authTokens?.authorization.token}`,
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded', 
            "Content-Type": "multipart/form-data",
        },
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.authorization.token);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        const response = await axios.post(`${baseURL}/refresh`);
        // console.log(response.data)

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.authorization.token));

        // Update user's last seen here
        // await ...

        req.headers.Authorization = `Bearer ${response.data.authorization.token}`;
        return req;
    });

    return axiosInstance;
}

export default useAxios;