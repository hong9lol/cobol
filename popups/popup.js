chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/js/init.js"],
    });

    chrome.cookies.getAll({
        url: "https://www.naver.com"
    }, function(theCookies) {
        cookies = theCookies
        console.log(cookies)
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        document.body.style.minWidth = "800px";
        let html = httpGet(request.addr)

        htmlDocument = document.implementation.createHTMLDocument("Cobol");
        htmlDocument.body.innerHTML = html

        removeComponentWithClassName("Header");
        removeComponentWithClassName("Header-old");
        removeComponentWithClassName("Layout-sidebar");
        removeComponentWithClassName("thread-subscription-status");
        removeComponentWithClassName("footer");
        removeComponentWithClassName("pr-toolbar");
        removeComponentClassWithClassName("Layout");
        removeComponentWithId("repository-container-header")
        removeComponentWithId("toc")
        removeComponentWithId("all_commit_comments")

        btn = htmlDocument.getElementsByClassName("btn btn-outline float-right")
        if (btn.length > 0) {
            btn[0].style.visibility = "hidden";
        }

        aTags = htmlDocument.getElementsByTagName("a")
        for (i = 0; i < aTags.length; i++) { aTags[i].setAttribute("href", "") }

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

function removeComponentWithClassName(name) {
    comp = htmlDocument.getElementsByClassName(name)
    if (comp.length > 0) {
        for (i = 0; i < comp.length; i++) {
            comp[i].innerHTML = ''
            comp[i].removeAttribute("class")
        }
    }
}

function removeComponentClassWithClassName(name) {
    comp = htmlDocument.getElementsByClassName(name)
    if (comp.length > 0) {
        for (i = 0; i < comp.length; i++) {
            comp[i].removeAttribute("class")
        }
    }
}

function removeComponentWithId(id) {
    comp = htmlDocument.getElementById(id)
    if (comp != null) {
        comp.innerHTML = ''
        comp.removeAttribute("class")
    }
}