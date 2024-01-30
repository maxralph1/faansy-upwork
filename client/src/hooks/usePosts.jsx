import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
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
        return axios.get(`${ Constants.serverURL }/api/posts`, { signal })
        // return axiosInstance.get(`posts`, { signal })
            .then(response => setPosts(response.data.data))
            .catch(() => {});
    }

    return { posts, getPosts }
}
