// Copyright 2021 Google LLC
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

// background.js
// Show the demo page once the extension is installed
chrome.runtime.onInstalled.addListener((_reason) => {
  chrome.tabs.create({
    url: 'setting/index.html'
    // for test
    // url: 'https://github.com/hong9lol/ad-project/commits/main'
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // sample message 
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
}
);

