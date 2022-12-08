/* Index script */
let is_sidebar_on=0;


function openPage(site) {
    document.location.href = site;
}

function openMobileSidebar(){
    let sidebar = $('#id-sidebar');
    if (is_sidebar_on==0){
        is_sidebar_on=1;
        sidebar.show("100");
        sidebar.style.display="flex";
    }
    else if (is_sidebar_on==1){
        is_sidebar_on=0;
        sidebar.hide();
    }
    
}