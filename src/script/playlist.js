let user;
let handler_playlist;
function loadUser() {
	user = new UserData();
	let logged = localStorage.getItem("logged");
	let requestUserDatabase = localStorage.getItem(logged);
	user.populateFromJSON(JSON.parse(requestUserDatabase));
	return user
}

function __init__() {
	$("#cred_bar_mobile").hide();
	
	handler_playlist = new HandlerPlaylist();
	handler_playlist.load();
	user = loadUser();
	generate(handler_playlist, user);
}

function removeSong(titulo){
	let song = SongMaster.findByTitle(titulo);
	if (handler_playlist.is_liked){
		user.removeSong(song);
		user.saveCookie();
		location.reload();
	}
	else {

	}
}

function generatePlaylist(songArray) {
	let count = 1;
	songArray.forEach(song => {
		$(".playlist-content").append(`
			<div class="playlist-element" onclick="staticChangeSong('${song.cover}',
																	  '${song.title}',
																	  '${song.artgist}',
																	  '${song.path}')">
				<span class="element-number">${count}</span>
				<div class="element-img">
					<img src="${song.cover}" alt="Cover de ${song.title}">
				</div>
				<span class="element-title">${song.title}</span>
				<span class="element-artists">${song.artist}</span>
				<span class="element-time">${song.duration}</span>
				<button class="element-remove" onclick="removeSong('${song.title}')">
					<i class="fa fa-times" aria-hidden="true"></i>
				</button>
			</div>
		`);
		count++;
	});
}

function changeTitle(title){
	$(".playlist-title").html(`
		<h1>${title}</h1>
	`)
}

function generate(handler, user){
	if (handler.is_liked == true) {
		changeTitle("Tus likes");
		generatePlaylist(user.liked_songs);
	}
}



__init__();