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

function return_logged_user() {
	return localStorage.getItem("logged");
}

function switch_header_logged(){
	$(".sign-log-in-button").hide();
	// TODO: Mostrar el boton del usuario logeado...
}

function switch_sidebar_logged(){
	$(".sidebar-button-notloged").hide();
	$(".sidebar-button-loged").show();
}

function switch_sidebar_notlogged(){
	$(".sidebar-button-loged").hide();
	$(".sidebar-button-notloged").show();
}

function __init__() {
	/* Lógica global*/
	hide_side_bar_on_mobile();
	
	/* Logica de usuario loggeado */
	if (!is_logged()){
		switch_sidebar_notlogged();
		return
	}
	switch_header_logged();
	switch_sidebar_logged();
}
