let playlist = new Playlist([], "", null);


function changeCross(elem){
	let querry = elem.querySelector(".fa-plus");
	console.log(elem);
	if (querry == null) {
		elem.style = "cursor: not-allowed"
	} else {
		elem.innerHTML = `<i class="fa fa-times fa-2x"></i>`
	}
	startCustomSearch();
}

function startCustomSearch(){
	// Get input
	var querry = $("#search-bar").val();

	// Get all matching songs
	var songs = SongMaster.find(querry);

	// Clear DOM.

	$("#main_content").html("<div class='section'> </div>");
	// Append elements Fount
	$(".section").html("")
	$(".section").append(`
		<div class="section-title">Resultados</div>
		<div class="section-content"></div>
	`)
	songs.forEach(song => {
		$(".section-content").append(`
			<div class="section-song">
				<a class="round-button-add">
					<i class="fa fa-plus fa-2x"></i>
				</a>
				<div class="cover-img">
					<img src=${song.cover}>
					<p class="title">${song.title}</p>
					<p class="artist">${song.artist}</p>	
				</div>
			</div>
		`);
		let querry = document.getElementsByClassName("round-button-add");
		console.log("Has: " + playlist.alreadyHas(song));
		if (playlist.alreadyHas(song)){
			querry[querry.length - 1].innerHTML = `
			<i class="fa fa-times fa-2x"></i>
			`
			querry[querry.length - 1].addEventListener("click", () => {
				playlist.removeSong(song);
				changeCross(querry[querry.length - 1]);
			}
		);
		}
		else {
			querry[querry.length - 1].addEventListener("click", () => {
					playlist.addSong(song);
					changeCross(querry[querry.length - 1]);
				}
			);
		}
	});
}


function __init__(){
	$("#search-bar").keyup(() => {
		startCustomSearch();
	})
	$("#gen-playlist").click(() => {
		let title = $("#playlist-title").val() ;
		if (title == ""){
			alert("El titulo no puede estar vacío!");
			return ;
		}
		let user = new UserData();
		user.getCookie();
		let id = user.getNextPlaylistId();
		playlist.titulo = title;
		playlist.id = id;
		user.appendList(playlist);
		user.saveCookie();
	})

}

__init__();