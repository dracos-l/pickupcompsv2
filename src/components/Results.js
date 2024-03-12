import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { calculation, results, highlights } from '../calcuation/calculateSimilarity';

function Results() {
    const location = useLocation();
    const formData = location.state.formData;

    const [similarityScores, setSimilarityScores] = useState({});
    const [topResults, setTopResults] = useState([]);
    const [highlightResult, setHighlightResult] = useState({});

    useEffect(() => {
        const fetchDataAndCalculate = async () => {
            if (formData) {
                const similarityDic = await calculation(formData); // Ensure this is awaited
                const topResultsDic = results(similarityDic);
                const highlight = highlights(similarityDic);
    
                setSimilarityScores(similarityDic);
                setTopResults(Object.entries(topResultsDic).map(([key, value]) => `${key}: ${value}`));
                setHighlightResult(highlight);
            }
        };
    
        fetchDataAndCalculate();
    }, [formData]);

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
