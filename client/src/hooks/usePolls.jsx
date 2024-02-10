import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePolls() {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPolls({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPolls({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/polls`, { signal })
        // return axiosInstance.get(`polls`, { signal })
            .then(response => setPolls(response.data.data))
            .catch(() => {});
    }

    return { polls, getPolls }
}
