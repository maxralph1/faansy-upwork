import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function usePostcomment(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPostcomment(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPostcomment(user_id, post_id, body) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id, body)
        return axiosInstance.post('postcomments', {user_id, post_id, body})
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

    async function getPostcomment(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/postcomments/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updatePostcomment(postcomment) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`postcomments/${postcomment.id}/`, postcomment)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyPostcomment(postcomment) {
        return axiosInstance.delete(`postcomments/${postcomment.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        postcomment: { data, setData, errors, loading }, 
        getPostcomment, 
        createPostcomment, 
        updatePostcomment, 
        destroyPostcomment
    }
}
