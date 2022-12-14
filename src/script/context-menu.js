/* context menu dom elements */
const contextMenu = document.querySelector(".ctm-wrapper"),
shareMenu = contextMenu.querySelector(".ctm-playlist-menu");

/* get song main parent of any child element */
function get_parent(e)
{
	let res = e.target.closest(".section-song2")
	if (res == null)
		res = e.target.closest(".section-song")
	return res;
}
/* return current logged user */
function get_current_logged_user(){
	current_user = localStorage.getItem("logged");
	if (current_user == null)
		return null;
	
	let user = new UserData();
	let a = localStorage.getItem(current_user)
	user.populateFromJSON(JSON.parse(a));
	return user
}
/* get song element from parent cover element */
function getSongFromParent(parent){
	let cover = parent.getElementsByClassName("cover-img")[0];
	let title = cover.getElementsByClassName("title")[0];
	return SongMaster.findByTitle(title.textContent);
}

window.addEventListener("contextmenu", e => {
	/* Advanced context menu item generation */
	/* we need to remove previous like/dislike functionality hooks */
	$(".ctm-liked").off();
	$(".ctm-unliked").off();
	/* If user is not logged we dont display custom menu*/
    let user = get_current_logged_user();
	if (user == null)
		return ;
	let parent = get_parent(e);
	/* We try to display the context menu only when user clicked o a song*/
	if (parent == null)
	{
		contextMenu.style.visibility = "hidden"
		return;
	}
	e.preventDefault();
	/* If previos checks are succesful*/
	let song = getSongFromParent(parent);
	/* check whether the song is liked or not -> 
		display either like or dislike button*/
	if (user.alreadyLiked(song.title)){
		$(".ctm-unliked").hide();
		$(".ctm-liked").show();
		/* hook dislike functuiality*/
		$(".ctm-liked").on("click", () => {
			user.removeSong(song);
			user.saveCookie();
			contextMenu.style.visibility = "hidden";
		});
	}
	else {
		$(".ctm-unliked").show();
		$(".ctm-unliked").on("click", () => {
			/* hook like functionality */
			user.appendSong(song);
			user.saveCookie();
			contextMenu.style.visibility = "hidden";
		});
		$(".ctm-liked").hide();
	}
	/* playlist logic.*/
	let playlists = user.getPlaylists();
	if (playlists.length > 0)
	{
		/* if there is no playlist */
		$(".ctm-noplaylists").hide();
		$(".ctm-playlist-menu").html("");
	}
	/* playlist context menu item generation */
	playlists.forEach(element => {
		/* static element to access satic methods */
		let static = new Playlist();
		if (static.staticAlreadyHas(element, song)){
			/* If we already have the song on the playlist 
				-> add icon and functionality to remove it */
			$(".ctm-playlist-menu").append(`
				<li id="playlist-${element.id}" class="ctm-item">
					<i class="fa fa-times"></i>
					<span>${element.titulo}</span>
				</li>
			`);
			$(`#playlist-${element.id}`).on("click", () => {
				element = static.staticRemoveSong(element, song);
				user.setPlaylists(playlists);
				user.saveCookie();
			})
		}
		else {
			/* If we dont have it -> add icon and functionality to insert it */
			$(".ctm-playlist-menu").append(`
				<li id="playlist-${element.id}" class="ctm-item">
					<i class="fa fa-plus"></i>
					<span>${element.titulo}</span>
				</li>
			`);
			$(`#playlist-${element.id}`).on("click", () => {
				element.songList.push(song);
				user.setPlaylists(playlists);
				user.saveCookie();		
			});
		}
	});
	/* save changes allways */
	user.setPlaylists(playlists);
	user.saveCookie();
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
