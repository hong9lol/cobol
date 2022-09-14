chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/js/init.js"],
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        document.body.style.minWidth = "800px";

        htmlDocument = document.implementation.createHTMLDocument("Cobol");
        htmlDocument.body.innerHTML = request.html

        removeComponentWithClassName("Header");
        removeComponentWithClassName("Header-old");
        removeComponentWithClassName("file-header");
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