var request = require('request');
var requestAsJson = require('./requestjson.js');


/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  // TODO: REPLACE request with requestAsJson!
  var URLHomepage = "https://www.reddit.com/.json";
  requestAsJson(URLHomepage,function(err, res) {
   if(err) {
     console.log("Whoops!");
   }
   else {
     var homepageObjects = res.data.children;
    // children is an object that contains the array of data objects that 
    //we are looking for and children is a property of the "first" object data
     callback(null,homepageObjects);
   }
   
 });
}

//getHomepage(function(err, res){
//  console.log(res);
//})



/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var URLHomepageSorted = "https://www.reddit.com/" + sortingMethod + ".json";
  requestAsJson(URLHomepageSorted, function(err, res) {
        if (err) {
          console.log("Whoops! It is not a valid category.");
        }
        else {
          var homepageObjects = res.data.children;
          callback(null, homepageObjects);
        }

  });    
}

// getSortedHomepage("controversial", function(err, res) {
//   console.log(res);
// })

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  var URLSubreddit = "https://www.reddit.com/r/" + subreddit + ".json";
  requestAsJson(URLSubreddit, function(err, res) {
    if (err) {
      console.log("Whoops! It is not a valid subreddit.");
    }
    else {
      var homepageObjects = res.data.children;
      callback(null, homepageObjects);
    }

  });
}
//getSubreddit("funny", function (err, res) {
 // console.log(res);
//})

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var URLSubRSortingMethod = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + ".json";
  requestAsJson(URLSubRSortingMethod, function(err, res) {
    if (err) {
      console.log("Whoops! It is not a valid method or subreddit.");
    }
    else {
      var homepageObjects = res.data.children;
      callback(null, homepageObjects);
    }

  });
}
// getSortedSubreddit("funny","controversial",function (err, res) {
//   console.log(res);
// })
/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
  var URLSubreddit = "https://www.reddit.com/subreddits.json";
  requestAsJson(URLSubreddit, function(err, res) {
    if (err) {
      console.log("Whoops! It is not a valid subreddit.");
    }
    else {
      var homepageObjects = res.data.children;
      callback(null, homepageObjects);
    }

  });
}

// getSubreddits(function (err, res) {
// console.log(res);
// })

// Export the API
module.exports = {
    getHomepage : getHomepage,
    getSortedHomepage : getSortedHomepage,
    getSubreddit : getSubreddit,
    getSubreddits : getSubreddits,
    getSortedSubreddit : getSortedSubreddit
};