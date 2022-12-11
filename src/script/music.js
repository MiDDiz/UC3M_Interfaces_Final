class Song {
	constructor(path, title, artist, cover){
		this.path = path;
		this.title = title;
		this.artist = artist;
		this.cover = cover;
	}
}

class SongHandler{
	constructor(song_array){
		this.songs = song_array;
	}

	find(str_key_words) {
		var key_words = str_key_words.split(" ");
		var matches = [];
		var not_matches = this.songs;

			not_matches.forEach(song => {
				if (song.title.toLowerCase().includes(str_key_words.toLowerCase())){
					matches.push(song);
				}
			});

		var uniqueMatches = [];
		matches.filter(function(item){
			var i = uniqueMatches.findIndex(x => (x.path == item.path && x.title == item.title));
			if(i <= -1){
				uniqueMatches.push(item);
			}
			return null;
		  });


		return (uniqueMatches);
	}
	

	findByTitle(title) {
		var found = null;
		this.songs.forEach(song => {
			if (found != null)
				return ;
			if (song.title == title){
				found = song;
			}
		});
		return (found);
	}


}

var SongMaster = new SongHandler([
	//Tendencias Songs
	new Song("./audios/Die_For_You.mp3", "Die For You", "Garbbitz", "./images/Die_For_You.png"),
	new Song("./audios/Hong_Kong.mp3", "Hong Kong", "C. Tangana","./images/Hong_Kong.jpg"),
	new Song("./audios/Some_Say.mp3", "Some Say", "Felix Jaehn","./images/Some_Say.jpg"),
	new Song("./audios/Shivers.mp3", "Shivers", "Ed Sheeran","./images/Shivers.png"),
	new Song("./audios/In_Too_Deep.mp3", "In Too Deep", "Sum 41","./images/In_Too_Deep.jpeg"),
	new Song("./audios/Save_Your_Tears.mp3", "Save Your Tears", "The Weeknd","./images/Save_Your_Tears.jpg"),
	
	//Recomendaciones Songs
	new Song("./audios/Malbec.mp3", "Malbec", "Duki & Bzrp", "./images/Malbec.jpg"),
	new Song("./audios/Miss_You.mp3", "Miss You", "Oliver Tree","./images/Miss_You.jpg"),
	new Song("./audios/Unholy.mp3", "Unholy", "Sam Smith","./images/Unholy.jpg"),
	new Song("./audios/Sunroof.mp3", "Sunroof", "Nicky Youre","./images/Sunroof.jpg"),
	new Song("./audios/Mary_On_A_Cross.mp3", "Mary On A Cross", "Ghost","./images/Mary_On_A_Cross.jpeg"),
	new Song("./audios/Entertain_Me.mp3", "Entertain Me", "Ylona Garcia","./images/Entertain_Me.jpeg")
]);

function changeSong(n) {
    var coverArt = document.getElementById("cover_art");
    var songTitle = document.getElementById("song");
    var artistName = document.getElementById("artist");
    var songFile = document.getElementById("song_file");
    coverArt.src = SongMaster.songs[n].cover;
    songTitle.innerHTML = SongMaster.songs[n].title;
    artistName.innerHTML = SongMaster.songs[n].artist;
    songFile.src = SongMaster.songs[n].path;
    songFile.play();
	$(".footer").hide()
	$(".player").show()	
}

function staticChangeSong(cover, title, artist, path) {
    var coverArt = document.getElementById("cover_art");
    var songTitle = document.getElementById("song");
    var artistName = document.getElementById("artist");
    var songFile = document.getElementById("song_file");
    coverArt.src = cover;
    songTitle.innerHTML = title;
    artistName.innerHTML = artist;
    songFile.src = path;
    songFile.play();
	$(".footer").hide()
	$(".player").show()	
}

function getElems(n){
	return(SongMaster.songs[n])
}