import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculation, results, highlights } from '../calcuation/calculateSimilarity';
import * as d3 from 'd3'; // Make sure to import d3 like this


function CoordinatePlane({ data }) {
    const width = 600;
    const height = 600;
    const padding = 50;

    // Scales adjusted to ensure axes meet at (0,0)
    const xScale = d3.scaleLinear()
        .domain([0, 1]) // Assuming 100 is the max value for Offense and Defense
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height - padding, padding]);

    useEffect(() => {
        const svg = d3.select('.coordinate-plane-svg')
                      .attr('width', width)
                      .attr('height', height);

        // X and Y Axis
        svg.append('g')
           .attr('transform', `translate(0,${height - padding})`)
           .call(d3.axisBottom(xScale));

        svg.append('g')
           .attr('transform', `translate(${padding},0)`)
           .call(d3.axisLeft(yScale));

        // Data points with title for hover tooltip
        const circles = svg.selectAll('circle')
                           .data(data)
                           .enter()
                           .append('circle')
                           .attr('cx', d => xScale(d.Offense))
                           .attr('cy', d => yScale(d.Defense))
                           .attr('r', 5)
                           .attr('fill', 'blue');

        // Append title for tooltip
        circles.append('title')
               .text(d => `Player: ${d.name}`);

        svg.append("text")             
            .attr("transform", `translate(${width / 2}, ${height - 10})`) // Positioning the x-axis label
            .style("text-anchor", "middle") // Center the text
            .text("Offense");

        svg.append("text")
            .attr("transform", "rotate(-90)") // Rotating text for y-axis
            .attr("y", 0) // Positioning the y-axis label
            .attr("x", 10 - (height / 2))
            .attr("dy", "1em") // Offset to position correctly
            .style("text-anchor", "middle") // Center the text
            .text("Defense");

    }, [data]);

    return (
        <svg className="coordinate-plane-svg" />
    );
}



function Results() {
    // Removed useLocation since we're now using localStorage
    const [similarityScores, setSimilarityScores] = useState({});
    const [topResults, setTopResults] = useState([]);
    const [highlightResult, setHighlightResult] = useState({});
    const [playerData, setPlayerData] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataAndCalculate = async () => {
            const storedFormData = JSON.parse(localStorage.getItem('formData'));
            if (storedFormData) {
                // Directly use storedFormData if calculation can handle the format
                // Or transform it here before passing
                const similarityDic = await calculation(storedFormData); 
                const topResultsDic = results(similarityDic);
                const highlight = highlights(similarityDic);
    
                createCoordinatePlane(similarityDic);
                setSimilarityScores(similarityDic);
                setTopResults(Object.entries(topResultsDic).map(([key, value]) => `${key}: ${value}`));
                setHighlightResult(highlight);
            }
        };

    
        fetchDataAndCalculate();
    }, []); // Dependency array is empty to only run once on mount

    function createCoordinatePlane(similarityDic) {
        const processedData = Object.keys(similarityDic).map(name => ({
            name: name,
            Offense: parseFloat(similarityDic[name].Offense), // Ensure this value is a float
            Defense: parseFloat(similarityDic[name].Defense) // Ensure this value is a float
        }));
        setPlayerData(processedData);
    }

    const handleEditClick = () => {
        setIsVisible(false);

        setTimeout(() => {
            navigate(`/Edit`);
        }, 500);  
    }

    return (
        <div className={isVisible ? 'visible' : 'hidden'}>
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
                    <br />
                    <br />
                    <br />
                    <hr className="section-divider" /> 
                    <br />
                    <br />
                    <br />
                    <h2>Additional Information: {highlightResult.Name}, </h2>
                        <p className="additional-info"> 
                            When look offense, your scoring game was {highlightResult.Scoring}%, playmaking was {highlightResult.Playmaking}%, and offensive rebounding was {highlightResult['Offensive Rebounding']}%. 
                            On to your defense, your paint defense was {highlightResult['Paint Defense']}%, perimeter defense was {highlightResult['Perimeter Defense']}%, and defensive rebounding was {highlightResult['Defensive Rebounding']}%. 
                            Overall, we calculated that you were {highlightResult['Similarity Score']}% similar to {highlightResult.Name}.
                        </p>        
                </div>
            </div>
            <div className={isVisible ? 'visible' : 'hidden'}>
            <div className="data-container">
                <h1 className="data-title">Player Offensive and Defensive Percent Differences</h1>
                {/* Coordinate Plane Visualization */}
                <CoordinatePlane data={playerData} />
                
            </div>
            </div>
            <div className="editButton">
                    <button onClick={handleEditClick}>Edit</button>
            </div>
        </div>
        </div>
    );
    
}

export default Results;
