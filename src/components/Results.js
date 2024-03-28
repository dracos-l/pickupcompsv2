import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { calculation, results, highlights } from '../calcuation/calculateSimilarity';

function Results() {
    // Removed useLocation since we're now using localStorage
    const [similarityScores, setSimilarityScores] = useState({});
    const [topResults, setTopResults] = useState([]);
    const [highlightResult, setHighlightResult] = useState({});

    useEffect(() => {
        const fetchDataAndCalculate = async () => {
            const storedFormData = JSON.parse(localStorage.getItem('formData'));
            if (storedFormData) {
                // Directly use storedFormData if calculation can handle the format
                // Or transform it here before passing
                const similarityDic = await calculation(storedFormData); 
                const topResultsDic = results(similarityDic);
                const highlight = highlights(similarityDic);
    
                setSimilarityScores(similarityDic);
                setTopResults(Object.entries(topResultsDic).map(([key, value]) => `${key}: ${value}`));
                setHighlightResult(highlight);
            }
        };
    
        fetchDataAndCalculate();
    }, []); // Dependency array is empty to only run once on mount

    return (
        <div className="results">
            <h1>Results</h1>
            <h2>Top Matches</h2>
            {topResults.map((result, index) => (
                <div key={index}>
                    <p>{result}</p>
                </div>
            ))}
            <h2>Highlight: {highlightResult.Name}</h2>
            <div>
                <p>Offensive Similarity: {highlightResult.Offense_value}</p>
                <p>Defensive Similarity: {highlightResult.Defense_value}</p>
                <p>Most Similar Stat: {highlightResult.Most_similar_value}</p>
                <p>Least Similar Stat: {highlightResult.Least_similar_value}</p>
            </div>
        </div>
    );
    
}

export default Results;
