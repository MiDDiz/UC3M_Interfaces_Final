var curr_user = localStorage.getItem("logged");
__init__();

function set_acc_data(){
    requestUserDatabase = localStorage.getItem(curr_user);
    oldUser = new UserData();
    oldUser.populateFromJSON(JSON.parse(requestUserDatabase));
    $("#acc-curr-user").text(oldUser.username);
    $("#acc-curr-email").text(oldUser.email);
    $("#acc-curr-birth").text(oldUser.birthday);
    imgname= oldUser.usr_img;
    $("#user-img").attr("src",imgname);
    return oldUser;
}

function get_all_acc_data() {
	var accData;
	accData = {
		email: $("#acc_email").val(),
		username: $("#acc_username").val(),
		password: $("#acc_passwd").val(),
		birthday: $("#acc_date").val(),
		usr_img: $("#acc_img").val()
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
    if (auxUser.usr_img != ""){
        nameimage=auxUser.usr_img.split("\\");
    	newUser.usr_img =("images/" + nameimage[nameimage.length-1]);
    }
    return newUser;

}
function log_user(newUser) {
	localStorage.setItem("logged", newUser.username);
}

function modifyimg(user){
    imgname="images/"+user.usr_img;
    $("#user-img").attr("src",imgname);
}

function checkuser(newUser){
    if (curr_user != newUser.username){
        return -1;
    }
    return 0;
}

function __init__() {
	oldUser = set_acc_data();
	$(".account-change-button").click(() => {
        var auxUser = get_all_acc_data()
        defUser = check_acc_data(oldUser,auxUser);
        modifyimg(defUser)
        defUser.saveCookie();
        aux = checkuser(defUser);
        if (aux == -1){
            localStorage.removeItem(curr_user.toString());
        }
        log_user(defUser);
        location.reload()
	});
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
	switch_header_logged();
	switch_header_logged_mobile();
	switch_sidebar_logged();
	hook_sidebar_buttons();
	
}