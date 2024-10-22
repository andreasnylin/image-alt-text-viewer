var activeTabs = {};

chrome.action.onClicked.addListener((tab) => {
   
   if(!activeTabs[tab.id]) {
   	activeTabs[tab.id] = true;
   }
   else {
   	activeTabs[tab.id] = false;
   }

   const active = activeTabs[tab.id];
   const icon = active ? "icon-active.png" : "icon-inactive.png";

   chrome.action.setIcon({ path: icon, tabId: tab.id });

   //chrome.tabs.executeScript(null, { file: "alt.js" });

   chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['alt.js']
    });
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {

   const active = activeTabs[tab.id];
   const icon = active ? "icon-active.png" : "icon-inactive.png";

   chrome.action.setIcon({ path: icon, tabId: tab.id });

   if(active) {
      chrome.scripting.executeScript({
         target: {tabId: tab.id},
         files: ['alt.js']
       });
   }

});