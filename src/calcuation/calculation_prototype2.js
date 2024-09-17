const dfd = require("danfojs-node");

// Replace 'player_data.csv' with the path to your CSV file
dfd.read_csv("../data/player_data.csv").then(df => {
    const myDict = {
        'AST_PCT_percentile': 0.5, 
        'DREB_PCT_percentile' : 0.5,
        'OREB_PCT_percentile' : 0.5, 
        'TOV_PCT_percentile' : 0.5,
        'Midrange_volume_pm_percentile' : 0.5, 
        'Midrange_efficiency_percentile' : 0.5,
        'Paint_volume_pm_percentile' : 0.5, 
        'Paint_efficiency_percentile': 0.5,
        'Corner_volume_pm_percentile': 0.5, 
        'Corner_efficiency_percentile': 0.5,
        'Above_the_break_volume_pm_percentile': 0.5,
        'Above_the_break_efficiency_percentile': 0.5, 
        'Tight_volume_pm_percentile': 0.5,
        'Tight_efficiency_percentile': 0.5, 
        'Open_volume_pm_percentile': 0.5,
        'Open_efficiency_percentile': 0.5, 
        'Catch_and_Shoot_Volume_percentile': 0.5,
        'Catch_and_Shoot_Efficiency_percentile': 0.5, 
        'Pull_up_Volume_percentile': 0.5,
        'Pull_up_Efficiency_percentile': 0.5, 
        'Paint_defense_volume_pm_percentile': 0.5,
        'Paint_defense_deterance_percentile': 0.5,
        'Perimeter_defense_volume_pm_percentile': 0.5,
        'Perimeter_defense_deterance_percentile': 0.5
    };

    function calculation(personDict, playersDf) {
        let similarityScores = {};

        playersDf.iterrows().forEach(row => {
            let playerDf = row[1];

            let scoring = (
                (
                    Math.abs(personDict['Paint_volume_pm_percentile'] - playerDf['Paint_volume_pm_percentile']) +
                    Math.abs(personDict['Paint_efficiency_percentile'] - playerDf['Paint_efficiency_percentile']) +
                    Math.abs(personDict['Midrange_volume_pm_percentile'] - playerDf['Midrange_volume_pm_percentile']) +
                    Math.abs(personDict['Midrange_efficiency_percentile'] - playerDf['Midrange_efficiency_percentile']) +
                    Math.abs(personDict['Corner_volume_pm_percentile'] - playerDf['Corner_volume_pm_percentile']) +
                    Math.abs(personDict['Corner_efficiency_percentile'] - playerDf['Corner_efficiency_percentile']) +
                    Math.abs(personDict['Above_the_break_volume_pm_percentile'] - playerDf['Above_the_break_volume_pm_percentile']) +
                    Math.abs(personDict['Above_the_break_efficiency_percentile'] - playerDf['Above_the_break_efficiency_percentile'])
                ) / 2 +
                Math.abs(personDict['Tight_efficiency_percentile'] - playerDf['Tight_efficiency_percentile']) +
                Math.abs(personDict['Tight_volume_pm_percentile'] - playerDf['Tight_volume_pm_percentile']) +
                Math.abs(personDict['Open_volume_pm_percentile'] - playerDf['Open_volume_pm_percentile']) +
                Math.abs(personDict['Open_efficiency_percentile'] - playerDf['Open_efficiency_percentile']) +
                Math.abs(personDict['Catch_and_Shoot_Efficiency_percentile'] - playerDf['Catch_and_Shoot_Efficiency_percentile']) +
                Math.abs(personDict['Catch_and_Shoot_Volume_percentile'] - playerDf['Catch_and_Shoot_Volume_percentile']) +
                Math.abs(personDict['Pull_up_Volume_percentile'] - playerDf['Pull_up_Volume_percentile']) +
                Math.abs(personDict['Pull_up_Efficiency_percentile'] - playerDf['Pull_up_Efficiency_percentile'])
            ) / 12;

            let playmaking = (
                Math.abs(personDict['AST_PCT_percentile'] - playerDf['AST_PCT_percentile']) +
                Math.abs(personDict['TOV_PCT_percentile'] - playerDf['TOV_PCT_percentile'])
            ) / 2;

            let oreb = Math.abs(personDict['OREB_PCT_percentile'] - playerDf['OREB_PCT_percentile']);
            
            let paint = (
                Math.abs(personDict['Paint_defense_volume_pm_percentile'] - playerDf['Paint_defense_volume_pm_percentile']) +
                Math.abs(personDict['Paint_defense_deterance_percentile'] - playerDf['Paint_defense_deterance_percentile'])
            ) / 2;

            let perimeter = (
                Math.abs(personDict['Perimeter_defense_volume_pm_percentile'] - playerDf['Perimeter_defense_volume_pm_percentile']) +
                Math.abs(personDict['Perimeter_defense_deterance_percentile'] - playerDf['Perimeter_defense_deterance_percentile'])
            ) / 2;

            let dreb = Math.abs(personDict['DREB_PCT_percentile'] - playerDf['DREB_PCT_percentile']);

            let offense = ((scoring * 12) + (playmaking * 6.5) + oreb) / 19.5;
            let defense = ((paint * 8.5) + (perimeter * 8.5) + (dreb * 2.5)) / 19.5;

            similarityScores[playerDf['first_name'] + ' ' + playerDf['last_name']] = (offense + defense) / 2;
        });

        return similarityScores;
    }

    let similarityScores = calculation(myDict, df);
    let sortedScores = Object.entries(similarityScores).sort((a, b) => a[1] - b[1]);
    console.log(sortedScores);
});
