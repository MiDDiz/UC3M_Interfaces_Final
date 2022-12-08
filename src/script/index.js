/* Index script */
let is_sidebar_on=0;

__init__();

function openPage(site) {
    document.location.href = site;
}

function openMobileSidebar() {
    let sidebar = $('#id-sidebar');
    if (is_sidebar_on==0){
        is_sidebar_on=1;
        sidebar.show("100");
    }
    else if (is_sidebar_on==1){
        is_sidebar_on=0;
        sidebar.hide();
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

function switch_header_logged(){
	$(".sign-log-in-button").hide();
	// TODO: Mostrar el boton del usuario logeado...
}

function dropUserMenu() {
	$("#myDropdown").show();
}

function hook_click_hide_dropdown(){
	window.onclick = function(event) {
		if (!event.target.matches('.usr_img')) {
			$("#myDropdown").hide();
		}
	} 
}

function log_out(){
    localStorage.removeItem("logged");
	openPage("../index.html")
}

function hide_user_img() {
	$("#cred_bar").hide();
}

function show_user_img(){
	$("#cred_bar").show();

}

function __init__() {
	/* Lógica global*/
	hide_side_bar_on_mobile();
	hide_user_img();
	hook_click_hide_dropdown();
	/* Logica de usuario loggeado */
	if (!is_logged())
		return ;
	show_user_img();
	switch_header_logged();
}
