import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function Dishes() {
    const { stateName } = useParams();
    const [dishes, setDishes] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/dishes/state`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ state: stateName }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDishes(data);
            } catch (error) {
                console.error('Failed to fetch dish:', error);
            }
        };

        fetchDishes();
    }, [stateName]);

    const groupDishesByCourse = () => {
        const courses = {};
        dishes.forEach(dish => {
            dish.courses.forEach(course => {
                const courseName = course.name;
                if (!courses[courseName]) {
                    courses[courseName] = [];
                }
                courses[courseName].push(dish);
            });
        });
        return courses;
    };

    const renderDishesByCourse = () => {
        const courses = groupDishesByCourse();
        return Object.entries(courses).map(([courseName, dishes]) => (
            <Card title={courseName} famousDish={dishes} />
        ));
    };

    return (
        <div className='bg-[#f7f3cd] min-h-screen'>
            <h1 className='py-12 text-2xl sm:text-4xl md:text-6xl text-center font-bold text-black'>{stateName} Dishes</h1>
            {dishes ? (dishes.length > 0 ? renderDishesByCourse() : (
                <p className='text-lg text-center'>No dish found</p>
            )) : (
                <p>Fetching...</p>
            )}
        </div >
    );
}

export default Dishes;