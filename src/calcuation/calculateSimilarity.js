import { csvParse } from 'd3';
import { questions } from '../components/Questions';

async function loadAndParseCSV(filePath) {
    const response = await fetch(filePath);
    const data = await response.text();

    return csvParse(data, function (player) {
        if (!player || !player.full_name) return null;

        const parseStat = (val) => {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? 0 : parsed;
        };

        return {
            full_name: player.full_name.trim(),
            Paint_volume_pm_percentile: parseStat(player.Paint_volume_pm_percentile),
            Paint_efficiency_percentile: parseStat(player.Paint_efficiency_percentile),
            Midrange_volume_pm_percentile: parseStat(player.Midrange_volume_pm_percentile),
            Midrange_efficiency_percentile: parseStat(player.Midrange_efficiency_percentile),
            Corner_volume_pm_percentile: parseStat(player.Corner_volume_pm_percentile),
            Corner_efficiency_percentile: parseStat(player.Corner_efficiency_percentile),
            Above_the_break_volume_pm_percentile: parseStat(player.Above_the_break_volume_pm_percentile),
            Above_the_break_efficiency_percentile: parseStat(player.Above_the_break_efficiency_percentile),
            Tight_volume_pm_percentile: parseStat(player.Tight_volume_pm_percentile),
            Tight_efficiency_percentile: parseStat(player.Tight_efficiency_percentile),
            Open_volume_pm_percentile: parseStat(player.Open_volume_pm_percentile),
            Open_efficiency_percentile: parseStat(player.Open_efficiency_percentile),
            Catch_and_Shoot_Volume_percentile: parseStat(player.Catch_and_Shoot_Volume_percentile),
            Catch_and_Shoot_Efficiency_percentile: parseStat(player.Catch_and_Shoot_Efficiency_percentile),
            Pull_up_Volume_percentile: parseStat(player.Pull_up_Volume_percentile),
            Pull_up_Efficiency_percentile: parseStat(player.Pull_up_Efficiency_percentile),
            Paint_defense_volume_pm_percentile: parseStat(player.Paint_defense_volume_pm_percentile),
            Paint_defense_deterance_percentile: parseStat(player.Paint_defense_deterance_percentile),
            Perimeter_defense_volume_pm_percentile: parseStat(player.Perimeter_defense_volume_pm_percentile),
            Perimeter_defense_deterance_percentile: parseStat(player.Perimeter_defense_deterance_percentile),
            AST_PCT_percentile: parseStat(player.AST_PCT_percentile),
            TOV_PCT_percentile: parseStat(player.TOV_PCT_percentile),
            OREB_PCT_percentile: parseStat(player.OREB_PCT_percentile),
            DREB_PCT_percentile: parseStat(player.DREB_PCT_percentile),
        };
    });
}

function transformFormData(formData) {
    // Initialize an empty dictionary for personDict
    let personDict = {};

    questions.forEach(question => {
        const answers = formData[question.id];
        if (answers) {
            // Debug Log
            // console.log(`Q ${question.id}:`, answers); 
            // Inputs are 1-10, so divide by 10 to get 0.1-1.0 range
            const val1 = parseFloat(answers.answer1);
            const val2 = parseFloat(answers.answer2);

            if (isNaN(val1) || isNaN(val2)) {
                console.warn(`NaN detected for Q${question.id}:`, answers);
            }

            if (question.statKey1) personDict[question.statKey1] = val1 / 10.0;
            if (question.statKey2) personDict[question.statKey2] = val2 / 10.0;
        } else {
            console.warn(`Missing answers for Q${question.id}`);
        }
    });

    console.log("Transformation Complete. PersonDict:", JSON.stringify(personDict, null, 2));

    return personDict;
}

