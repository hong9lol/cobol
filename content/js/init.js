console.log("Start Content JS")

if (document.URL.includes("github") == false || document.URL.includes("commits") == false) {
    alert("Github Commit Page에서만 동작합니다.")
}

var commits = document.getElementsByClassName(
    "Link--primary text-bold js-navigation-open markdown-title"
);

for (var i = 0; i < commits.length; i++) {
    commits[i].onmouseover = function() {
        console.log(this.href)
        chrome.runtime.sendMessage({ addr: this.href }, function(ack) {
            // TODO
        });
    };
}
s