import { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePostlikes() {
    const [postlikes, setPostlikes] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPostlikes({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPostlikes({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/postlikes', { signal })
        // return axiosInstance.get(`postlikes`, { signal })
            .then(response => setPostlikes(response.data.data))
            .catch(() => {});
    }

    return { postlikes, getPostlikes }
}
