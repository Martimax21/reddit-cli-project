var inquirer = require('inquirer');

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];

inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answers) {
    if (answers === "HOMEPAGE") {
        getHomepage()
    };
  }
);


var commentObjects = commentsParsed[1].data.children;
      var listOfComments = commentObjects.map(function(comment){
        var repliesLev1 = comment.data.replies.data.children.map(function(reply){
          var repliesLev2 = reply.data.replies.data.children.map(function (reply2){
              return reply2.data.body;
          })
          return [reply.data.body, repliesLev2];
        })
        return repliesLev1.unshift(comment.data.body);
      });
          
        var listOfReplyLev1 =commentObjects
          //.foreach(function(commentReply){
          //   console.log(commentReply + "\n")
          // });
          console.log("comments: " + comment.data.body);
          console.log("replies:" + mappedReplies);
//          console.log("BUGGG");
//         return comment.data.body;
        });
        
        
        //           var mappedReplies = comment.data.replies.data.children.map(function(reply){
//           return reply.data.body;
//           })
//           //.foreach(function(commentReply){
//           //   console.log(commentReply + "\n")
//           // });
//           console.log("comments: " + comment.data.body);
//           console.log("replies:" + mappedReplies);
// //          console.log("BUGGG");
// //         return comment.data.body;
//         });
