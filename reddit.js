// Node modules

var functions = require('./library/function');
var formatting = require('./library/format');
var siteMap = require('./library/site-map-function');

var request = require('request');
var inquirer = require('inquirer');
var clear = require('clear');

var imageToAscii = require("image-to-ascii");
 


// array of main menu choices for user to pick from.

  


// Main function for program! :D 
// inital prompt in reddit function asks user to choose a page from the main menu


function reddit() {
  var menuChoices = [{
    name: 'Show homepage',
    value: 'HOMEPAGE'
  }, {
    name: 'Pick a subreddit',
    value: 'SUBREDDIT'
  }, {
    name: 'List subreddits',
    value: 'SUBREDDITS'
  }, {
    name: 'Quit',
    value: 'QUIT'
  }];
  
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
  }).then(function(menuChoice) {
    
// 4 main menu choices ('if' statement for each option):
  //HOMEPAGE OPTION
    if (menuChoice.menu === "HOMEPAGE") {
      functions.getHomepage(function(err, posts) {
        posts.map(formatting.formatPost).forEach(function(formattedPost) {
          console.log(formattedPost + "\n");
        });
        siteMap.mainMenuOrExit(restartReddit);
      });
    }
  //SUBREDDIT OPTION
    else if (menuChoice.menu === "SUBREDDIT") {
      inquirer.prompt({
        name: 'choose',
        message: 'Pick a subreddit to display'
      }).then(function(subredditUserChoice) {
        functions.getSubreddit(subredditUserChoice.choose, function(err, posts) {
          posts.map(formatting.formatPost).forEach(function(formattedPost) {
            console.log(formattedPost + "\n");
          });
          siteMap.mainMenuOrExit(restartReddit);
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
            message: 'Which subreddit do you want to pick?',
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
                
                inquirer.prompt({
                  type: "list", 
                  name: "subredditChoicePages",
                  message: "What do you feel like reading?",
                  choices: listOfPosts
                }).then(function(answers) {
                  clear();
                  console.log("title: " + answers.subredditChoicePages.data.title + "\n");
                  console.log("Username: " + answers.subredditChoicePages.data.author + "\n");
                  
                  if(answers.subredditChoicePages.data.url.indexOf(".jpg") > -1) {
                    imageToAscii(answers.subredditChoicePages.data.url, (err, converted) => {
                    console.log(err || converted);
                    });
                  }
                  else if(answers.subredditChoicePages.data.url.indexOf(".jpeg") > -1) {
                    imageToAscii(answers.subredditChoicePages.data.url, (err, converted) => {
                    console.log(err || converted);
                    });
                  }
                  else if(answers.subredditChoicePages.data.url.indexOf(".png") >1) {
                    imageToAscii(answers.subredditChoicePages.data.url, (err, converted) => {
                    console.log(err || converted);
                    });
                  }
                  else if(answers.subredditChoicePages.data.url.indexOf(".gif") >1) {
                    imageToAscii(answers.subredditChoicePages.data.url, (err, converted) => {
                    console.log(err || converted);
                    });
                  }
                  else {
                    console.log("URL: " + answers.subredditChoicePages.data.url + "\n");
                  }
                  setTimeout(function() {
                     siteMap.mainMenuOrExit(restartReddit);
                   }, 3000);
                
                })
                
                
              });
            }
          });
      });
    }
    //To quit whole Reddit program, QUIT option (located in the main menu):
    else if (menuChoice.menu === "QUIT") {
      console.log("Thanks for browsing! Have a really, really, really good day!");
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

// Feature: post selection and “image” display :star::star:

// When the user is shown a list of posts, instead of going back to the main menu every
// post should be selectable – again using inquirer. When selecting a post, the terminal screen 
// should be cleared and only that post should be displayed (title + url + username). In addition to this,
// if the URL of the post turns out to be an image – ends in .jpg, .gif or .png – you should use the image-to-ascii 
// module to load the image and display it on the command line. After the post details are displayed, you should
// show the main menu again.




