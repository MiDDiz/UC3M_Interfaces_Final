var curr_user = localStorage.getItem("logged");
__init__();

function set_acc_data(){
    requestUserDatabase = localStorage.getItem(curr_user);
    newUser = new UserData();
    newUser.populateFromJSON(JSON.parse(requestUserDatabase));
    $("#acc-curr-user").text(newUser.username);
    $("#acc-curr-email").text(newUser.email);
    $("#acc-curr-birth").text(newUser.birthday);
    return newUser;
}

function get_all_acc_data() {
	var accData;
	accData = {
		email: $("#acc_email").val(),
		username: $("#acc_username").val(),
		password: $("#acc_passwd").val(),
		date: $("#acc_date").val(),
		img: $("#acc_img").val()
	}
	return accData;
}
function check_acc_data(newUser, auxUser){
    if (auxUser.username != ""){
        newUser.username = auxUser.username;
    }
    if (auxUser.password != ""){
        newUser.password = auxUser.password;
    }
    if (auxUser.email != ""){
        newUser.email = auxUser.email;
    }
    if (auxUser.birthday != ""){
        newUser.birthday = auxUser.birthday;
    }
    if (auxUser.img != ""){
        newUser.img = auxUser.img;
    }
    return newUser;

}
function log_user(newUser) {
	localStorage.setItem("logged", newUser.username);

}

function __init__() {
	newUser = set_acc_data();
	/* Un register clcik, check for correct registration form, then check for register user, then register user*/
	$(".account-change-button").click(() => {
        var auxUser = get_all_acc_data()
        defUser = check_acc_data(newUser,auxUser);
        log_user(defUser);
        defUser.saveCookie();
        localStorage.removeItem(curr_user.toString());
        location.reload()
	});
	
}