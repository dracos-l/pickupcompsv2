import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculation, results, highlights } from '../calcuation/calculateSimilarity';
import * as d3 from 'd3'; // Make sure to import d3 like this

function getOrdinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}

function CoordinatePlane({ data }) {
    const width = 800;
    const height = 800;
    const padding = 50;

    // Scales adjusted to ensure axes meet at (0,0)
    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height - padding, padding]);

    useEffect(() => {
        const svg = d3.select('.coordinate-plane-svg')
            .attr('width', width)
            .attr('height', height);

        // Clear previous elements (if any) to prevent duplicates on re-render
        svg.selectAll('*').remove();

        // X and Y Axis
        svg.append('g')
            .attr('transform', `translate(0,${height - padding})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .attr('transform', `translate(${padding},0)`)
            .call(d3.axisLeft(yScale));

        // Tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('padding', '5px')
            .style('border', '1px solid black')
            .style('border-radius', '5px')
            .style('pointer-events', 'none')
            .style('opacity', 0);

        // Data points with hover effects and tooltip
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d.Offense))
            .attr('cy', d => yScale(d.Defense))
            .attr('r', 5)
            .attr('fill', '#0056b3') // Lighter fill color
            .style('stroke', 'grey') // Initial lighter stroke
            .style('stroke-width', '1px') // Initial thin stroke width
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('fill', '#e74c3c') // Highlight color on hover
                    .style('stroke', 'black') // Darker stroke on hover
                    .style('stroke-width', '2px'); // Thicker stroke on hover

                tooltip.transition().duration(200).style('opacity', 0.95);
                tooltip.html(
                    `<strong>Player: ${d.name}</strong><br/><br/>` +
                    `Overall Percent Difference: ${d['Similarity Score'] ? (d['Similarity Score'] * 100).toFixed(0) + '%' : 'N/A'}<br/>` +
                    `Overall Similarity Rank: ${d['Similarity Score_rank'] || 'N/A'}<br/><br/>` +
                    `Offense Percent Difference: ${d.Offense ? (d.Offense * 100).toFixed(0) + '%' : 'N/A'}<br/>` +
                    `Offense Similarity Rank: ${d.Offense_rank || 'N/A'}<br/><br/>` +
                    `Defense Percent Difference: ${d.Defense ? (d.Defense * 100).toFixed(0) + '%' : 'N/A'}<br/>` +
                    `Defense Similarity Rank: ${d.Defense_rank || 'N/A'}`
                )                
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('fill', '#0056b3') // Revert fill color
                    .style('stroke', 'grey') // Revert stroke color
                    .style('stroke-width', '1px'); // Revert stroke width

                tooltip.transition().duration(100).style('opacity', 0);
            });
        
        svg.append('circle')
            .attr('cx', xScale(0))
            .attr('cy', yScale(0))
            .attr('r', 7)
            .attr('fill', '#ffa500') // A different color for "You"
            .style('stroke', 'black')
            .style('stroke-width', '2px')
            .on('mouseover', function (event) {
                tooltip.transition().duration(200).style('opacity', 0.95);
                tooltip.html(
                    `<strong>Player: You</strong><br/><br/>` +
                    `Overall Percent Difference: 0%<br/>`
                )
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function () {
                tooltip.transition().duration(100).style('opacity', 0);
            });

        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height - 10})`) // Positioning the x-axis label
            .style("text-anchor", "middle") // Center the text
            .text("Offensive Difference (%)");

        svg.append("text")
            .attr("transform", "rotate(-90)") // Rotating text for y-axis
            .attr("y", 0) // Positioning the y-axis label
            .attr("x", 10 - (height / 2))
            .attr("dy", "1em") // Offset to position correctly
            .style("text-anchor", "middle") // Center the text
            .text("Defensive Difference (%)");

        return () => {
            tooltip.remove(); // Clean up the tooltip on unmount
        };

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
                        <p><strong>Offensive Similarity:</strong> ({highlightResult.Offense_value}%, {highlightResult.Offense_rank}{getOrdinalSuffix(highlightResult.Offense_rank)})</p>
                        <p><strong>Defensive Similarity:</strong> ({highlightResult.Defense_value}%, {highlightResult.Defense_rank}{getOrdinalSuffix(highlightResult.Defense_rank)})</p>
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
                            When looking at offense, {highlightResult.Name}'s scoring game was {highlightResult.Scoring}% similar and the {highlightResult.Scoring_rank}{getOrdinalSuffix(highlightResult.Scoring_rank)} most similar overall to yours.
                            Playmaking was {highlightResult.Playmaking}% similar and the {highlightResult.Playmaking_rank}{getOrdinalSuffix(highlightResult.Playmaking_rank)} most similar overall. Lastly, offensive rebounding was {highlightResult['Offensive Rebounding']}% similar and the {highlightResult['Offensive Rebounding_rank']}{getOrdinalSuffix(highlightResult['Offensive Rebounding_rank'])} most similar overall. 
                            On to your defense, {highlightResult.Name}'s paint defense was {highlightResult['Paint Defense']}% similar and the {highlightResult['Paint Defense_rank']}{getOrdinalSuffix(highlightResult['Paint Defense_rank'])} most similar overall to yours.
                            Perimeter defense was {highlightResult['Perimeter Defense']}% similar and the {highlightResult['Perimeter Defense_rank']}{getOrdinalSuffix(highlightResult['Perimeter Defense_rank'])} most similar overall.
                            And finally, defensive rebounding was {highlightResult['Defensive Rebounding']}% similar and the {highlightResult['Defensive Rebounding_rank']}{getOrdinalSuffix(highlightResult['Defensive Rebounding_rank'])} similar overall. 
                            Overall, we calculated that you were {highlightResult['Similarity Score']}% similar to {highlightResult.Name}.
                        </p>      
                </div>
            </div>
            <div className={isVisible ? 'visible' : 'hidden'}>
            <div className="data-container">
                <h1 className="data-title">NBA Players' Offensive and Defensive Percent Differences from You</h1>
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
