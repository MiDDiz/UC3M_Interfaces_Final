/* Index script */
let is_sidebar_on=0;

__init__();

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
	let imgname = get_image();
	$("#main-image").attr("src",imgname);
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

function get_image(){
	var curr_user = localStorage.getItem("logged");
	requestUserDatabase = localStorage.getItem(curr_user);
	newUser = new UserData();
	newUser.populateFromJSON(JSON.parse(requestUserDatabase));
	img = newUser.usr_img;
	if (img == ""){
		return ("images/miño.jpg")
	}
	else{
		nameimage=img.split("\\");
    	return("images/"+nameimage[nameimage.length-1]);
	}
	
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
}