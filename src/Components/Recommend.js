import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recommend({ selectedItems }) {
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedItems.length >= 2) {
            getRecommendation();
        } else {
            setRecommendation('');
        }
    }, [selectedItems]);

    const getRecommendation = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that recommends movies and TV shows."
                    },
                    {
                        role: "user",
                        content: `Based on these titles: ${selectedItems.map(item => item.title).join(', ')}, can you recommend a movie or TV show that I might enjoy? Please just give the title and a very brief explanation.`
                    }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            setRecommendation(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching recommendation:', error);
            setRecommendation('Sorry, there was an error getting a recommendation.');
        }
        setLoading(false);
    };

    return (
        <div className="recommendation">
            <h3>Recommendation</h3>
            {loading ? (
                <p>Loading recommendation...</p>
            ) : selectedItems.length < 2 ? (
                <p>Select at least 2 items to get a recommendation.</p>
            ) : recommendation ? (
                <p>{recommendation}</p>
            ) : (
                <p>Getting recommendation...</p>
            )}
        </div>
    );
}

export default Recommend;