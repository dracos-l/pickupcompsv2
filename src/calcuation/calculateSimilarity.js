const dfd = require("danfojs-node");

// Load your CSV file
let df;
dfd.read_csv("../data/player_data.csv").then(dataFrame => {
    df = dataFrame;
});

function calculation(personDict, playersDf) {
    let similarityDic = {};
    
    playersDf.iterrows().forEach(row => {
        let playerDf = row[1];
        let Scoring = ((Math.abs(personDict['Paint_volume_pm_percentile'] - playerDf['Paint_volume_pm_percentile']) + 
                        Math.abs(personDict['Paint_efficiency_percentile'] - playerDf['Paint_efficiency_percentile']) + 
                        Math.abs(personDict['Midrange_volume_pm_percentile'] - playerDf['Midrange_volume_pm_percentile']) + 
                        Math.abs(personDict['Midrange_efficiency_percentile'] - playerDf['Midrange_efficiency_percentile']) + 
                        Math.abs(personDict['Corner_volume_pm_percentile'] - playerDf['Corner_volume_pm_percentile']) + 
                        Math.abs(personDict['Corner_efficiency_percentile'] - playerDf['Corner_efficiency_percentile']) + 
                        Math.abs(personDict['Above_the_break_volume_pm_percentile'] - playerDf['Above_the_break_volume_pm_percentile']) + 
                        Math.abs(personDict['Above_the_break_efficiency_percentile'] - playerDf['Above_the_break_efficiency_percentile'])
                        ) / 2) + (Math.abs(personDict['Tight_efficiency_percentile'] - playerDf['Tight_efficiency_percentile']) + 
                        Math.abs(personDict['Tight_volume_pm_percentile'] - playerDf['Tight_volume_pm_percentile']) + 
                        Math.abs(personDict['Open_volume_pm_percentile'] - playerDf['Open_volume_pm_percentile']) + 
                        Math.abs(personDict['Open_efficiency_percentile'] - playerDf['Open_efficiency_percentile'])) + 
                        (Math.abs(personDict['Catch_and_Shoot_Efficiency_percentile'] - playerDf['Catch_and_Shoot_Efficiency_percentile']) + 
                        Math.abs(personDict['Catch_and_Shoot_Volume_percentile'] - playerDf['Catch_and_Shoot_Volume_percentile']) + 
                        Math.abs(personDict['Pull_up_Volume_percentile'] - playerDf['Pull_up_Volume_percentile']) + 
                        Math.abs(personDict['Pull_up_Efficiency_percentile'] - playerDf['Pull_up_Efficiency_percentile'])) / 12;
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
            'Oreb': Oreb,
            'Paint': Paint,
            'Perimeter': Perimeter,
            'Dreb': Dreb,
            'Offense': Offense,
            'Defense': Defense
        };

        similarityDic[playerDf['first_name'] + ' ' + playerDf['last_name']] = playerStats;
    });

    return similarityDic;
}

function results(similarityDic) {
    let dic = {};
    let similarity10 = Object.entries(similarityDic)
                             .sort((a, b) => a[1]['Similarity Score'] - b[1]['Similarity Score'])
                             .slice(0, 10);
    similarity10.forEach((item, index) => {
        dic['Player ' + (index + 1)] = (item[0], item[1]['Similarity Score']);
    });
    return dic;
}

function highlights(similarityDic) {
    let dic = {};
    let similarity1 = Object.entries(similarityDic)
                            .sort((a, b) => a[1]['Similarity Score'] - b[1]['Similarity Score'])[0];
    dic['Offense_value'] = similarity1[1]['Offense'];
    dic['Defense_value'] = similarity1[1]['Defense'];
    delete similarity1[1]['Offense'];
    delete similarity1[1]['Defense'];
    let keyOfMinValue = Object.keys(similarity1[1]).reduce((a, b) => similarity1[1][a] < similarity1[1][b] ? a : b);
    let keyOfMaxValue = Object.keys(similarity1[1]).reduce((a, b) => similarity1[1][a] > similarity1[1][b] ? a : b);
    dic['Min_value'] = [keyOfMinValue, similarity1[1][keyOfMinValue]];
    dic['Max_value'] = [keyOfMaxValue, similarity1[1][keyOfMaxValue]];

    return dic;
}
