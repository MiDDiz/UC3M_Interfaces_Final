
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
    for (let pl = 0; pl < playlists.length; pl++){
        $(".content").append(`
        <div class="all-playlist-container" onclick = "Funcion(${playlists[pl]}})">
            <h1>${playlists[pl]}</h1>
        </div>
    `)
    }
}