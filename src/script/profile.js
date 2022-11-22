window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("prof-info").style.height = "80px";
  } else {
    document.getElementById("prof-info").style.height = "250px";
  }
}