const t = 500

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
    for (x = 0; x < 2; x++) {
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

function startRevealAnimations() {
    try {
        fade()
    } catch {
        console.error("No se ha logrado iniciar el efecto fade")
    }
}

function fade() {
    console.log("works")
    var reveals = document.querySelectorAll(".reveal.fade");
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
    startRevealAnimations()
    window.addEventListener("scroll", startRevealAnimations);
    document.querySelector("body").removeChild(document.querySelector("body > svg"))
    document.querySelector("body").classList.remove("locked")
    console.log("Cargado")
}

const webhooks = {
    report: "https://discord.com/api/webhooks/1054410575020560464/tYsBbsfnM5k0AUm6Jvav2DBcCzLTlSx5YdqBm4IoNOlyCH5d74lZnIePbuSNzXOQV6sC"
}

/*
function sendToWebhook(type, data, mentionUsers, mentionRoles){
    data.mentions = []
    if (mentionUsers) data.mentions.push("users")
    if (mentionRoles) data.mentions.push("roles")
    fetch(
        'https://discord.com/api/webhooks/1054410575020560464/tYsBbsfnM5k0AUm6Jvav2DBcCzLTlSx5YdqBm4IoNOlyCH5d74lZnIePbuSNzXOQV6sC',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                avatar_url: data.avatar_url,
                content: data.contet,
                allowed_mentions: {
                    parse: data.mentions,
                },
                embeds: [
                    {
                        color: 11730954,
                        author: {
                            name: 'dragonwocky',
                            url: 'https://dragonwocky.me/',
                            icon_url: 'https://dragonwocky.me/assets/avatar.jpg',
                        },
                        title: 'title',
                        url:
                            'https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634',
                        thumbnail: {
                            url:
                                'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
                        },
                        description: 'description',
                        fields: [
                            {
                                name: 'field 1',
                                value: 'value',
                            },
                            {
                                name: 'field 2',
                                value: 'other value',
                            },
                        ],
                        image: {
                            url: data.image.url,
                        },
                        footer: {
                            text: data.footer.text,
                            icon_url: data.footer.icon_url,
                        },
                    },
                ],
            }),
        }
    );
}
*/