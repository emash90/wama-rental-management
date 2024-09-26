import { useState, useEffect } from 'react';
import {houseAPI} from '../APIs/Apis'

const useFetchHouses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const data = await houseAPI.getHouses();
        setHouses(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  return { houses, loading, error };
};

export default useFetchHouses;
