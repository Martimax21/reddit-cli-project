var request = require('request');

function requestJson(url,callback){
    require(url,function(err,response){
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

