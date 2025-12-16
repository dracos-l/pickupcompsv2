import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculation, results, highlights } from '../calcuation/calculateSimilarity';
import { questions } from './Questions'; // Import questions for data validation
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

function CoordinatePlane({ data, xAxis = 'Offense', yAxis = 'Defense', xLabel = 'X', yLabel = 'Y', userX = 0, userY = 0 }) {
    const width = 400;
    const height = 400;
    const padding = 40;

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
            .call(d3.axisBottom(xScale).ticks(5));

        svg.append('g')
            .attr('transform', `translate(${padding},0)`)
            .call(d3.axisLeft(yScale).ticks(5));

        // Tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('padding', '5px')
            .style('border', '1px solid black')
            .style('border-radius', '5px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('font-size', '11px');

        // Data points with hover effects and tooltip
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d[xAxis] || 0))
            .attr('cy', d => yScale(d[yAxis] || 0))
            .attr('r', 4)
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
                    `<strong>${d.name}</strong><br/>` +
                    `${xLabel}: ${((d[xAxis] || 0) * 100).toFixed(0)}%<br/>` +
                    `${yLabel}: ${((d[yAxis] || 0) * 100).toFixed(0)}%`
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
            .attr('cx', xScale(userX))
            .attr('cy', yScale(userY))
            .attr('r', 5)
            .attr('fill', '#ffa500') // A different color for "You"
            .style('stroke', 'black')
            .style('stroke-width', '2px')
            .on('mouseover', function (event) {
                tooltip.transition().duration(200).style('opacity', 0.95);
                tooltip.html(`<strong>You</strong><br/>${xLabel}: ${(userX * 100).toFixed(0)}%<br/>${yLabel}: ${(userY * 100).toFixed(0)}%`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function () {
                tooltip.transition().duration(100).style('opacity', 0);
            });

        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height - 5})`) // Positioning the x-axis label
            .style("text-anchor", "middle") // Center the text
            .style("font-size", "11px")
            .text(xLabel);

        svg.append("text")
            .attr("transform", "rotate(-90)") // Rotating text for y-axis
            .attr("y", 5) // Positioning the y-axis label
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em") // Offset to position correctly
            .style("text-anchor", "middle") // Center the text
            .style("font-size", "11px")
            .text(yLabel);

        return () => {
            tooltip.remove(); // Clean up the tooltip on unmount
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, xAxis, yAxis, xLabel, yLabel, userX, userY]);

    return (
        <svg className="coordinate-plane-svg" />
    );
}

function Results() {
    const navigate = useNavigate();

    // Default to 2024-25, but allow user to change it
    const [selectedYear, setSelectedYear] = useState('2024-25');

    // State to hold results
    const [topTenPlayers, setTopTenPlayers] = useState([]); // Array of {name, score}
    const [selectedPlayer, setSelectedPlayer] = useState(null); // Currently selected player name
    const [highlightResult, setHighlightResult] = useState({});
    const [playerData, setPlayerData] = useState([]);
    const [similarityData, setSimilarityData] = useState({}); // Store raw similarity data
    const [userData, setUserData] = useState({}); // User's percentile values for graph
    const [isVisible, setIsVisible] = useState(true);

    // Graph - single dropdown to select question category (real distance version)
    const [graphQuestion, setGraphQuestion] = useState('Q1');

    // Question options with their X/Y axis mappings (R = real percentile values)
    const graphOptions = [
        { value: 'Q1', label: 'Paint', xKey: 'R1_X', yKey: 'R1_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Paint_volume_pm_percentile', userYKey: 'Paint_efficiency_percentile' },
        { value: 'Q2', label: 'Midrange', xKey: 'R2_X', yKey: 'R2_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Midrange_volume_pm_percentile', userYKey: 'Midrange_efficiency_percentile' },
        { value: 'Q3', label: 'Corner 3s', xKey: 'R3_X', yKey: 'R3_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Corner_volume_pm_percentile', userYKey: 'Corner_efficiency_percentile' },
        { value: 'Q4', label: 'Above-the-Break 3s', xKey: 'R4_X', yKey: 'R4_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Above_the_break_volume_pm_percentile', userYKey: 'Above_the_break_efficiency_percentile' },
        { value: 'Q5', label: 'Tight Shots', xKey: 'R5_X', yKey: 'R5_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Tight_volume_pm_percentile', userYKey: 'Tight_efficiency_percentile' },
        { value: 'Q6', label: 'Open Shots', xKey: 'R6_X', yKey: 'R6_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Open_volume_pm_percentile', userYKey: 'Open_efficiency_percentile' },
        { value: 'Q7', label: 'Catch & Shoot', xKey: 'R7_X', yKey: 'R7_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Catch_and_Shoot_Volume_percentile', userYKey: 'Catch_and_Shoot_Efficiency_percentile' },
        { value: 'Q8', label: 'Pull-Up', xKey: 'R8_X', yKey: 'R8_Y', xLabel: 'Volume', yLabel: 'Efficiency', userXKey: 'Pull_up_Volume_percentile', userYKey: 'Pull_up_Efficiency_percentile' },
        { value: 'Q9', label: 'Paint Defense', xKey: 'R9_X', yKey: 'R9_Y', xLabel: 'Volume', yLabel: 'Deterrence', userXKey: 'Paint_defense_volume_pm_percentile', userYKey: 'Paint_defense_deterance_percentile' },
        { value: 'Q10', label: 'Perimeter Defense', xKey: 'R10_X', yKey: 'R10_Y', xLabel: 'Volume', yLabel: 'Deterrence', userXKey: 'Perimeter_defense_volume_pm_percentile', userYKey: 'Perimeter_defense_deterance_percentile' },
        { value: 'Q11', label: 'Playmaking', xKey: 'R11_X', yKey: 'R11_Y', xLabel: 'Assists', yLabel: 'Turnovers', userXKey: 'AST_PCT_percentile', userYKey: 'TOV_PCT_percentile' },
        { value: 'Q12', label: 'Rebounding', xKey: 'R12_X', yKey: 'R12_Y', xLabel: 'Offensive Reb', yLabel: 'Defensive Reb', userXKey: 'OREB_PCT_percentile', userYKey: 'DREB_PCT_percentile' }
    ];

    useEffect(() => {
        const fetchDataAndCalculate = async () => {
            // Use localStorage as the source of truth for the complete dataset
            const formData = JSON.parse(localStorage.getItem('formData'));

            // Check if we have data for all questions
            if (!formData || !questions || questions.length === 0 || questions.some(q => !formData[q.id])) {
                console.warn("Complete dataset not found in localStorage. Redirecting to Edit page.");
                navigate('/Edit');
                return;
            }

            const similarityDic = await calculation(formData, selectedYear);
            setSimilarityData(similarityDic);

            // Process results - get top 10
            const topResultsDic = results(similarityDic);
            const topTen = Object.entries(topResultsDic).map(([name, score]) => ({ name, score }));
            setTopTenPlayers(topTen);

            // Set default selected player to first if none selected
            if (topTen.length > 0 && !selectedPlayer) {
                setSelectedPlayer(topTen[0].name);
            }
            // Prepare data for graph
            const processedData = Object.keys(similarityDic).map(name => ({
                name: name,
                ...similarityDic[name],
            }));
            setPlayerData(processedData);

            // Build user percentile values for graph positioning
            const userPercentiles = {};
            questions.forEach(q => {
                if (formData[q.id]) {
                    userPercentiles[q.statKey1] = parseFloat(formData[q.id].answer1) / 10.0;
                    userPercentiles[q.statKey2] = parseFloat(formData[q.id].answer2) / 10.0;
                }
            });
            setUserData(userPercentiles);
        };

        fetchDataAndCalculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedYear]);

    // Update highlight when selected player changes
    useEffect(() => {
        if (selectedPlayer && Object.keys(similarityData).length > 0) {
            const highlight = highlights(similarityData, selectedPlayer);
            setHighlightResult(highlight);
        }
    }, [selectedPlayer, similarityData]);

    const handleEditClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            navigate(`/Edit`);
        }, 500);
    }

    const handlePlayerClick = (playerName) => {
        setSelectedPlayer(playerName);
    };

    return (
        <div className={isVisible ? 'visible' : 'hidden'}>
            <div className="results-container">
                <h1 className="results-title">Results</h1>


                {/* Year Toggle Dropdown */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold', color: 'black' }}>Compare vs Year: </label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px', borderRadius: '5px' }}
                    >
                        <option value="2024-25">2024-25</option>
                        <option value="2023-24">2023-24</option>
                        <option value="2022-23">2022-23</option>
                        <option value="2021-22">2021-22</option>
                        <option value="ALL">All 4 Years</option>
                    </select>
                </div>


                <div className="content-container">
                    <div className="top-matches">
                        <h2>Top 10 Matches</h2>
                        <div className="player-buttons">
                            {topTenPlayers.map((player, index) => (
                                <button
                                    key={index}
                                    className={`player-button ${selectedPlayer === player.name ? 'selected' : ''}`}
                                    onClick={() => handlePlayerClick(player.name)}
                                >
                                    {player.name}: {player.score}%
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="highlight-section">
                        <h2>{highlightResult.Name}</h2>
                        <div className="stats-grid">
                            <div className="stat-row">
                                <span className="stat-label">Offense:</span>
                                <span className="stat-value">{highlightResult.Offense_value}%, {highlightResult.Offense_rank}{getOrdinalSuffix(highlightResult.Offense_rank)} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Defense:</span>
                                <span className="stat-value">{highlightResult.Defense_value}%, {highlightResult.Defense_rank}{getOrdinalSuffix(highlightResult.Defense_rank)} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Area Scoring:</span>
                                <span className="stat-value">{highlightResult.Area}%, {highlightResult.Area_rank}{getOrdinalSuffix(highlightResult.Area_rank)} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Contest Scoring:</span>
                                <span className="stat-value">{highlightResult.Contest}%, {highlightResult.Contest_rank}{getOrdinalSuffix(highlightResult.Contest_rank)} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Shot Type:</span>
                                <span className="stat-value">{highlightResult.Type}%, {highlightResult.Type_rank}{getOrdinalSuffix(highlightResult.Type_rank)} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Playmaking:</span>
                                <span className="stat-value">{highlightResult.Playmaking}%, {highlightResult.Playmaking_rank}{getOrdinalSuffix(highlightResult.Playmaking_rank)} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Offensive Rebounding:</span>
                                <span className="stat-value">{highlightResult['Offensive Rebounding']}%, {highlightResult['Offensive Rebounding_rank']}{getOrdinalSuffix(highlightResult['Offensive Rebounding_rank'])} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Paint Defense:</span>
                                <span className="stat-value">{highlightResult['Paint Defense']}%, {highlightResult['Paint Defense_rank']}{getOrdinalSuffix(highlightResult['Paint Defense_rank'])} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Perimeter Defense:</span>
                                <span className="stat-value">{highlightResult['Perimeter Defense']}%, {highlightResult['Perimeter Defense_rank']}{getOrdinalSuffix(highlightResult['Perimeter Defense_rank'])} closest</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Defensive Rebounding:</span>
                                <span className="stat-value">{highlightResult['Defensive Rebounding']}%, {highlightResult['Defensive Rebounding_rank']}{getOrdinalSuffix(highlightResult['Defensive Rebounding_rank'])} closest</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={isVisible ? 'visible' : 'hidden'}>
                    <div className="data-container">
                        <h2 className="data-title">Player Comparison Graph</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <label style={{ fontSize: '14px' }}>
                                Compare:
                                <select value={graphQuestion} onChange={(e) => setGraphQuestion(e.target.value)} style={{ marginLeft: '8px', fontSize: '14px', padding: '4px' }}>
                                    {graphOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </label>
                        </div>
                        <CoordinatePlane
                            data={playerData}
                            xAxis={graphOptions.find(o => o.value === graphQuestion)?.xKey}
                            yAxis={graphOptions.find(o => o.value === graphQuestion)?.yKey}
                            xLabel={graphOptions.find(o => o.value === graphQuestion)?.xLabel}
                            yLabel={graphOptions.find(o => o.value === graphQuestion)?.yLabel}
                            userX={userData[graphOptions.find(o => o.value === graphQuestion)?.userXKey] || 0}
                            userY={userData[graphOptions.find(o => o.value === graphQuestion)?.userYKey] || 0}
                        />
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
