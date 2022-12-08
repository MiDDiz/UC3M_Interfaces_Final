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
			break;
		case -2:
			throw_dialog("El email tiene que tener la forma de: correo@servicio.dominio");
			break;
		case -3:
			throw_dialog("Este nombre de usuario no está disponible!\nNombre de usuario no permitido.");
			break;
		case -4:
			throw_dialog("La contraseña tiene un formato incorrecto!\nDebe tener MAXIMO 8 carácteres e incluir solo letras y dígitos!");
			break;
		case -5:
			throw_dialog("Este correo ya está utilizado!");
			break;
		case -6:
			throw_dialog("Este nombre de usuario no está disponible!\nUsuario ya resgistrado.");
			break ;
		default:
			break;
	}
		return ;
}


function __init__() {
	check_for_logged_user();
	/* Un register clcik, check for correct registration form, then check for register user, then register user*/
	$(".regbutton").click(() => {
		regData = get_all_reg_data();
		newUser = new UserData();
		newUser.populateForm(regData);
		validate_user(newUser);
		console.log(newUser);
	});

}