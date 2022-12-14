/* Index script */
let is_sidebar_on=0;

__init__();



function openPage(site) {
    document.location.href = site;
}

function openMobileSidebar() {
    let sidebar = $('#id-sidebar');
	let content = $('#main_content');
    if (is_sidebar_on == 0){
        is_sidebar_on = 1;
        sidebar.show("100");
		content.hide();

    }
    else if (is_sidebar_on==1){
        is_sidebar_on=0;
        sidebar.hide();
		content.show();
    }
    
}

function hide_side_bar_on_mobile() {
    let scr_width = screen.width;

	if (scr_width <= "600") {
		let sidebar = $('#id-sidebar');
		sidebar.hide();
	}
}

function is_logged() {
	if (localStorage.getItem("logged") == null)
		return false;
	let imgname = get_image();
	$(".usr_img").attr("src",imgname);
	return true;
}

function return_logged_user() {
	return localStorage.getItem("logged");
}

function switch_header_logged(){
	$(".sign-log-in-button").hide();
	show_user_img();
}


function dropUserMenu() {
	$("#myDropdown").show();
	$("#myDropdown_mobile").show();
}

function hook_click_hide_dropdown(){
	window.onclick = function(event) {
		if (!event.target.matches('.usr_img')) {
			$("#myDropdown").hide();
			$("#myDropdown_mobile").hide();
		}
	} 
}

function log_out(){
    localStorage.removeItem("logged");
	openPage("./index.html")
}

function hide_user_img() {
	$("#cred_bar").hide();
	$("#cred_bar_mobile").hide();
}

function show_user_img(){
	$("#cred_bar").show();
}
function switch_sidebar_logged(){
	$(".privacy-policy").hide();
	$(".footer").hide();
	$(".sidebar-button-loged").show();
}	

function switch_header_logged_mobile(){
	let scr_width = screen.width;

	if (scr_width <= "600") {
		$("#cred_bar").hide()
		$("#cred_bar_mobile").show()
	}
}

function switch_sidebar_notlogged(){
	$(".sidebar-button-loged").hide();
	$(".sidebar-button-notloged").show();
	$(".privacy-policy").show();
	$(".footer").show();
}

function hook_sidebar_buttons(){
	$("#liked-songs").click(() => {
		handler = new HandlerPlaylist();
		handler.is_liked = true;
		handler.setStorage();
		openPage("./playlist.html");
	});
}

function get_current_site(){
	console.log(location.pathname.split('/').slice(-1)[0]);
	return location.pathname.split('/').slice(-1)[0];
}

/* Search bar logic */
function startSearch(){
	
	// Get input
	var querry = $("#search-bar").val();
	// If empty querry return site to normal only if not on playlist creation:
	if (querry== "")
	{
		console.log("Refresh")
	}
		// Store as last querry


	// Get all matching songs
	var songs = SongMaster.find(querry);

	// Clear DOM.

	$("#main_content").html("<div class='section'> </div>");
	// Append elements Fount
	$(".section").append(`
		<div class="section-title">Resultados</div>
		<div class="section-content"></div>
	`)
	songs.forEach(song => {
		$(".section-content").append(`
			<div class="section-song">
				<a class="round-button" onclick = "staticChangeSong('${song.cover}', '${song.title}', '${song.artist}', '${song.path}'$)">
					<i class="fa fa-play fa-2x"></i>
				</a>
				<div class="cover-img">
					<img src=${song.cover}>
					<p class="title">${song.title}</p>
					<p class="artist">${song.artist}</p>	
				</div>
			</div>
		`)
	});
	$(".covers").append(`
				<div class="footer-padding"></div>
				<div class="footer-padding"></div>
				<div class="footer-padding"></div>
							`);
}



/* Search bar logic */
function startSearch(){
	// Get input
	var querry = $("#search-bar").val();
	// If empty querry return site to normal:
	if (querry== "")
		location.reload();
	// Store as last querry


	// Get all matching songs
	var songs = SongMaster.find(querry);
	console.log(songs);
	// Clear DOM.
	console.log(songs);
	$("#main_content").html("<div class='section'> </div>");
	// Append elements Fount
	$(".section").append(`
		<div class="section-title">Resultados</div>
		<div class="section-content"></div>
	`)
	songs.forEach(song => {
		$(".section-content").append(`
			<div class="section-song">
				<a class="round-button" onclick = "staticChangeSong('${song.cover}', '${song.title}', '${song.artist}', '${song.path}'$)">
					<i class="fa fa-play fa-2x"></i>
				</a>
				<div class="cover-img">
					<img src=${song.cover}>
					<p class="title">${song.title}</p>
					<p class="artist">${song.artist}</p>	
				</div>
			</div>
		`)
	});
}

function hook_sidebar_buttons(){
	$("#liked-songs").click(() => {
		handler = new HandlerPlaylist();
		handler.is_liked = true;
		handler.setStorage();
		openPage("./playlist.html");
	});
}

function get_image(){
	var curr_user = localStorage.getItem("logged");
	requestUserDatabase = localStorage.getItem(curr_user);
	newUser = new UserData();
	newUser.populateFromJSON(JSON.parse(requestUserDatabase));
	img = "images/" + newUser.usr_img;
	return  img;
	
}

function __init__() {
	/* Lógica global*/
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