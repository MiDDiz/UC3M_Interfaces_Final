/* Index script */
let is_sidebar_on=0;

__init__();

class HandlerPlaylist {
	constructor(is_liked) {
		this.is_liked = is_liked;
		this.id = null;
	}
	setStorage() {
		localStorage.setItem("handler_playlists", JSON.stringify(this));
	}
	load() {
		let requestHandlerDatabase = localStorage.getItem("handler_playlists");
		let parsedRequest = JSON.parse(requestHandlerDatabase)
		this.is_liked = parsedRequest["is_liked"];
		this.id = parsedRequest["id"];
	}
}

function openPage(site) {
    document.location.href = site;
}

function openMobileSidebar() {
    let sidebar = $('#id-sidebar');
	let content = $('#main_content');
    if (is_sidebar_on==0){
        is_sidebar_on=1;
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

function __init__() {
	/* Lógica global*/
	hide_side_bar_on_mobile();
	hide_user_img();
	hook_click_hide_dropdown();
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