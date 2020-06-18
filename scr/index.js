var activeTabs = {};

chrome.browserAction.onClicked.addListener((tab) => {
   
   if(!activeTabs[tab.id]) {
   	activeTabs[tab.id] = true;
   }
   else {
   	activeTabs[tab.id] = false;
   }

   const active = activeTabs[tab.id];
   const icon = active ? "icon-active.png" : "icon-inactive.png";

   chrome.browserAction.setIcon({ path: icon, tabId: tab.id });

   chrome.tabs.executeScript(null, { file: "alt.js" });
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {

   const active = activeTabs[tab.id];
   const icon = active ? "icon-active.png" : "icon-inactive.png";

   chrome.browserAction.setIcon({ path: icon, tabId: tab.id });

   if(active) {
      chrome.tabs.executeScript(null, { file: "alt.js" });
   }

});