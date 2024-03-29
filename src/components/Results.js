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
        <div className="results-container">
            <h1 className="results-title">Results</h1>
            <div className="content-container">
                <div className="top-matches">
                    <h2>Top Matches</h2>
                    <ul className="matches-list">
                        {topResults.map((result, index) => (
                            <li key={index} className="match-item">{result}%</li>
                        ))}
                    </ul>
                </div>
                <div className="highlight-section">
                    <h2>Highlight: {highlightResult.Name}</h2>
                    <div className="highlight-details">
                        <p><strong>Offensive Similarity:</strong> {highlightResult.Offense_value}%</p>
                        <p><strong>Defensive Similarity:</strong> {highlightResult.Defense_value}%</p>
                        <p><strong>Most Similar Stat:</strong> {highlightResult.Most_similar_value}</p>
                        <p><strong>Least Similar Stat:</strong> {highlightResult.Least_similar_value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Results;
