function fade() {
    var reveal = document.querySelector(".specialfix");
    var block = document.querySelector("#filters");
    var windowHeight = window.innerHeight;
    var elementTop = reveal.getBoundingClientRect().top;
    var blockTop = block.getBoundingClientRect().top;
    if (((windowHeight * 0.25) < (windowHeight - elementTop)) && (blockTop < (windowHeight * 0.25))) {
        reveal.style.top = "20vh";
        reveal.classList.add("fixed")
    } else {
        reveal.style = "";
        reveal.classList.remove("fixed")
    }
}

function load() {
    document.querySelector("#closeButton").addEventListener("click", function(){
        document.querySelector(".specialfix").classList.remove("active")
    })
    document.querySelector("#openButton").addEventListener("click", function(){
        document.querySelector(".specialfix").classList.add("active")
    })
}