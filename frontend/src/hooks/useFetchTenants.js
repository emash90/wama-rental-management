import { useState, useEffect } from 'react';
import {tenantAPI} from '../APIs/Apis'

const useFetchTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await tenantAPI.getTenants();
        setTenants(data);
        console.log("tenants  =>", data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  return { tenants, loading, error };
};

export default useFetchTenants;
