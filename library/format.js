
function formatPost(post) {
  return [
    "Title: " + post.data.title,
    "URL: " + post.data.url,
    "Score: " + post.data.score,
    "Username: "  + post.data.author
  ].join("\n");
}
// function formatComment(comment) {
//   return [
//     "Comment: " + comment.data.body,
//     "Reply1: " + post.data.,
//     "Score: " + post.data.score,
//     "Username: "  + post.data.author
//   ].join("\n");
// }
function formatList(item) {
  return {
    name: item.data.title,
    value: item
  };
}
function formatSubredditPost(post) {
  return [
    "Title: " + post.data.title,
    "URL: " + post.data.url,
    "Username: "  + post.data.author
  ].join("\n");
}

module.exports = {
    formatPost: formatPost,
    formatList: formatList,
    formatSubredditPost: formatSubredditPost
};
