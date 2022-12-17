const t = 750

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

load = async function () {
    const s = Snap();
    var x = 0
    var width = parseInt(window.innerWidth)
    var height = parseInt(window.innerHeight)
    var maskfondo = s.rect(0, 0, width, height)
    maskfondo.attr({
        fill: "white"
    });
    var circulo = s.circle(window.innerWidth / 2, height / 2, 0);
    mascara = s.group(maskfondo, circulo);
    var fondo = s.rect(0, 0, width, height)
    fondo.attr({
        mask: mascara,
        fill: "#000"
    });
    for (x = 0; x < 3; x++) {
        var circ = s.circle(width / 2, height / 2, 0);
        circ.animate({
            r: 0
        }, 0);
        circ.attr({
            fill: "transparent",
            stroke: "#FE1800",
            strokeWidth: 25
        });
        circ.animate({
            r: Math.max(parseInt(height / 1.75), parseInt(width / 1.75))
        }, t);
        await sleep(t)
        circ.remove()
    }
    circulo.animate({
        r: Math.max(parseInt(height / 1.75), parseInt(width / 1.75))
    }, t)
    return new Promise(resolve => setTimeout(resolve, t + 200))
}

function reveal() {
    console.log("works")
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

async function start() {
    await load()
    reveal()
    window.addEventListener("scroll", reveal);
    document.querySelector("body").removeChild(document.querySelector("body > svg"))
    document.querySelector("body").classList.remove("locked")
    console.log("Cargado")
}

