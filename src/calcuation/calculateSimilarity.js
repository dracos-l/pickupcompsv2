import { csvParse } from 'd3';

async function loadAndParseCSV(filePath) {
    const response = await fetch(filePath);
    const data = await response.text();

    // Check the raw output after parsing
    console.log(csvParse(data));

    return csvParse(data, function(player) {
        return {
            full_name: player.full_name.trim(),
            Paint_volume_pm_percentile: parseFloat(player.Paint_volume_pm_percentile),
            Paint_efficiency_percentile: parseFloat(player.Paint_efficiency_percentile),
            Midrange_volume_pm_percentile: parseFloat(player.Midrange_volume_pm_percentile),
            Midrange_efficiency_percentile: parseFloat(player.Midrange_efficiency_percentile),
            Corner_volume_pm_percentile: parseFloat(player.Corner_volume_pm_percentile),
            Corner_efficiency_percentile: parseFloat(player.Corner_efficiency_percentile),
            Above_the_break_volume_pm_percentile: parseFloat(player.Above_the_break_volume_pm_percentile),
            Above_the_break_efficiency_percentile: parseFloat(player.Above_the_break_efficiency_percentile),
            Tight_volume_pm_percentile: parseFloat(player.Tight_volume_pm_percentile),
            Tight_efficiency_percentile: parseFloat(player.Tight_efficiency_percentile),
            Open_volume_pm_percentile: parseFloat(player.Open_volume_pm_percentile),
            Open_efficiency_percentile: parseFloat(player.Open_efficiency_percentile),
            Catch_and_Shoot_Volume_percentile: parseFloat(player.Catch_and_Shoot_Volume_percentile),
            Catch_and_Shoot_Efficiency_percentile: parseFloat(player.Catch_and_Shoot_Efficiency_percentile),
            Pull_up_Volume_percentile: parseFloat(player.Pull_up_Volume_percentile),
            Pull_up_Efficiency_percentile: parseFloat(player.Pull_up_Efficiency_percentile),
            Paint_defense_volume_pm_percentile: parseFloat(player.Paint_defense_volume_pm_percentile),
            Paint_defense_deterance_percentile: parseFloat(player.Paint_defense_deterance_percentile),
            Perimeter_defense_volume_pm_percentile: parseFloat(player.Perimeter_defense_volume_pm_percentile),
            Perimeter_defense_deterance_percentile: parseFloat(player.Perimeter_defense_deterance_percentile),
            AST_PCT_percentile: parseFloat(player.AST_PCT_percentile),
            TOV_PCT_percentile: parseFloat(player.TOV_PCT_percentile),
            OREB_PCT_percentile: parseFloat(player.OREB_PCT_percentile),
            DREB_PCT_percentile: parseFloat(player.DREB_PCT_percentile),
        };
    });
}

function transformFormData(formData) {
    // Initialize an empty dictionary for personDict
    let personDict = {};

    const mapping = {
        1: ['Paint_volume_pm_percentile', 'Paint_efficiency_percentile'],
        2: ['Midrange_volume_pm_percentile', 'Midrange_efficiency_percentile'],
        3: ['Corner_volume_pm_percentile', 'Corner_efficiency_percentile'],
        4: ['Above_the_break_volume_pm_percentile', 'Above_the_break_efficiency_percentile'],
        5: ['Tight_volume_pm_percentile', 'Tight_efficiency_percentile'],
        6: ['Open_volume_pm_percentile', 'Open_efficiency_percentile'],
        7: ['Catch_and_Shoot_Volume_percentile', 'Catch_and_Shoot_Efficiency_percentile'],
        8: ['Pull_up_Volume_percentile', 'Pull_up_Efficiency_percentile'],
        9: ['Paint_defense_volume_pm_percentile', 'Paint_defense_deterance_percentile'],
        10: ['Perimeter_defense_volume_pm_percentile', 'Perimeter_defense_deterance_percentile'],
        11: ['AST_PCT_percentile', 'TOV_PCT_percentile'],
        12: ['OREB_PCT_percentile', 'DREB_PCT_percentile']
    };

    Object.keys(formData).forEach(questionId => {
        const answers = formData[questionId];
        if(mapping[questionId]) {
            personDict[mapping[questionId][0]] = parseFloat(answers.answer1);
            personDict[mapping[questionId][1]] = parseFloat(answers.answer2);
        }
    });

    return personDict;
}

