chrome.runtime.onInstalled.addListener((_reason) => {
  chrome.tabs.create({
    url: "setting/index.html",
    // for test
    url: 'https://github.com/hong9lol/ad-project/commits/main/ad-python/templates'
  });
});
