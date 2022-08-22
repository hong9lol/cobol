chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/js/init.js"],
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // sendResponse({ ack: "ok" });
        let html = httpGet(request.addr)
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = html;

        let toolbar = htmlObject.getElementsByClassName("pr-toolbar")[0]
        toolbar.removeAttribute("class")
        toolbar.removeAttribute("data-target")
        toolbar.removeAttribute("style")

        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(htmlObject)
    });
})

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}