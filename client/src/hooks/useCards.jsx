import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useCards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getCards({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getCards({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/cards`, { signal })
        // return axiosInstance.get(`cards`, { signal })
            .then(response => setCards(response.data.data))
            .catch(() => {});
    }

    return { cards, getCards }
}
