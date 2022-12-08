

__init__();



function check_for_logged_user(){
	/* If user is already logged -> Redirect */
	if (localStorage.getItem("logged") != null) {
		document.location.href = "../index.html";
	}
}

function get_all_reg_data() {
	regData = {
		email: $("#reg_email").val(),
		username: $("#reg_username").val(),
		password: $("#reg_passwd").val(),
	}
}

function __init__() {
	check_for_logged_user();
	/* Un register clcik, check for correct registration form, then check for register user, then register user*/
	$(".regbutton").click(() => {
		regData = get_all_reg_data();
	});

}