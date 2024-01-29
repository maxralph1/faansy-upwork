import { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePostcomments() {
    const [postcomments, setPostcomments] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPostcomments({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPostcomments({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/postcomments', { signal })
        // return axiosInstance.get(`postcomments`, { signal })
            .then(response => setPostcomments(response.data.data))
            .catch(() => {});
    }

    return { postcomments, getPostcomments }
}
