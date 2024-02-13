import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function usePost(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    // const swalUnauthAlert = (error) => {
    //     if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
    //         swal.fire({
    //             title: 'You are not logged in!',
    //             icon: 'error',
    //             toast: true,
    //             timer: 6000,
    //             position: 'top-right',
    //             timerProgressBar: true,
    //             showConfirmButton: false,
    //         })
    //         navigate(route('login'))
    //     }
    // }

    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPost(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPost(post) {
        setLoading(true);
        setErrors({});

        console.log(post)
        return axiosInstance.postForm('posts', post)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                // swalUnauthAlert(error);
                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getPost(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/posts/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updatePost(post) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`posts/${post.id}/`, post)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyPost(post) {
        return axiosInstance.delete(`posts/${post.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        post: { data, setData, errors, loading }, 
        getPost, 
        createPost, 
        updatePost, 
        destroyPost
    }
}
