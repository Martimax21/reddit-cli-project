var functions = require('./library/function.js');


//getHomepage(function(err, res){
//  console.log(res);
//})

var request = require('request');
var inquirer = require('inquirer');

// Basic feature: the homepage posts

// When the user chooses the homepage option, you should display the list of posts from the getHomepage 
// function you created previously. For each post, list at least some of the info that appears on reddit: 
// title, url, votes, username. After the list of posts is displayed, you should display the main menu again.

function reddit() {
  var menuChoices = [{
    name: 'Show homepage',
    value: 'HOMEPAGE'
  }, {
    name: 'Show subreddit',
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
  }).then(function(answers) {
    if (answers.menu === "HOMEPAGE") {
      functions.getHomepage(function(err, res) {
        res.forEach(function(array) {
          console.log("Title: " + array.data.title);
          console.log("URL: " + array.data.url);
          console.log("Score: " + array.data.score);
          console.log("Author: " + array.data.author);
        });
        reddit();
      });
    }
    else if (answers.menu === "SUBREDDIT") {
      inquirer.prompt({
        name: 'choose',
        message: 'choose your SubReddit'
      }).then(function(answers) {
        functions.getSubreddit(answers.choose, function(err, res) {
          res.forEach(function(array) {
            console.log("Title: " + array.data.title);
            console.log("URL: " + array.data.url);
            console.log("Score: " + array.data.score);
            console.log("Author: " + array.data.author);

          });

        });
        reddit();
      })
    }
    else if (answers.menu === "SUBREDDITS") {
      functions.getSubreddits(function(err, res) {
        var subredditChoices = res.map(function(array) {
          return {
            name: array.data.title,
            value: array
          }
        });


        inquirer.prompt({
          type: 'list',
          name: 'subredditMenu',
          message: 'Which subreddit do you want to pick?',
          choices: subredditChoices
        }).then(function(answers) {
          var displayName = answers.subredditMenu.data.display_name;
          var URLSubreddit = "https://www.reddit.com/r/" + displayName + ".json";
        functions.getSubreddit(displayName, function(err, res) {
        res.forEach(function(array) {
            console.log("Title: " + array.data.title);
            console.log("URL: " + array.data.url)
                        console.log("Score: " + array.data.score);
          console.log("Author: " + array.data.author);
          });
        });

        });

      })
    }
    else if (answers.menu === "QUIT") {
      console.log("Thanks for browsing! Have a really, really, really good day!")
      return;
    }
  });
}

reddit();

// Basic feature: the homepage posts
// When the user chooses the homepage option, you should display the list of posts from the getHomepage 
// function you created previously. For each post, list at least some of the info that appears on reddit: 
// title, url, votes, username. After the list of posts is displayed, you should display the main menu again.

// Basic feature: subreddit posts
// When the user chooses the subreddit posts option, you should ask him – again using inquirer – which subreddit
// he wants to see. Then, display the list of posts in the same way as the homepage.

// Feature: list of subreddits :star:
// When the user chooses the list of subreddits option, you should load the list of subreddits using the 
// getSubreddits function you created previously. Then, using inquirer, show the list of subreddits to the user. 
// The user will be able to choose a subreddit to display its posts, or go back to the main menu. You can use an 
// Inquirer Separator to create a visual separation between the list of subreddits and the “go back to main menu” 
// option.


// inquirer.prompt({
//           type: 'list',
//           name: 'menu',
//           message: 'What do you want to do?',
//           choices: choices
//         }).then(function(answers) {
//           console.log(answers)
//         })

// res.forEach(function(array) {
//             console.log("Title: " + array.data.title);
//             console.log("URL: " + array.data.url);
//             console.log("Score: " + array.data.score);
//             console.log("Author: " + array.data.author);
//           });