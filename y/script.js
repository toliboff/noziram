document.addEventListener("scroll", function(event) {
    // get current scroll position   
    var currentScrollPos = window.pageYOffset;
    // var currentScrollPos = window.scrollTop;

    if (currentScrollPos >= 194) {
        // show your div 

        document.querySelector(".hidden-logo").style.display = "flex";
    } else {
        document.querySelector(".hidden-logo").style.display = "none";
    }
}, false);

////////////////////////////////////////////////
let userBtn = document.querySelector("#user");
userBtn.addEventListener('click', function() {
    // alert("Hi")
    document.querySelector(".login-container").style.display = "flex";
})

let closeBtn = document.querySelector(".close");
closeBtn.addEventListener('click', function() {
    // alert("Hi")
    document.querySelector(".login-container").style.display = "none";
})