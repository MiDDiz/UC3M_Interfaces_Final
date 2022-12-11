const contextMenu = document.querySelector(".ctm-wrapper"),
shareMenu = contextMenu.querySelector(".ctm-playlist-menu");
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.pageX, y = e.pageY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth,
    cmHeight = contextMenu.offsetHeight;
    if(x > (winWidth - cmWidth - shareMenu.offsetWidth)) {
        shareMenu.style.left = "-220px";
    } else {
        shareMenu.style.left = "";
        shareMenu.style.right = "-220px";
    }
	
    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;
    
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
	if (y > (winHeight / 2)) {
		contextMenu.style.top = `${y-80}px`
	}
    contextMenu.style.visibility = "visible";
});
document.addEventListener("click", () => contextMenu.style.visibility = "hidden");