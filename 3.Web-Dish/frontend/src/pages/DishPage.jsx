import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import DishInfoComponent from '../components/DishPage/DishInfoComponent';
import DishCookComponent from '../components/DishPage/DishCookComponent';

export default function DishPage() {
    const { dishName } = useParams();
    const [dish, setDish] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/dish`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ dish_name: dishName }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDish(data);
            } catch (error) {
                console.error('Failed to fetch dish:', error);
                setNotFound(true);
            }
        };

        fetchDish();
    }, [dishName]);

    const [startCooking, setStartCooking] = useState(false);
    const [people, setPeople] = useState(1);

    return (
        <div>
            {notFound ? (
                <NotFound />
            ) : dish ? (
                !startCooking ? (
                    <DishInfoComponent
                        dish={dish}
                        setStartCooking={setStartCooking}
                        people={people}
                        setPeople={setPeople}
                    />
                ) : (
                    <DishCookComponent
                        dish={dish}
                        people={people}
                    />
                )
            ) : (
                <p>Fetching...</p>
            )}
        </div >
    );
}