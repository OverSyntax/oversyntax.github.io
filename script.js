const t = 500

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

load = async function () {
    const s = Snap();
    var x = 0
    var maskfondo = s.rect(0, 0, parseInt(window.innerWidth), parseInt(window.innerHeight))
    maskfondo.attr({
        fill: "white"
    });
    var circulo = s.circle(window.innerWidth / 2, window.innerHeight / 2, 0);
    mascara = s.group(maskfondo, circulo);
    var fondo = s.rect(0, 0, parseInt(window.innerWidth), parseInt(window.innerHeight))
    fondo.attr({
        mask: mascara,
        fill: "#000"
    });
    for (x = 0; x < 3; x++) {
        var circ = s.circle(window.innerWidth / 2, window.innerHeight / 2, 0);
        circ.animate({
            r: 0
        }, 0);
        circ.attr({
            fill: "transparent",
            stroke: "#FE1800",
            strokeWidth: 25
        });
        circ.animate({
            r: Math.max(parseInt(window.innerHeight/1.75), parseInt(window.innerWidth/1.75))
        }, t);
        await sleep(t)
        circ.remove()
    }
    circulo.animate({
        r: Math.max(parseInt(window.innerHeight/1.75), parseInt(window.innerWidth/1.75))
    }, t)
    return new Promise(resolve => setTimeout(resolve, t+200))
}

async function start() {
    await load()
    document.querySelector("body").removeChild(document.querySelector("body > svg"))
    document.querySelector("body").classList.remove("locked")
    console.log("Cargado")
}