async function loadAndParseCSV(filePath) {
    const response = await fetch(filePath);
    const csvText = await response.text();
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
    const headers = lines.shift().split(',');
    return lines.map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
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
    const playersDf = await loadAndParseCSV('/player_data.csv');
    console.log(typeof playersDf, playersDf);
    if (playersDf) {
        playersDf.forEach(playerDf => {
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
            let Oreb = Math.abs(personDict['OREB_PCT_percentile'] - playerDf['OREB_PCT_percentile']);
            let Paint = (Math.abs(personDict['Paint_defense_volume_pm_percentile'] - playerDf['Paint_defense_volume_pm_percentile']) + 
                        Math.abs(personDict['Paint_defense_deterance_percentile'] - playerDf['Paint_defense_deterance_percentile'])) / 2;
            let Perimeter = (Math.abs(personDict['Perimeter_defense_volume_pm_percentile'] - playerDf['Perimeter_defense_volume_pm_percentile']) + 
                            Math.abs(personDict['Perimeter_defense_deterance_percentile'] - playerDf['Perimeter_defense_deterance_percentile'])) / 2;
            let Dreb = Math.abs(personDict['DREB_PCT_percentile'] - playerDf['DREB_PCT_percentile']);

            let Offense = ((Scoring * 12) + (Playmaking * 6.5) + Oreb) / 19.5;
            let Defense = ((Paint * 8.5) + (Perimeter * 8.5) + (Dreb * 2.5)) / 19.5;

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
    console.log(similarityDic);
    return similarityDic;


}

function results(similarityDic) {
    let dic = {};
    let similarity10 = Object.entries(similarityDic)
                             .sort((a, b) => a[1]['Similarity Score'] - b[1]['Similarity Score'])
                             .slice(0, 10);
    similarity10.forEach((item, index) => {
        // Use player's name and adjust the similarity score
        console.log(item[0], item[1]['Similarity Score']);
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
    delete similarity1[1]['Offense'];
    delete similarity1[1]['Defense'];

    // Find the key of the minimum and maximum value in the similarity1[1] dictionary
    let keyOfMinValue = Object.keys(similarity1[1]).reduce((a, b) => similarity1[1][a] < similarity1[1][b] ? a : b);
    let keyOfMaxValue = Object.keys(similarity1[1]).reduce((a, b) => similarity1[1][a] > similarity1[1][b] ? a : b);
    dic['Most_similar_value'] = `(${keyOfMinValue}, ${((1 - similarity1[1][keyOfMinValue]) * 100).toFixed(2)})`;
    dic['Least_similar_value'] = `(${keyOfMaxValue}, ${((1 - similarity1[1][keyOfMaxValue]) * 100).toFixed(2)})`;
    return dic;
}


export { calculation, results, highlights };
