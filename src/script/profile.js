__init__();


function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("prof-info").style.height = "80px";
  } else {
    document.getElementById("prof-info").style.height = "250px";
  }
}

function personalize(){
  let pfphoto = get_image();
	$("#prof-info-bgp").attr("src",pfphoto);
  let pfname = get_name();
  $(".prof-info-text").text(pfname);
}

function get_name(){
  var curr_user = localStorage.getItem("logged");
	requestUserDatabase = localStorage.getItem(curr_user);
	newUser = new UserData();
	newUser.populateFromJSON(JSON.parse(requestUserDatabase));
  return newUser.username;
}

function __init__(){
  //window.onscroll = function() {scrollFunction()};

  /* Lógica global*/
	hide_side_bar_on_mobile();
	hide_user_img();
	hook_click_hide_dropdown();
	$("#search-bar").keyup(() => {
		startSearch();
	})
	/* Logica de usuario loggeado */
	if (!is_logged()){
		switch_sidebar_notlogged();
		return;
	}
  	personalize();
	switch_header_logged();
	switch_header_logged_mobile();
	switch_sidebar_logged();
	hook_sidebar_buttons();
}
