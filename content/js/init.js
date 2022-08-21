console.log("Start Content JS")

var commits = document.getElementsByClassName(
  "Link--primary text-bold js-navigation-open markdown-title"
);

console.log(commits);
for (var i = 0; i < commits.length; i++) {
  commits[i].onmouseover = function () {
    chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
      console.log(response.farewell);
    });
  };
}
