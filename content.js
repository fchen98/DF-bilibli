function homeClear(){
    var banner = document.getElementsByClassName("bili-banner")[0].cloneNode(true);
    banner.className += ' bili-wall';
    banner.style.backgroundImage = 'url("https://raw.githubusercontent.com/fchen98/DF-bilibli/main/Bilibili_logo_bar.png")';
    banner.style.backgroundColor = 'white';
    document.getElementsByClassName("bili-banner")[0].parentNode.appendChild(banner);
    var clone = banner.cloneNode(true);
    clone.getElementsByClassName("taper-line")[0].remove();
    for(var i=0;i<4;i++){
    banner.parentNode.parentNode.appendChild(clone.cloneNode(true));
    }
}

homeClear();