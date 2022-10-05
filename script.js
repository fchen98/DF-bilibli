function homeClear(){
    var banner = document.getElementsByClassName("bili-banner")[0].cloneNode;
    banner.classList.remove('bili-banner');
    banner.classList.add('bili-wall');
    banner.style.backgroundImage = 'url("https://raw.githubusercontent.com/fchen98/DF-bilibli/main/Bilibili_logo_bar.png")';
    banner.style.backgroundColor = 'white';
    banner.parentNode.appendChild(banner);
    var clone = banner.cloneNode(true);
    clone.getElementsByClassName("taper-line")[0].remove();
    for(var i=0;i<4;i++){
      banner.parentNode.appendChild(clone.cloneNode(true));
  
    }
  }
  
  homeClear();