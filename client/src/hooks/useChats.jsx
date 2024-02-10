import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useChats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getChats({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getChats({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/chats`, { signal })
        // return axiosInstance.get(`chats`, { signal })
            .then(response => setChats(response.data.data))
            .catch(() => {});
    }

    return { chats, getChats }
}
