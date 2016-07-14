var request = require('request');

function requestAsJson(url, callback){
    request(url,function(err, response){
    if(err){
        callback(err);
    }
    else{
        try{
            var parsedData = JSON.parse(response.body);
            callback(null, parsedData);
        }
        catch(e){
            callback(e);
        }
    }
        
    });
    
}

module.exports = requestAsJson;

