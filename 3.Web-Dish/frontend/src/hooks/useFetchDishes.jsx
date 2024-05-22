import { useState, useEffect } from 'react';

const useFetchDishes = () => {
    const [loading, setLoading] = useState(true);
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/dishes`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDishes(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    return { loading, dishes, error };
};

export default useFetchDishes;
