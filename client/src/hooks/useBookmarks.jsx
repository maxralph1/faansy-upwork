import { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getBookmarks({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getBookmarks({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/bookmarks', { signal })
        // return axiosInstance.get(`bookmarks`, { signal })
            .then(response => setBookmarks(response.data.data))
            .catch(() => {});
    }

    return { bookmarks, getBookmarks }
}
