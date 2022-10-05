const extensions = /.*\.bilibili\.com\//;

/*
function homeClear(){
  document.getElementsByClassName("nav-search-keyword")[0].placeholder = "";
  var banner = document.getElementsByClassName("bili-banner")[0];
  banner.style.backgroundImage = 'url("https://raw.githubusercontent.com/fchen98/DF-bilibli/main/Bilibili_logo_bar.png")';
  banner.style.backgroundColor = 'white';
  var clone = banner.cloneNode(true);
  clone.getElementsByClassName("taper-line")[0].remove();
  for(var i=0;i<4;i++){
    banner.parentNode.appendChild(clone.cloneNode(true));

  }
}
*/

// Event
chrome.tabs.query({active:true, currentWindow:true},function(tab){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.status == "complete"){
      console.log("background script " + tabId + tab.url + extensions.test(tab.url))
      chrome.storage.local.get(["recommendation", "comment"], (boxes) => {
        if(extensions.test(tab.url)){
          if(boxes.recommendation){
            chrome.scripting.insertCSS({
              files: ["css/recommendation.css"],
              target: { tabId: tabId },
            });
          }else{
            chrome.scripting.insertCSS({
              files: ["css/wall.css"],
              target: { tabId: tabId },
            });}

          if(boxes.comment){
            chrome.scripting.insertCSS({
              files: ["css/comment.css"],
              target: { tabId: tabId },
            });
          }
        }
        
      });
    }
  });
});
/*
// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.match(extensions)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["css/home.css", "css/dynamic.css", "css/space.css", "css/inVideo.css"],
        target: { tabId: tab.id },
      });
      chrome.scripting.executeScript({
        func: homeClear,
        target: { tabId: tab.id },
      });
      chrome.scripting.executeScript({
        func: spaceClear,
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["css/home.css"],
        target: { tabId: tab.id },
      });
    }
  }
}); 
*/

