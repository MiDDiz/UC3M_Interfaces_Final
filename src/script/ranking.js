
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
		top3 = orederedInsert(top3, user);
	});

}

function __init__() {
	/* obtener todos los usuarios */
	let top_users = getTopUsers();

}

__init__();
