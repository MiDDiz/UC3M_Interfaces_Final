class HandlerPlaylist {
	constructor(is_liked) {
		this.is_liked = is_liked;
		this.id = null;
	}
	setStorage() {
		localStorage.setItem("handler_playlists", JSON.stringify(this));
	}
	load() {
		let requestHandlerDatabase = localStorage.getItem("handler_playlists");
		let parsedRequest = JSON.parse(requestHandlerDatabase)
		this.is_liked = parsedRequest["is_liked"];
		this.id = parsedRequest["id"];
	}
}
class Playlist {
	constructor (songList, titulo, id){
		this.songList = songList;
		this.titulo = titulo;
		this.id = id;
	}
	
	saveNewList(songList) {
		this.songList = songList;
	}

	changeTitle(title) {
		this.title = title;
	}

	addSong (song){
		this.songList.push(song);
	}
	alreadyHas (song){
		let flag = false;
		this.songList.forEach(element => {
			if (element.path == song.path)
				flag = true;
		});
		return (flag);
	}

	staticAlreadyHas(element, song){
		let flag = false;
		element.songList.forEach(element => {
			if (element.path == song.path)
				flag = true;
		});
		return (flag);
	}

	// Remove element from list
	removeSong (removeSong) {
		var removeTitle = removeSong.title;
		let index;
		for (index = 0; index <= this.songList.length; index++) {
			if (index == this.songList.length)
				break ;
			const song = this.songList[index];
			if (song.title == removeTitle)
				break ; 
		}
		// no song found
		if (index == this.songList.length)
			return ;
			// Remove element
		this.songList.splice(index, 1);
	}

	

	staticRemoveSong (element, removeSong) {
		var removeTitle = removeSong.title;
		let index;
		for (index = 0; index <= element.songList.length; index++) {
			if (index == element.songList.length)
				break ;
			const song = element.songList[index];
			if (song.title == removeTitle)
				break ; 
		}
		// no song found
		if (index == element.songList.length)
			return ;
			// Remove element
		element.songList.splice(index, 1);
		return element;
	}

	removeSongTitle(removeTitle){
		let index;
		for (index = 0; index <= this.songList.length; index++) {
			if (index == this.songList.length)
				break ;
			const song = this.songList[index];
			if (song.title == removeTitle)
				break ; 
		}
		// no song found
		if (index == this.songList.length)
			return ;
			// Remove element
		this.songList.splice(index, 1);
	}
}
