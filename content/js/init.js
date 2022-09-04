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
        let html = httpGet(this.href)
        chrome.runtime.sendMessage({ html: html }, function(ack) {
            // TODO
        });
    };
}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}