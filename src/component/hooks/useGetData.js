import { useState } from 'react';

const useGetData=()=> {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, dataBody) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataBody),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return { data, loading, error, fetchData, getData };
}

export default useGetData;



//fetchData();