async function calculation(formData, year = '2024-25') {
    let personDict = transformFormData(formData);
    let similarityDic = {};
    let playersDf = [];

    const availableYears = ['2021-22', '2022-23', '2023-24', '2024-25'];
    const publicUrl = process.env.PUBLIC_URL || '';

    try {
        if (year === 'ALL') {
            for (const yr of availableYears) {
                // Use publicUrl to handle both local and production paths correctly
                const df = await loadAndParseCSV(`${publicUrl}/data/${yr}.csv`);

                if (df && df.length > 0) {
                    // Append year to name to make unique entries
                    // copy the object to avoid mutating shared state if any
                    const labeledPlayers = df.map(p => ({ ...p, full_name: `${p.full_name} (${yr})` }));
                    playersDf = [...playersDf, ...labeledPlayers];
                }
            }
        } else {
            // Build path: check if it's the V4 file (legacy) or a year file
            const path = year === 'V4' ? `${publicUrl}/V4_player_data.csv` : `${publicUrl}/data/${year}.csv`;
            playersDf = await loadAndParseCSV(path);
        }
    } catch (err) {
        console.error("Error loading CSVs:", err);
    }

    console.log(`Calculation stats: Year=${year}, Players Loaded=${playersDf ? playersDf.length : 0}`);

    if (playersDf && playersDf.length > 0) {
        playersDf.forEach(playerDf => {
            // Calculate similarity as before using the player data
            if (!playerDf) return; // safety check

            let Area = ((Math.abs(personDict['Paint_volume_pm_percentile'] - playerDf['Paint_volume_pm_percentile']) +
                Math.abs(personDict['Paint_efficiency_percentile'] - playerDf['Paint_efficiency_percentile']) +
                Math.abs(personDict['Midrange_volume_pm_percentile'] - playerDf['Midrange_volume_pm_percentile']) +
                Math.abs(personDict['Midrange_efficiency_percentile'] - playerDf['Midrange_efficiency_percentile']) +
                (Math.abs(personDict['Corner_volume_pm_percentile'] - playerDf['Corner_volume_pm_percentile']) +
                    Math.abs(personDict['Corner_efficiency_percentile'] - playerDf['Corner_efficiency_percentile']) +
                    Math.abs(personDict['Above_the_break_volume_pm_percentile'] - playerDf['Above_the_break_volume_pm_percentile']) +
                    Math.abs(personDict['Above_the_break_efficiency_percentile'] - playerDf['Above_the_break_efficiency_percentile'])
                ) / 2) / 6);
            let Contest = (Math.abs(personDict['Tight_efficiency_percentile'] - playerDf['Tight_efficiency_percentile']) +
                Math.abs(personDict['Tight_volume_pm_percentile'] - playerDf['Tight_volume_pm_percentile']) +
                Math.abs(personDict['Open_efficiency_percentile'] - playerDf['Open_efficiency_percentile']) +
                Math.abs(personDict['Open_volume_pm_percentile'] - playerDf['Open_volume_pm_percentile'])) / 4;
            let Type = (Math.abs(personDict['Catch_and_Shoot_Efficiency_percentile'] - playerDf['Catch_and_Shoot_Efficiency_percentile']) +
                Math.abs(personDict['Catch_and_Shoot_Volume_percentile'] - playerDf['Catch_and_Shoot_Volume_percentile']) +
                Math.abs(personDict['Pull_up_Volume_percentile'] - playerDf['Pull_up_Volume_percentile']) +
                Math.abs(personDict['Pull_up_Efficiency_percentile'] - playerDf['Pull_up_Efficiency_percentile'])) / 4;
            let Scoring = (Area + Contest + (Type * (2 / 3))) / (8 / 3);
            let Playmaking = (Math.abs(personDict['AST_PCT_percentile'] - playerDf['AST_PCT_percentile']) +
                Math.abs(personDict['TOV_PCT_percentile'] - playerDf['TOV_PCT_percentile'])) / 2;
            let Paint = (Math.abs(personDict['Paint_defense_volume_pm_percentile'] - playerDf['Paint_defense_volume_pm_percentile']) +
                Math.abs(personDict['Paint_defense_deterance_percentile'] - playerDf['Paint_defense_deterance_percentile'])) / 2;
            let Perimeter = (Math.abs(personDict['Perimeter_defense_volume_pm_percentile'] - playerDf['Perimeter_defense_volume_pm_percentile']) +
                Math.abs(personDict['Perimeter_defense_deterance_percentile'] - playerDf['Perimeter_defense_deterance_percentile'])) / 2;
            let Oreb = Math.abs(personDict['OREB_PCT_percentile'] - playerDf['OREB_PCT_percentile']);
            let Dreb = Math.abs(personDict['DREB_PCT_percentile'] - playerDf['DREB_PCT_percentile']);

            let Offense = ((Scoring * 12.5) + (Playmaking * 5.5) + Oreb) / 19;
            let Defense = ((Paint * 8) + (Perimeter * 8) + (Dreb * 3)) / 19;

            // Calculate individual stat differences for graph axes (X = stat1, Y = stat2 for each question)
            // Q1: Paint - Volume (X) vs Efficiency (Y)
            let Q1_X = Math.abs(personDict['Paint_volume_pm_percentile'] - playerDf['Paint_volume_pm_percentile']);
            let Q1_Y = Math.abs(personDict['Paint_efficiency_percentile'] - playerDf['Paint_efficiency_percentile']);
            // Q2: Midrange
            let Q2_X = Math.abs(personDict['Midrange_volume_pm_percentile'] - playerDf['Midrange_volume_pm_percentile']);
            let Q2_Y = Math.abs(personDict['Midrange_efficiency_percentile'] - playerDf['Midrange_efficiency_percentile']);
            // Q3: Corner
            let Q3_X = Math.abs(personDict['Corner_volume_pm_percentile'] - playerDf['Corner_volume_pm_percentile']);
            let Q3_Y = Math.abs(personDict['Corner_efficiency_percentile'] - playerDf['Corner_efficiency_percentile']);
            // Q4: Above the Break
            let Q4_X = Math.abs(personDict['Above_the_break_volume_pm_percentile'] - playerDf['Above_the_break_volume_pm_percentile']);
            let Q4_Y = Math.abs(personDict['Above_the_break_efficiency_percentile'] - playerDf['Above_the_break_efficiency_percentile']);
            // Q5: Tight
            let Q5_X = Math.abs(personDict['Tight_volume_pm_percentile'] - playerDf['Tight_volume_pm_percentile']);
            let Q5_Y = Math.abs(personDict['Tight_efficiency_percentile'] - playerDf['Tight_efficiency_percentile']);
            // Q6: Open
            let Q6_X = Math.abs(personDict['Open_volume_pm_percentile'] - playerDf['Open_volume_pm_percentile']);
            let Q6_Y = Math.abs(personDict['Open_efficiency_percentile'] - playerDf['Open_efficiency_percentile']);
            // Q7: Catch and Shoot
            let Q7_X = Math.abs(personDict['Catch_and_Shoot_Volume_percentile'] - playerDf['Catch_and_Shoot_Volume_percentile']);
            let Q7_Y = Math.abs(personDict['Catch_and_Shoot_Efficiency_percentile'] - playerDf['Catch_and_Shoot_Efficiency_percentile']);
            // Q8: Pull Up
            let Q8_X = Math.abs(personDict['Pull_up_Volume_percentile'] - playerDf['Pull_up_Volume_percentile']);
            let Q8_Y = Math.abs(personDict['Pull_up_Efficiency_percentile'] - playerDf['Pull_up_Efficiency_percentile']);
            // Q9: Paint Defense
            let Q9_X = Math.abs(personDict['Paint_defense_volume_pm_percentile'] - playerDf['Paint_defense_volume_pm_percentile']);
            let Q9_Y = Math.abs(personDict['Paint_defense_deterance_percentile'] - playerDf['Paint_defense_deterance_percentile']);
            // Q10: Perimeter Defense
            let Q10_X = Math.abs(personDict['Perimeter_defense_volume_pm_percentile'] - playerDf['Perimeter_defense_volume_pm_percentile']);
            let Q10_Y = Math.abs(personDict['Perimeter_defense_deterance_percentile'] - playerDf['Perimeter_defense_deterance_percentile']);
            // Q11: Playmaking
            let Q11_X = Math.abs(personDict['AST_PCT_percentile'] - playerDf['AST_PCT_percentile']);
            let Q11_Y = Math.abs(personDict['TOV_PCT_percentile'] - playerDf['TOV_PCT_percentile']);
            // Q12: Rebounding
            let Q12_X = Math.abs(personDict['OREB_PCT_percentile'] - playerDf['OREB_PCT_percentile']);
            let Q12_Y = Math.abs(personDict['DREB_PCT_percentile'] - playerDf['DREB_PCT_percentile']);

            let playerStats = {
                'Similarity Score': (Offense + Defense) / 2,
                'Area': Area,
                'Contest': Contest,
                'Type': Type,
                'Playmaking': Playmaking,
                'Offensive Rebounding': Oreb,
                'Paint Defense': Paint,
                'Perimeter Defense': Perimeter,
                'Defensive Rebounding': Dreb,
                'Offense': Offense,
                'Defense': Defense,
                // Individual stat differences for graph axes (absolute diff)
                'Q1_X': Q1_X, 'Q1_Y': Q1_Y,
                'Q2_X': Q2_X, 'Q2_Y': Q2_Y,
                'Q3_X': Q3_X, 'Q3_Y': Q3_Y,
                'Q4_X': Q4_X, 'Q4_Y': Q4_Y,
                'Q5_X': Q5_X, 'Q5_Y': Q5_Y,
                'Q6_X': Q6_X, 'Q6_Y': Q6_Y,
                'Q7_X': Q7_X, 'Q7_Y': Q7_Y,
                'Q8_X': Q8_X, 'Q8_Y': Q8_Y,
                'Q9_X': Q9_X, 'Q9_Y': Q9_Y,
                'Q10_X': Q10_X, 'Q10_Y': Q10_Y,
                'Q11_X': Q11_X, 'Q11_Y': Q11_Y,
                'Q12_X': Q12_X, 'Q12_Y': Q12_Y,
                // Player's actual percentile values for REAL distance graph
                'R1_X': playerDf['Paint_volume_pm_percentile'], 'R1_Y': playerDf['Paint_efficiency_percentile'],
                'R2_X': playerDf['Midrange_volume_pm_percentile'], 'R2_Y': playerDf['Midrange_efficiency_percentile'],
                'R3_X': playerDf['Corner_volume_pm_percentile'], 'R3_Y': playerDf['Corner_efficiency_percentile'],
                'R4_X': playerDf['Above_the_break_volume_pm_percentile'], 'R4_Y': playerDf['Above_the_break_efficiency_percentile'],
                'R5_X': playerDf['Tight_volume_pm_percentile'], 'R5_Y': playerDf['Tight_efficiency_percentile'],
                'R6_X': playerDf['Open_volume_pm_percentile'], 'R6_Y': playerDf['Open_efficiency_percentile'],
                'R7_X': playerDf['Catch_and_Shoot_Volume_percentile'], 'R7_Y': playerDf['Catch_and_Shoot_Efficiency_percentile'],
                'R8_X': playerDf['Pull_up_Volume_percentile'], 'R8_Y': playerDf['Pull_up_Efficiency_percentile'],
                'R9_X': playerDf['Paint_defense_volume_pm_percentile'], 'R9_Y': playerDf['Paint_defense_deterance_percentile'],
                'R10_X': playerDf['Perimeter_defense_volume_pm_percentile'], 'R10_Y': playerDf['Perimeter_defense_deterance_percentile'],
                'R11_X': playerDf['AST_PCT_percentile'], 'R11_Y': playerDf['TOV_PCT_percentile'],
                'R12_X': playerDf['OREB_PCT_percentile'], 'R12_Y': playerDf['DREB_PCT_percentile']
            };

            similarityDic[playerDf['full_name']] = playerStats;
        });
    } else {
        console.error("Players dataframe is not loaded. Year:", year);
    }
    assignRanksToStats(similarityDic);
    return similarityDic;
}

