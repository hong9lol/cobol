chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
});

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs)
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/js/init.js"],
      });
})