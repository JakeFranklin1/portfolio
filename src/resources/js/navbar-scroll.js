var prevScrollpos = window.scrollY || window.pageYOffset;
var navFunctionalityEnabled = window.innerWidth >= 768;

window.onscroll = function() {
    if (!navFunctionalityEnabled) return;

    var currentScrollPos = window.scrollY || window.pageYOffset;
    console.log('Previous Scroll Position: ' + prevScrollpos);
    console.log('Current Scroll Position: ' + currentScrollPos);

    if (currentScrollPos > 100) {
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav").style.top = "0";
        } else {
            document.getElementById("nav").style.top = "-100px";
        }
    } else {
        document.getElementById("nav").style.top = "0";
    }
    prevScrollpos = currentScrollPos;
}

window.onresize = function() {
    navFunctionalityEnabled = window.innerWidth >= 768;
}