async function calculation(formData) {
    let personDict = transformFormData(formData);
    let similarityDic = {};
    const playersDf = await loadAndParseCSV('/V4_player_data.csv');
    console.log(playersDf);
    if (playersDf) {
        playersDf.forEach(playerDf => {
            // Calculate similarity as before using the player data
            let Area = ((Math.abs(personDict['Paint_volume_pm_percentile'] - playerDf['Paint_volume_pm_percentile']) + 
                            Math.abs(personDict['Paint_efficiency_percentile'] - playerDf['Paint_efficiency_percentile']) + 
                            Math.abs(personDict['Midrange_volume_pm_percentile'] - playerDf['Midrange_volume_pm_percentile']) + 
                            Math.abs(personDict['Midrange_efficiency_percentile'] - playerDf['Midrange_efficiency_percentile']) + 
                            (Math.abs(personDict['Corner_volume_pm_percentile'] - playerDf['Corner_volume_pm_percentile']) + 
                            Math.abs(personDict['Corner_efficiency_percentile'] - playerDf['Corner_efficiency_percentile']) + 
                            Math.abs(personDict['Above_the_break_volume_pm_percentile'] - playerDf['Above_the_break_volume_pm_percentile']) + 
                            Math.abs(personDict['Above_the_break_efficiency_percentile'] - playerDf['Above_the_break_efficiency_percentile'])
                            )/ 2)/6);
            let Contest = (Math.abs(personDict['Tight_efficiency_percentile'] - playerDf['Tight_efficiency_percentile']) + 
                            Math.abs(personDict['Tight_volume_pm_percentile'] - playerDf['Tight_volume_pm_percentile']) + 
                            Math.abs(personDict['Open_efficiency_percentile'] - playerDf['Open_efficiency_percentile']) + 
                            Math.abs(personDict['Open_volume_pm_percentile'] - playerDf['Open_volume_pm_percentile']))/4;
            let Type = (Math.abs(personDict['Catch_and_Shoot_Efficiency_percentile'] - playerDf['Catch_and_Shoot_Efficiency_percentile']) + 
                            Math.abs(personDict['Catch_and_Shoot_Volume_percentile'] - playerDf['Catch_and_Shoot_Volume_percentile']) + 
                            Math.abs(personDict['Pull_up_Volume_percentile'] - playerDf['Pull_up_Volume_percentile']) + 
                            Math.abs(personDict['Pull_up_Efficiency_percentile'] - playerDf['Pull_up_Efficiency_percentile'])) / 4;
            let Scoring = (Area + Contest + (Type * (2/3))) / (8/3);
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

            let playerStats = {
                'Similarity Score': (Offense + Defense) / 2,
                'Scoring': Scoring,
                'Playmaking': Playmaking,
                'Offensive Rebounding': Oreb,
                'Paint Defense': Paint,
                'Perimeter Defense': Perimeter,
                'Defensive Rebounding': Dreb,
                'Offense': Offense,
                'Defense': Defense
            };

            similarityDic[playerDf['full_name']] = playerStats;
        });
    } else {
        console.error("Players dataframe is not loaded.");
    }
    assignRanksToStats(similarityDic);
    return similarityDic;
}

function results(similarityDic) {
    let dic = {};
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

function highlights(similarityDic) {
    let dic = {};
    let similarity1 = Object.entries(similarityDic)
                            .sort((a, b) => a[1]['Similarity Score'] - b[1]['Similarity Score'])[0];
    // Apply the transformation to Offense_value and Defense_value with rounding
    dic['Name'] = similarity1[0];
    dic['Offense_value'] = ((1 - similarity1[1]['Offense']) * 100).toFixed(2);
    dic['Defense_value'] = ((1 - similarity1[1]['Defense']) * 100).toFixed(2);

    // Delete 'Offense' and 'Defense' from the similarity1[1] dictionary
    // List of base stats for which rankings are calculated
    const baseStats = ['Similarity Score','Scoring', 'Playmaking', 'Offensive Rebounding', 'Paint Defense', 'Perimeter Defense', 'Defensive Rebounding'];

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
    dic['Scoring'] = ((1 - similarity1[1]['Scoring']) * 100).toFixed(2);
    dic['Playmaking'] = ((1 - similarity1[1]['Playmaking']) * 100).toFixed(2);
    dic['Offensive Rebounding'] = ((1 - similarity1[1]['Offensive Rebounding']) * 100).toFixed(2);
    dic['Paint Defense'] = ((1 - similarity1[1]['Paint Defense']) * 100).toFixed(2);
    dic['Perimeter Defense'] = ((1 - similarity1[1]['Perimeter Defense']) * 100).toFixed(2);
    dic['Defensive Rebounding'] = ((1 - similarity1[1]['Defensive Rebounding']) * 100).toFixed(2);
    dic['Offense_rank'] = similarity1[1]['Offense_rank'];
    dic['Defense_rank'] = similarity1[1]['Defense_rank'];
    dic['Scoring_rank'] = similarity1[1]['Scoring_rank'];
    dic['Playmaking_rank'] = similarity1[1]['Playmaking_rank'];
    dic['Offensive Rebounding_rank'] = similarity1[1]['Offensive Rebounding_rank'];
    dic['Paint Defense_rank'] = similarity1[1]['Paint Defense_rank'];
    dic['Perimeter Defense_rank'] = similarity1[1]['Perimeter Defense_rank'];
    dic['Defensive Rebounding_rank'] = similarity1[1]['Defensive Rebounding_rank']
    
    return dic;
}

function assignRanksToStats(similarityDic) {
    const stats = ['Similarity Score', 'Offense', 'Defense', 'Scoring', 'Playmaking', 'Offensive Rebounding', 'Paint Defense', 'Perimeter Defense', 'Defensive Rebounding'];

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

export {calculation, results, highlights};
