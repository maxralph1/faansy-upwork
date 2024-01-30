import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getSubscriptions({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getSubscriptions({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/subscriptions`, { signal })
        // return axiosInstance.get(`subscriptions`, { signal })
            .then(response => setSubscriptions(response.data.data))
            .catch(() => {});
    }

    return { subscriptions, getSubscriptions }
}