function results(similarityDic) {
    let dic = {};
    if (Object.keys(similarityDic).length === 0) return dic;
    let similarity10 = Object.entries(similarityDic)
        .sort((a, b) => a[1]['Similarity Score'] - b[1]['Similarity Score'])
        .slice(0, 10);
    similarity10.forEach((item, index) => {
        // Use player's name and adjust the similarity score
        // console.log(item[0], item[1]['Similarity Score']);
        let adjustedScore = (1 - item[1]['Similarity Score']) * 100;
        dic[item[0]] = adjustedScore.toFixed(2); // Round to two decimal places
    });
    return dic;
}

function highlights(similarityDic, playerName = null) {
    let dic = {};
    let entries = Object.entries(similarityDic).sort((a, b) => a[1]['Similarity Score'] - b[1]['Similarity Score']);

    if (entries.length === 0) {
        return {
            Name: 'No Data Found',
            Offense_value: '0.00',
            Defense_value: '0.00',
            Most_similar_value: 'N/A',
            Least_similar_value: 'N/A',
            'Similarity Score': '0.00',
            Scoring: '0.00',
            Playmaking: '0.00',
            'Offensive Rebounding': '0.00',
            'Paint Defense': '0.00',
            'Perimeter Defense': '0.00',
            'Defensive Rebounding': '0.00',
            Offense_rank: 0,
            Defense_rank: 0,
            Scoring_rank: 0,
            Playmaking_rank: 0,
            'Offensive Rebounding_rank': 0,
            'Paint Defense_rank': 0,
            'Perimeter Defense_rank': 0,
            'Defensive Rebounding_rank': 0
        };
    }

    // Find the player by name, or default to the first (most similar)
    let similarity1;
    if (playerName) {
        similarity1 = entries.find(entry => entry[0] === playerName);
        if (!similarity1) {
            similarity1 = entries[0]; // Fallback to first if not found
        }
    } else {
        similarity1 = entries[0];
    }
    // Apply the transformation to Offense_value and Defense_value with rounding
    dic['Name'] = similarity1[0];
    dic['Offense_value'] = ((1 - similarity1[1]['Offense']) * 100).toFixed(2);
    dic['Defense_value'] = ((1 - similarity1[1]['Defense']) * 100).toFixed(2);

    // Delete 'Offense' and 'Defense' from the similarity1[1] dictionary
    // List of base stats for which rankings are calculated
    const baseStats = ['Similarity Score', 'Scoring', 'Playmaking', 'Offensive Rebounding', 'Paint Defense', 'Perimeter Defense', 'Defensive Rebounding'];

    // Constructing the exclusion list, including 'Offense', 'Defense', and all *_rank keys
    const exclusionList = ['Offense', 'Defense', ...baseStats.map(stat => `${stat}_rank`), 'Offense_rank', 'Defense_rank'];

    // Filter out the keys you want to exclude
    const filteredKeys = Object.keys(similarity1[1]).filter(key => !exclusionList.includes(key));

    // Find the key of the minimum and maximum value in the filtered list
    let keyOfMinValue = filteredKeys.reduce((a, b) => similarity1[1][a] < similarity1[1][b] ? a : b);
    let keyOfMaxValue = filteredKeys.reduce((a, b) => similarity1[1][a] > similarity1[1][b] ? a : b);

    let minValueSuffix = getOrdinalSuffix(similarity1[1][`${keyOfMinValue}_rank`]);
    let maxValueSuffix = getOrdinalSuffix(similarity1[1][`${keyOfMaxValue}_rank`]);

    dic['Most_similar_value'] = `${keyOfMinValue} - (${((1 - similarity1[1][keyOfMinValue]) * 100).toFixed(2)}%, ${similarity1[1][`${keyOfMinValue}_rank`]}${minValueSuffix})`;
    dic['Least_similar_value'] = `${keyOfMaxValue} - (${((1 - similarity1[1][keyOfMaxValue]) * 100).toFixed(2)}%, ${similarity1[1][`${keyOfMaxValue}_rank`]}${maxValueSuffix})`;


    dic['Similarity Score'] = ((1 - similarity1[1]['Similarity Score']) * 100).toFixed(2);
    dic['Area'] = ((1 - similarity1[1]['Area']) * 100).toFixed(2);
    dic['Contest'] = ((1 - similarity1[1]['Contest']) * 100).toFixed(2);
    dic['Type'] = ((1 - similarity1[1]['Type']) * 100).toFixed(2);
    dic['Playmaking'] = ((1 - similarity1[1]['Playmaking']) * 100).toFixed(2);
    dic['Offensive Rebounding'] = ((1 - similarity1[1]['Offensive Rebounding']) * 100).toFixed(2);
    dic['Paint Defense'] = ((1 - similarity1[1]['Paint Defense']) * 100).toFixed(2);
    dic['Perimeter Defense'] = ((1 - similarity1[1]['Perimeter Defense']) * 100).toFixed(2);
    dic['Defensive Rebounding'] = ((1 - similarity1[1]['Defensive Rebounding']) * 100).toFixed(2);
    dic['Offense_rank'] = similarity1[1]['Offense_rank'];
    dic['Defense_rank'] = similarity1[1]['Defense_rank'];
    dic['Area_rank'] = similarity1[1]['Area_rank'];
    dic['Contest_rank'] = similarity1[1]['Contest_rank'];
    dic['Type_rank'] = similarity1[1]['Type_rank'];
    dic['Playmaking_rank'] = similarity1[1]['Playmaking_rank'];
    dic['Offensive Rebounding_rank'] = similarity1[1]['Offensive Rebounding_rank'];
    dic['Paint Defense_rank'] = similarity1[1]['Paint Defense_rank'];
    dic['Perimeter Defense_rank'] = similarity1[1]['Perimeter Defense_rank'];
    dic['Defensive Rebounding_rank'] = similarity1[1]['Defensive Rebounding_rank'];

    return dic;
}

function assignRanksToStats(similarityDic) {
    const stats = ['Similarity Score', 'Offense', 'Defense', 'Area', 'Contest', 'Type', 'Playmaking', 'Offensive Rebounding', 'Paint Defense', 'Perimeter Defense', 'Defensive Rebounding'];

    stats.forEach(stat => {
        // Extract scores and names into an array
        let scores = Object.keys(similarityDic).map(playerName => ({
            name: playerName,
            score: similarityDic[playerName][stat]
        }));

        // Sort by score in ascending order
        scores.sort((a, b) => a.score - b.score);

        // Assign ranks, considering ties
        let currentRank = 1;
        for (let i = 0; i < scores.length; i++) {
            if (i > 0 && scores[i].score === scores[i - 1].score) {
                scores[i].rank = scores[i - 1].rank;
            } else {
                scores[i].rank = currentRank;
            }
            currentRank++;
        }

        // Update similarityDic with ranks
        scores.forEach(item => {
            similarityDic[item.name][`${stat}_rank`] = item.rank;
        });
    });
}

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

export { calculation, results, highlights };
