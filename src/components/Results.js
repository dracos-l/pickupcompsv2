import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculation, results, highlights } from '../calcuation/calculateSimilarity';
import * as d3 from 'd3'; // Make sure to import d3 like this


function CoordinatePlane({ data }) {
    const width = 800;
    const height = 800;
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
                   .attr('fill', '#0056b3') // Lighter fill color
                   .style('stroke', 'grey') // Initial lighter stroke
                   .style('stroke-width', '1px') // Initial thin stroke width
                   .on('mouseover', function (d, i) {
                       d3.select(this)
                         .attr('fill', '#e74c3c') // Highlight color on hover
                         .style('stroke', 'black') // Darker stroke on hover
                         .style('stroke-width', '2px'); // Thicker stroke on hover
                   })
                   .on('mouseout', function (d, i) {
                       d3.select(this)
                         .attr('fill', '#0056b3') // Revert fill color
                         .style('stroke', 'grey') // Revert stroke color
                         .style('stroke-width', '1px') // Revert stroke width
                   });

        // Append title for tooltip
        circles.append('title')
            .text(d => 
                `Player: ${d.name}\n` +
                `Similarity Score: ${d['Similarity Score'] ? d['Similarity Score'].toFixed(2) : 'N/A'}\n` +
                `Similarity Score Rank: ${d['Similarity Score_rank'] || 'N/A'}\n` +
                `Offense: ${d.Offense ? d.Offense.toFixed(2) : 'N/A'}\n` +
                `Offense Rank: ${d.Offense_rank || 'N/A'}\n` +
                `Defense: ${d.Defense ? d.Defense.toFixed(2) : 'N/A'}\n` +
                `Defense Rank: ${d.Defense_rank || 'N/A'}\n` 
            );
                // + `Scoring: ${d.Scoring ? d.Scoring.toFixed(2) : 'N/A'}\n` +
                //`Scoring Rank: ${d.Scoring_rank || 'N/A'}\n` +
                //`Playmaking: ${d.Playmaking ? d.Playmaking.toFixed(2) : 'N/A'}\n` +
                //`Playmaking Rank: ${d.Playmaking_rank || 'N/A'}\n` +
                //`Offensive Rebounding: ${d['Offensive Rebounding'] ? d['Offensive Rebounding'].toFixed(2) : 'N/A'}\n` +
                //`Offensive Rebounding Rank: ${d['Offensive Rebounding_rank'] || 'N/A'}\n` +
                //`Paint Defense: ${d['Paint Defense'] ? d['Paint Defense'].toFixed(2) : 'N/A'}\n` +
                //`Paint Defense Rank: ${d['Paint Defense_rank'] || 'N/A'}\n` +
                //`Perimeter Defense: ${d['Perimeter Defense'] ? d['Perimeter Defense'].toFixed(2) : 'N/A'}\n` +
                //`Perimeter Defense Rank: ${d['Perimeter Defense_rank'] || 'N/A'}\n` +
                //`Defensive Rebounding: ${d['Defensive Rebounding'] ? d['Defensive Rebounding'].toFixed(2) : 'N/A'}\n` +
                //`Defensive Rebounding Rank: ${d['Defensive Rebounding_rank'] || 'N/A'}`

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
                createCoordinatePlane(similarityDic); // Use the full similarityDic
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
        // Processing data to include all properties for the tooltip
        const processedData = Object.keys(similarityDic).map(name => ({
            name: name,
            ...similarityDic[name], // Spread operator to include all properties
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
                        <p><strong>Offensive Similarity:</strong> ({highlightResult.Offense_value}%, {highlightResult.Offense_rank}th)</p>
                        <p><strong>Defensive Similarity:</strong> ({highlightResult.Defense_value}%, {highlightResult.Defense_rank}th)</p>
                        <p><strong>Most Similar Stat:</strong> {highlightResult.Most_similar_value}</p>
                        <p><strong>Least Similar Stat:</strong> {highlightResult.Least_similar_value}</p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <hr className="section-divider" /> 
                    <br />
                    <h2>Additional Information: {highlightResult.Name}, </h2>
                        <p className="additional-info"> 
                            When looking at offense, {highlightResult.Name}'s scoring game was {highlightResult.Scoring}% similar and the {highlightResult.Scoring_rank}th most similar overall to yours.
                            Playmaking was {highlightResult.Playmaking}% similar and the {highlightResult.Playmaking_rank}th most similar overall. Lastly, offensive rebounding was {highlightResult['Offensive Rebounding']}% similar and the {highlightResult['Offensive Rebounding_rank']}th most similar overall. 
                            On to your defense, {highlightResult.Name}'s paint defense was {highlightResult['Paint Defense']}% similar and the {highlightResult['Paint Defense_rank']}th most similar overall to yours.
                            Perimeter defense was {highlightResult['Perimeter Defense']}% similar and the {highlightResult['Perimeter Defense_rank']}th most similar overall.
                            And finally, defensive rebounding was {highlightResult['Defensive Rebounding']}% similar and the {highlightResult['Defensive Rebounding_rank']}th similar overall. 
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
