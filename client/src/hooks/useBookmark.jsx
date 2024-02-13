import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useBookmark(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getBookmark(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createBookmark(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('bookmarks', {user_id, post_id})
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getBookmark(id, { signal } = {}) {
        setLoading(true);

        return axiosInstance.get(`${ Constants.serverURL }/api/bookmarks/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateBookmark(bookmark) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`bookmarks/${bookmark.id}`, bookmark)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyBookmark(bookmark) {
        return axiosInstance.delete(`bookmarks/${bookmark.id}`)
            .then(() => {})
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        bookmark: { data, setData, errors, loading }, 
        getBookmark, 
        createBookmark, 
        updateBookmark, 
        destroyBookmark
    }
}
