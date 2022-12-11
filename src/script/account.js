var changedUser;
__init__();

function set_acc_data(){
    var curr_user = localStorage.getItem("logged");
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
    alert(auxUser.username + "45")
    alert(newUser.username + "sdf5")
    if (auxUser.username != null){
        newUser.username = auxUser.username;
    }
    if (auxUser.password != null){
        newUser.password = auxUser.password;
    }
    if (auxUser.email != null){
        newUser.email = auxUser.email;
    }
    if (auxUser.birthday != null){
        newUser.birthday = auxUser.birthday;
    }
    if (auxUser.img != null){
        newUser.img = auxUser.img;
    }
    return newUser;

}

function __init__() {
	newUser = set_acc_data();
    alert(newUser.username + "2")
	/* Un register clcik, check for correct registration form, then check for register user, then register user*/
	$(".account-change-button").click(() => {
        var auxUser = get_all_acc_data()
        defUser = check_acc_data(newUser,auxUser);
        alert(defUser.username + "30");
	});
	
}