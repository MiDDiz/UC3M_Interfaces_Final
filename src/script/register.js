var newUser;
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
		date: $("#reg_date").val(),
		img: $("#reg_img").val()
	}
	return regData;
}

function throw_dialog(msg)
{
	alert(msg);
}

function validate_user(user){
	switch (user.validate()) {
		case -1:
			throw_dialog("No puedes dejar campos obligatorios vacios!");
			return false;
		case -2:
			throw_dialog("El email tiene que tener la forma de: correo@servicio.dominio");
			return false;
		case -3:
			throw_dialog("Este nombre de usuario no está disponible!\nNombre de usuario no permitido.");
			return false;
		case -4:
			throw_dialog("La contraseña tiene un formato incorrecto!\nDebe tener MAXIMO 8 carácteres e incluir solo letras y dígitos!");
			return false;
		case -5:
			throw_dialog("Este correo ya está utilizado!");
			return false;
		case -6:
			throw_dialog("Este nombre de usuario no está disponible!\nUsuario ya resgistrado.");
			return false;
		default:
			break;
	}
		return true;
}

function check_terms_conditions(){
	if ($("#TyC").is(":checked"))
		return true;
	throw_dialog("Debes aceptar los terminos y condiciones.");
	return false;
}

function register_user(newUser) {
	localStorage.setItem(newUser.username, JSON.stringify(newUser));
}

function log_user(newUser) {
	localStorage.setItem("logged", newUser.username);
}

function openPage(site) {
    document.location.href = site;
}

function __init__() {
	check_for_logged_user();
	/* Un register clcik, check for correct registration form, then check for register user, then register user*/
	$(".regbutton").click(() => {
		if (!check_terms_conditions())
			return ;
		regData = get_all_reg_data();
		newUser = new UserData();
		newUser.populateForm(regData);
		if (!validate_user(newUser))
			return ;
		/* All checks done -> register user*/
		register_user(newUser);
		log_user(newUser);
		openPage("index.html");
	});
	
}