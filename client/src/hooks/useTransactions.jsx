import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getTransactions({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getTransactions({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/transactions`, { signal })
        // return axiosInstance.get(`transactions`, { signal })
            .then(response => setTransactions(response.data.data))
            .catch(() => {});
    }

    return { transactions, getTransactions }
}
