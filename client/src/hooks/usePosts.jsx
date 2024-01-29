import { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPosts({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPosts({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts', { signal })
        // return axiosInstance.get(`posts`, { signal })
            .then(response => setPosts(response.data.data))
            .catch(() => {});
    }

    return { posts, getPosts }
}
