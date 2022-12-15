
function yes() {
    console.log("hola")
    let User = new UserData();
    User.getCookie();
    let likes = User.liked_songs;
    let i=0;
    while (i<likes.length){
        console.log(likes.length);
        console.log(likes[i].path);
        $(".likes-song").append(`
            <div class="rand-song">
                <a class="round-button" onclick = "staticChangeSong(${likes[i].cover},${likes[i].title},${likes[i].artist},${likes[i].path})"><i class="fa fa-play fa-2x"></i></a>
                <div class="cover-img">
                    <img src= ${likes[i].cover}>
                    <p class="title">${likes[i].title}</p>
                    <p class="artist">${likes[i].artist}</p>	
                </div>
            </div>
        `)
        i++
}
}
yes();