
function orederedInsert(list, user){
	for (let i = 0; i < Math.max(list.length, 3); i++) {
		let element = list[i];
		if (element == null){
			list.push(user);
			return list;
		}
		if (element.time < user.time){
			list[i] = user;
			return orederedInsert(list, element);
		}
	}
	return (list);
}

function getTopUsers(){
	let users = [];
	const items = { ...localStorage };
	for (let key in items){
		let parsed;
		try{
			parsed = JSON.parse(items[key]);
		}
		catch (err){
			continue ;
		}
		if (parsed["time"] == null){
			continue ;
		}
		users.push(parsed);
	}
	let top3 = []

	users.forEach(user => {
		console.log(top3);
		top3 = orederedInsert(top3, user);
	});
	return top3;
}

function formatTime(time){
	let res;
	if (time > 3600){
		res = new Date(time * 1000).toISOString().slice(11, 19);
	} else {
		res = new Date(time * 1000).toISOString().slice(14, 19);
	}
	console.log(res);
	return res;
}

function changeDoms(user, domelem){
	const usr_img = domelem.querySelector(".ranking-usr-img");
	const usr_name = domelem.querySelector("h4");
	const span_text = domelem.querySelector("span");


	if (user == null){
		domelem.style.visibility = "hidden";
		return ;
	}

	usr_img.src = "./images/" + user.usr_img;
	usr_name.textContent = user.username;
	span_text.textContent = `Con ${formatTime(user.time)} de escucha`;
}

function fillDomWithTopUsers(topUsers){
	const top1 = document.getElementById("user-top-1");
	const top2 = document.getElementById("user-top-2");
	const top3 = document.getElementById("user-top-3");

	changeDoms(topUsers[0], top1);
	changeDoms(topUsers[1], top2);
	changeDoms(topUsers[2], top3);
}

function __init__() {
	/* obtener todos los usuarios */
	let top_users = getTopUsers();
	console.log(top)
	fillDomWithTopUsers(top_users);
}

__init__();
