// client/src/components/RecipeRecommender.jsx

import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/usePrivate';

const RecipeRecommender = () => {
    const [ingredients, setIngredients] = useState('');
    const [spiceLevel, setSpiceLevel] = useState('Mild');
    const [cuisineType, setCuisineType] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const axiosPrivateInstance = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivateInstance.post('auth/recommendation/', {
                ingredients,
                spice_level: spiceLevel,
                cuisine_type: cuisineType
            });
            setRecommendations(response.data);
            console.log("here", response)
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        if (recommendations.length > 0) {
            console.log('Recommendations updated:', recommendations);
        }
    }, [recommendations]);

    return (
        <div className="container">
            <h1>Welcome to our Konda's Recipe Recommendation System!</h1>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="form-group">
                    <label htmlFor="ingredients">Please enter the ingredients you have in your kitchen:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ingredients"
                        name="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="spice_level">Preferred Spice Level:</label>
                    <select
                        className="form-control"
                        id="spice_level"
                        name="spice_level"
                        value={spiceLevel}
                        onChange={(e) => setSpiceLevel(e.target.value)}
                    >
                        <option value="Mild">Mild</option>
                        <option value="Medium">Medium</option>
                        <option value="Hot">Hot</option>
                        <option value="Very Hot">Very Hot</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cuisine_type">Cuisine Type:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cuisine_type"
                        name="cuisine_type"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        list="cuisine-suggestions"
                    />
                    <datalist id="cuisine-suggestions">
                        <option value="Italian" />
                        <option value="Chinese" />
                        <option value="Indian" />
                        <option value="Mexican" />
                        <option value="Japanese" />
                        <option value="Thai" />
                        <option value="Vietnamese" />
                        <option value="Korean" />
                        {/* Add more suggestions here */}
                    </datalist>
                </div>
                <button method="POST" type="submit" className="btn btn-primary">
                    Get Recommendations
                </button>
            </form>
            {recommendations.length > 0 && (
                <div>
                    <h2>Recommendations:</h2>
                    <ul className="list-group">
                        {recommendations.map((rec) => (
                            <li key={rec.id} className="list-group-item">
                                <strong>Recipe:</strong> {rec.recipe}<br />
                                <strong>Ingredients:</strong> {rec.ingredients}<br />
                                <strong>Cuisine:</strong> {rec.cuisine_type}<br />
                                <strong>User Review:</strong> {rec.user_review}<br />
                                <strong>URL:</strong>{' '}
                                <a href={rec.url} target="_blank" rel="noopener noreferrer">
                                    View Recipe
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeRecommender;