let user_playlist;
let handler_playlist;
function loadUser() {
	user_playlist = new UserData();
	let logged = localStorage.getItem("logged");
	let requestUserDatabase = localStorage.getItem(logged);
	user_playlist.populateFromJSON(JSON.parse(requestUserDatabase));
	return user_playlist
}

function __init__() {
	$("#cred_bar_mobile").hide();
	
	handler_playlist = new HandlerPlaylist();
	handler_playlist.load();
	user_playlist = loadUser();
	generate(handler_playlist, user_playlist);
	hide_side_bar_on_mobile();
	hide_user_img();
	hook_click_hide_dropdown();
	if (get_current_site() == "index.html"){
		$("#search-bar").keyup(() => {
			startSearch();
		})
	}
	/* Logica de usuario loggeado */
	if (!is_logged()){
		switch_sidebar_notlogged();
		return;
	}
	switch_header_logged();
	switch_header_logged_mobile();
	switch_sidebar_logged();
	hook_sidebar_buttons();
	
}

function removeSong(titulo){
	let song = SongMaster.findByTitle(titulo);
	if (handler_playlist.is_liked){
		user_playlist.removeSong(song);
		user_playlist.saveCookie();
		location.reload();
	}
	else {
		let playlist = user_playlist.getPlaylistById(handler_playlist.id);
		let static = new Playlist();
		static.staticRemoveSong(playlist, song);
		user_playlist.updatePlaylists(playlist);
		user_playlist.saveCookie();
		location.reload();
	}
}

function generatePlaylist(songArray) {
	let count = 1;
	/* Si no hay canciones */ 
	if (songArray.length == 0){
		$(".playlist-content").append(`<span>No hay canciones actualmente.</span>`)
		return ;
	}
	/* para cada cancion*/
	songArray.forEach(song => {
		$(".playlist-content").append(`
			<div class="playlist-element" onclick="staticChangeSong('${song.cover}',
																	  '${song.title}',
																	  '${song.artist}',
																	  '${song.path}')">
				<span class="element-number">${count}</span>
				<div class="element-img">
					<img src="${song.cover}" alt="Cover de ${song.title}">
				</div>
				<span class="element-title">${song.title}</span>
				<span class="element-artists">${song.artist}</span>
				<span class="element-time">${song.duration}</span>
				<button class="element-remove" onclick="removeSong('${song.title}')">
					<i class="fa fa-times" aria-hidden="true"></i><p style="color:white">'</p>
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
	} else {
		let playlist = user.getPlaylistById(handler.id);
		changeTitle(playlist.titulo);
		generatePlaylist(playlist.songList);
	}
}

__init__();