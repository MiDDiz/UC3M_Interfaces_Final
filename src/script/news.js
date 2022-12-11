/*News script*/ 
let number_of_songs = 20;

__init__();


function __init__() {
    let song_numb_list = create_reandom_list();
    for (let song = 0; song < song_numb_list.length; song++){
        let newsong = getElems(song_numb_list[song])
        $(".news-rand-song").append(`
            <div class="rand-song">
                <a class="round-button" onclick = "changeSong(${song_numb_list[song]})"><i class="fa fa-play fa-2x"></i></a>
                <div class="cover-img">
                    <img src= ${newsong.cover}>
                    <p class="title">${newsong.title}</p>
                    <p class="artist">${newsong.artist}</p>	
                </div>
            </div>
        `)
    }
}

function create_reandom_list(){
    let song_numb_list = [];
    for (let song = 0; song < 12; song++){
        let new_num = Math.floor(Math.random() * 20);
        let is_in_list =true
        while(is_in_list==true){
            is_in_list = false
            for (let num = 0; num < song_numb_list.length; num++){
                if (song_numb_list[num]==new_num){
                    is_in_list = true
                }
            }
            if (is_in_list==true){
                new_num = Math.floor(Math.random() * 20)
            }
        }
        song_numb_list.push(new_num)
    }
    return song_numb_list
}