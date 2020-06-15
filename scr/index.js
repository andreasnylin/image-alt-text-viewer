var activeTabs = {};

chrome.browserAction.onClicked.addListener((tab) => {
   chrome.tabs.executeScript(null, {file: "alt.js"});

   if(!activeTabs[tab.id]) {
   	activeTabs[tab.id] = true;
   }
   else {
   	activeTabs[tab.id] = false;
   }

   var active = activeTabs[tab.id];

   const icon = active ? "icon-active.png" : "icon-inactive.png";

   chrome.browserAction.setIcon({ path: icon, tabId: tab.id });
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {

   var active = activeTabs[tab.id];

   const icon = active ? "icon-active.png" : "icon-inactive.png";

   chrome.browserAction.setIcon({ path: icon, tabId: tab.id });

});