chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/js/init.js"],
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        let html = httpGet(request.addr)

        htmlDocument = document.implementation.createHTMLDocument("Cobol");
        htmlDocument.body.innerHTML = html

        header = htmlDocument.getElementsByClassName("Header")[0]
        header.innerHTML = ''
        header.removeAttribute("class")

        containerHeader = htmlDocument.getElementById("repository-container-header")
        containerHeader.innerHTML = ''
        containerHeader.removeAttribute("class")

        sidebar = htmlDocument.getElementsByClassName("Layout")[0]
        sidebar.removeAttribute("class")

        sidebarCtx = htmlDocument.getElementsByClassName("Layout-sidebar")[0]
        sidebarCtx.innerHTML = ''
        sidebarCtx.removeAttribute("class")

        htmlDocument.getElementsByClassName("btn btn-outline float-right")[0].style.visibility = "hidden";

        toc = htmlDocument.getElementById("toc")
        toc.innerHTML = ''
        toc.removeAttribute("class")

        comment = htmlDocument.getElementById("all_commit_comments")
        comment.innerHTML = ''
        comment.removeAttribute("class")

        subscription = htmlDocument.getElementsByClassName("thread-subscription-status")[0]
        subscription.innerHTML = ''
        subscription.removeAttribute("class")

        footer = htmlDocument.getElementsByClassName("footer")[0]
        footer.innerHTML = ''
        footer.removeAttribute("class")

        aTags = htmlDocument.getElementsByTagName("a")
        for (i = 0; i < aTags.length; i++) { aTags[i].setAttribute("href", "") }

        let toolbar = htmlDocument.getElementsByClassName("pr-toolbar")[0]
        toolbar.removeAttribute("class")
        toolbar.removeAttribute("data-target")
        toolbar.removeAttribute("style")

        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(htmlDocument.body)
    });
})

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}