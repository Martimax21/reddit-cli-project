//other files being accessed in main reddit function

var functions = require('./library/function');
var formatting = require('./library/format');
var siteMap = require('./library/site-map-function');

// Node modules
var request = require('request');
var inquirer = require('inquirer');
var clear = require('clear');
var emoji = require('node-emoji');
var clc = require('cli-color');

var imageToAscii = require("image-to-ascii");

// Main function for program! :D 
// inital prompt in reddit function asks user to choose a page from the main menu


function reddit() {
  // array of main menu choices for user to pick from.
  var menuChoices = [{
    name: 'Show homepage \n',
    value: 'HOMEPAGE'
  }, {
    name: 'Pick a subreddit \n',
    value: 'SUBREDDIT'
  }, {
    name: 'List subreddits \n',
    value: 'SUBREDDITS'
  }, {
    name: 'Quit',
    value: 'QUIT'
  }];
//user prompt to pick from menu
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: clc.bgBlueBright.yellowBright('What do you want to do? \n'),
    choices: menuChoices
  }).then(function(menuChoice) {

    // 4 main menu choices ('if' statement for each option):
    //HOMEPAGE OPTION
    if (menuChoice.menu === "HOMEPAGE") {
      functions.getHomepage(function(err, posts) {
        var listOfHMPosts = posts.map(formatting.formatList);
        
        //userPick function in site-map-function.js to handle user pick
        siteMap.userPick(listOfHMPosts, restartReddit);
      });
    }
    //SUBREDDIT OPTION
    else if (menuChoice.menu === "SUBREDDIT") {
      inquirer.prompt({
        name: 'choose',
        message: clc.bgRedBright.yellowBright('Pick a subreddit to display')
      }).then(function(subredditUserChoice) {
        functions.getSubreddit(subredditUserChoice.choose, function(err, posts) {
          var listOfUserSubredditPosts = posts.map(formatting.formatList);
          siteMap.userPick(listOfUserSubredditPosts, restartReddit);
        });
      });
    }
    //LIST OF SUBREDDITS OPTION
    else if (menuChoice.menu === "SUBREDDITS") {
      functions.getSubreddits(function(err, subreddits) {
        var subredditChoices = subreddits.map(formatting.formatList);
        //BACK OPTION (in array of subreddit options)
        subredditChoices.push({
          name: "Go back",
          value: "BACK"
        });
        //User chooses which subreddit from the list of options to look at
        inquirer.prompt({
          type: 'list',
          name: 'subredditMenu',
          message: clc.bgRedBright.yellowBright('Which subreddit do you want to pick?'),
          choices: subredditChoices
        }).then(function(answers) {
          //BACK OPTION (to main homepage)
          if (answers.subredditMenu === "BACK") {
            siteMap.mainMenuOrExit(restartReddit);
          }
          //If user chooses any option other than "BACK" (.: if they choose a subreddit):
          //Each subreddit object is formatted to show title, url, score, author.
          else {
            functions.getSubreddit(answers.subredditMenu.data.display_name, function(err, posts) {

              var listOfPosts = posts.map(formatting.formatList);
              // console.log(listOfPosts);
              siteMap.userPick(listOfPosts, restartReddit);
            });
          }
        });
      });
    }
    //To quit whole Reddit program, QUIT option (located in the main menu):
    else if (menuChoice.menu === "QUIT") {
      console.log(clc.bgCyanBright.whiteBright("Thanks for browsing! Have a really, really, really good day!"));
      return;
    }
  });
}

//whole program called:
reddit();

/* restartReddit is a callback function located in mainMenuOrExit to go back to 
main menu options (Homepage, subreddits, list of subreddits, quit)
*/
function restartReddit(err, res) {
  if (!err) {
    reddit();
  }
}



