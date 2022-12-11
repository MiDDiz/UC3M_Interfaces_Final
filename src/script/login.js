__init__();
var newUser;

function check_for_logged_user(){
	/* If user is already logged -> Redirect */
	if (localStorage.getItem("logged") != null) {
		document.location.href = "./index.html";
	}
}

function throw_dialog(msg) {
	alert(msg);
}

function get_all_log_data() {
	var logData;
	logData = {
		username: $("#log_username").val(),
		password: $("#log_passwd").val(),
	}
	return logData;
}

function check_for_user_db(logData) {
	var requestUserDatabase;

	requestUserDatabase = localStorage.getItem(logData["username"]);
	if (requestUserDatabase == null){
		throw_dialog("El usuario no está registrado!");
		return false;
	}
	newUser = new UserData();
	newUser.populateFromJSON(JSON.parse(requestUserDatabase));
	/* This is completly wrong in terms of security but considering the fact that we are storing 
	the passwords in plaintext on localstorage we are going to check it this way :D*/
	if (newUser.password != logData["password"]) {
		throw_dialog("La contraseña es incorrecta!")
		return false;
	}
	return true;
}

function log_user(newUser) {
	localStorage.setItem("logged", newUser.username);
	openPage("./index.html");
}

function __init__() {
	check_for_logged_user();
	$(".loginbutton").click(() => {
		var logData;
		logData = get_all_log_data();
		if (!check_for_user_db(logData))
			return ;
		log_user(newUser);
	});
}
