import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function usePostlike(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPostlike(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPostlike(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('postlikes', {user_id, post_id})
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

    async function getPostlike(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/postlikes/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updatePostlike(postlike) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`postlikes/${postlike.id}/`, postlike)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyPostlike(postlike) {
        return axiosInstance.delete(`postlikes/${postlike.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
            })
            .finally(() => setLoading(false));
    }

    return {
        postlike: { data, setData, errors, loading }, 
        getPostlike, 
        createPostlike, 
        updatePostlike, 
        destroyPostlike
    }
}
