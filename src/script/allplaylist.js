
var curr_user = localStorage.getItem("logged");

__init__();


function __init__(){
    generate_lists();
}

function generate_lists(){
    requestUserDatabase = localStorage.getItem(curr_user);
    newUser = new UserData();
    newUser.populateFromJSON(JSON.parse(requestUserDatabase));
    let playlists = newUser.user_lists
    if (playlists.length == 0){
        $(".all-playlist-main-container").append(`
        <div style="margin-left: 20px;">
            <h1>No tienes playlist disponibles aún!</h1>
        </div>
    `)  

    }
    for (let pl = 0; pl < playlists.length; pl++){
        $(".all-playlist-main-container").append(`
        <div id="playlist-${playlists[pl].id}" class="all-playlist-container">
            <h1>${playlists[pl].titulo}</h1>
        </div>
    `)
	$(`#playlist-${playlists[pl].id}`).click(() => {
		let hp = new HandlerPlaylist();
		hp.id = playlists[pl].id;
		hp.is_liked = false;
		hp.setStorage();
		openPage("./playlist.html");
	});

    }
}