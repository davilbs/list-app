module.exports = getWeatherData;
const https = require('https');

function getWeatherData(){
    let finalData = [];
    let collectData = function(data){
        finalData.push(data);
    };
    
    const getData = function(collectData){
        let url = "https://api.openweathermap.org/data/2.5/weather?q=Belo Horizonte&appid=6d6655785eff82bcb5b9dc7d71df6229&units=metric";
        let mydata = [];
        https.get(url, (resp) => {
            let insideData = '';
            resp.on('data', (data) => {
                insideData = data;
            });
            resp.on('end', async () => {
                await collectData(JSON.parse(insideData));
            });
        });
    }
    
    getData(collectData);
    return finalData;
}
