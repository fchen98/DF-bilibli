let recommendation = document.getElementById("df-recommendation");
let comment = document.getElementById("df-comment");

function syncBox(name, localstorage){
  if(localstorage){
    document.getElementById(name).checked = true;
  }
}

/*
function clearBox(box, boxname){
    console.log("script reached")
    if(box.checked){
      chrome.storage.local.set({boxname: true});
      console.log(boxname + " saved")
    }
    else{
      chrome.storage.local.set({boxname: false});
      console.log(boxname + " removed")
    }
}

recommendation.addEventListener("click", ()=>{clearBox(recommendation, "recommendation")})
comment.addEventListener("click", ()=>{clearBox(comment, "comment")})
topBanner.addEventListener("click", ()=>{clearBox(topBanner, "topBanner")})
*/

// use storage.set in a function will lead to a scope issue that the variable won't be stored in the extentsion


recommendation.addEventListener("change", ()=>{
  if(recommendation.checked){
    chrome.storage.local.set({"recommendation": true});
  }
  else{
    chrome.storage.local.set({"recommendation": false});
  }
})

comment.addEventListener("change", ()=>{
  if(comment.checked){
    chrome.storage.local.set({"comment": true});
  }
  else{
    chrome.storage.local.set({"comment": false});
  }
})

chrome.storage.local.get(["recommendation", "comment"], (boxes) => {
  syncBox("df-recommendation", boxes.recommendation)
  syncBox("df-comment", boxes.comment)
})
