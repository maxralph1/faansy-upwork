import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useNotifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getNotifications({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getNotifications({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/notifications`, { signal })
        // return axiosInstance.get(`notifications`, { signal })
            .then(response => setNotifications(response.data))
            .catch((error) => {console.log(error)});
    }

    return { notifications, getNotifications }
}
