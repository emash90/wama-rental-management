import { useState, useEffect } from 'react';
import {paymentAPI} from '../APIs/Apis'

const useFetchPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentAPI.getPayments();
        setPayments(data);
    } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
    }
};

fetchPayments();
}, []);

  return { payments, loading, error };
};

export default useFetchPayments;
