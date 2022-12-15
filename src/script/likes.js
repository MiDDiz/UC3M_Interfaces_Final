
function yes() {
    console.log("hola")
    let User = new UserData();
    User.getCookie();
    let likes = User.liked_songs;
    let i=0;
    while (i<likes.length){
        console.log(likes.length);
        console.log(likes[i].path);
		let song = likes[i];

        $(".likes-song").append(`
		<div class="section-song">
			<a class="round-button" onclick = "staticChangeSong('${song.cover}', '${song.title}', '${song.artist}', '${song.path}')">
				<i class="fa fa-play fa-2x"></i>
			</a>
			<div class="cover-img">
				<img src=${song.cover} alt="song">
				<p class="title">${song.title}</p>
				<p class="artist">${song.artist}</p>	
			</div>
		</div>
        `);
        i++
	}
}
yes();