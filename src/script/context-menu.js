const contextMenu = document.querySelector(".ctm-wrapper"),
shareMenu = contextMenu.querySelector(".ctm-playlist-menu");


function get_parent(e)
{
	let res = e.target.closest(".section-song2")
	if (res == null)
		res = e.target.closest(".section-song")
	return res;
}

function get_current_logged_user(){
	current_user = localStorage.getItem("logged");
	if (current_user == null)
		return null;
	
	let user = new UserData();
	let a = localStorage.getItem(current_user)
	user.populateFromJSON(JSON.parse(a));
	console.log(user);
	return user
}

function getSongFromParent(parent){
	let cover = parent.getElementsByClassName("cover-img")[0];
	let title = cover.getElementsByClassName("title")[0];
	return SongMaster.findByTitle(title.textContent);
}

window.addEventListener("contextmenu", e => {
	$(".ctm-liked").off();
	$(".ctm-unliked").off();

    let user = get_current_logged_user();
	if (user == null)
		return ;
	let parent = get_parent(e);
	if (parent == null)
	{
		contextMenu.style.visibility = "hidden"
		return;
	}
	e.preventDefault();
	let song = getSongFromParent(parent);
	if (user.alreadyLiked(song.title)){
		$(".ctm-unliked").hide();
		$(".ctm-liked").show();
		$(".ctm-liked").on("click", () => {
			user.removeSong(song);
			user.saveCookie();
			contextMenu.style.visibility = "hidden";
		});
	}
	else {
		$(".ctm-unliked").show();
		$(".ctm-unliked").on("click", () => {
			user.appendSong(song);
			user.saveCookie();
			contextMenu.style.visibility = "hidden";

			
		});
		$(".ctm-liked").hide();
	}












	/* Contex menu appearance logic */
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
document.addEventListener("click", () => contextMenu.style.visibility = "hidden");
