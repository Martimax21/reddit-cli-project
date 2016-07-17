var request = require('request');
var requestAsJson = require('./requestjson.js');
var imageToAscii = require("image-to-ascii");

// if post's URL ends in or contains .jpd, .jpeg, .png, image will be shown in ASCII characters
function displayImage(userPick) {
  var userPickLowerCase = userPick.toLowerCase();
  if (userPickLowerCase.indexOf(".jpg") > -1 || userPickLowerCase.indexOf(".jpeg") > -1 ||
    userPickLowerCase.indexOf(".png") > -1) {

    imageToAscii(userPick, (err, converted) => {
      console.log(err || converted);
    });
  }
  else {
    console.log("URL: " + userPick + "\n");
  }
  
//function to access comments listed in post. Function called in userPick (site-map-function.js)  
}
 function getComments(answerChoice, callback) {
   var URLcomments = ("https://www.reddit.com/" + answerChoice + ".json");
   requestAsJson(URLcomments, function(err, commentsParsed) {
     if (err) {
       console.log("Whoops! It is not a valid category.");
     }
     else {
      var commentObjects = commentsParsed[1].data.children;
      callback(null, commentObjects);
     }
   });
 }


  
// }
 
/*
These are all functions used to access different pages on Reddit, such as
Homepage, Subreddits categories, user's choice of Subreddit and sorted version
of these pages.
*/

/* getHomepage uses requestAsJson to parse the .json homepage and returns 
the callback with an array of objects; each object is a reddit 
post on the homepage. 
*/

function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  var URLHomepage = "https://www.reddit.com/.json";
  requestAsJson(URLHomepage,function(err, homepageParsed) {
   if(err) {
     console.log("Whoops!");
   }
   else {
     var homepageObjects = homepageParsed.data.children;
    // children is an object that contains the array of data objects that 
    //we are looking for and children is a property of the "first" object data
     callback(null,homepageObjects);
   }
   
 });
}
// function getComments(callback) {
//             var URLcomments = ("https://www.reddit.com/" + answers.displayChoices.data.permalink);
//             console.log(URLcomments);
//             requestAsJson(URLcomments, function(err, commentsParsed) {
//               if (err) {
//                 console.log("Whoops! It is not a valid category.");
//                 console.log("here is the bug");
//               }
//               else {
//                 var commentObjects = commentsParsed[1].data.children;
//                 console.log(commentObjects);
//                 callback(null, commentObjects);
//               }
//             });
//           }

//getHomepage(function(err, res){
//  console.log(res);
//})



/*
getSortedHomepage "returns" the default homepage posts as an array of 
objects. In contrast to the `getHomepage` function, this one accepts a 
`sortingMethod` parameter. The sorting method can be any of the "tabs" 
on the reddit homepage
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var URLHomepageSorted = "https://www.reddit.com/" + sortingMethod + ".json";
  requestAsJson(URLHomepageSorted, function(err, sortedHomepageParsed) {
        if (err) {
          console.log("Whoops! It is not a valid category.");
        }
        else {
          var sortedHomepageObjects = sortedHomepageParsed.data.children;
          callback(null, sortedHomepageObjects);
        }

  });    
}



/*
The getSubreddit function "returns" the posts on the front page of a subreddit 
as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  var URLSubreddit = "https://www.reddit.com/r/" + subreddit + ".json";
  requestAsJson(URLSubreddit, function(err, subredditChoiceParsed) {
    if (err) {
      console.log("Whoops! It is not a valid subreddit.");
    }
    else {
      var subredditObjects = subredditChoiceParsed.data.children;
      callback(null, subredditObjects);
    }

  });
}


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var URLSubRSortingMethod = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + ".json";
  requestAsJson(URLSubRSortingMethod, function(err, sortedSubredditParsed) {
    if (err) {
      console.log("Whoops! It is not a valid method or subreddit.");
    }
    else {
      var sortedSubredditObjects = sortedSubredditParsed.data.children;
      callback(null, sortedSubredditObjects);
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
  requestAsJson(URLSubreddit, function(err, subredditListParsed) {
    if (err) {
      console.log("Whoops! It is not a valid subreddit.");
    }
    else {
      var subredditList = subredditListParsed.data.children;
      callback(null, subredditList);
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
    getSortedSubreddit : getSortedSubreddit,
    displayImage : displayImage,
    getComments : getComments
};