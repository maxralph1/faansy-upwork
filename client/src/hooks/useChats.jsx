import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useChats(page = 1) {
    const axiosInstance = useAxios();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getChats({ signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getChats({ signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/chats`, { signal })
        return axiosInstance.get(`chats?page=${page}`, { signal })
            .then(response => {
                setChats(response.data);
                console.log(response);
            })
            .catch((error) => {console.log(error)});
    }

    return { chats, getChats }
}
