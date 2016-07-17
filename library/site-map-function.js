var inquirer = require("inquirer");
var clear = require('clear');
var functions = require('./function');
var requestAsJson = require('./requestjson.js');
var wrap = require('word-wrap');

var redditMain = require("./../reddit.js")

// function called at end of every page user gets to which gives them the option
///... to go back to the main menu or to exit the program.

function mainMenuOrExit(callback) {
  var returnMenuChoices = [{
    name: 'Go back to main menu',
    value: 'MAINMENU'
  }, {
    name: 'Exit Reddit',
    value: 'QUIT'
  }];
  inquirer.prompt({
    type: 'list',
    name: 'exitMenu',
    message: 'Do you want to exit or to go back to the main Reddit Menu?',
    choices: returnMenuChoices
  }).then(function(answers) {
    if (answers.exitMenu === "QUIT") {
      console.log(clc.bgCyanBright.whiteBright("Thanks for browsing! Have a damn good day!"));
      return;
    }
    else {
      callback();
    }
  });
}

function userPick(listOfPick, callback) {
  inquirer.prompt({
    type: "list",
    name: "displayChoices",
    message: "What do you feel like reading?",
    choices: listOfPick
  }).then(function(answers) {
    clear();
    console.log("title: " + answers.displayChoices.data.title + "\n");
    console.log("Username: " + answers.displayChoices.data.author + "\n");
    var userPagePick = answers.displayChoices.data.url;
    functions.displayImage(userPagePick);

    //console.log("URL: " + answers.displayChoices.data.url + "\n");
    // posts.map(formatting.formatPost).forEach(function(formattedPost) {
    //   console.log(formattedPost + "\n");
    var commentsLink = answers.displayChoices.data.permalink;

    functions.getComments(commentsLink, function(err, comments) {
      
      function getReplies(arr, level){
        arr.forEach(function(reply){
          var indent = '';
          for(var i = 0; i < level; i++){
            indent = indent + '   ';
          }
          
          if(reply.data.body){
            console.log(wrap(reply.data.body, {indent: indent}));
          }
          if(reply.data.replies) {
            getReplies(reply.data.replies.data.children, level + 1);
          }
        });
      }
      
      getReplies(comments, 1);
      
      
    });

    setTimeout(function() {
      mainMenuOrExit(callback);
    }, 6000);
  });
}




module.exports = {
  mainMenuOrExit: mainMenuOrExit,
  userPick: userPick
};