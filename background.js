chrome.runtime.onInstalled.addListener((_reason) => {
    chrome.tabs.create({
        url: 'https://github.com/hong9lol/cobol/blob/main/README.md'
    });
});