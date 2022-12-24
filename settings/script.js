const objetos = function (name) { return document.querySelectorAll(name) }
const elementoID = function (name) { return document.getElementById(name) }

function startSettings() {
    const checks = objetos("input[type=\"checkbox\"]")
    checks.forEach(check => {
        if (data.existe(`settings.chk.${check.id}`)) {
            check.checked = data.obtener(`settings.chk.${check.id}`) == "true" ? true : false
        } else {
            data.establecer(`settings.chk.${check.id}`, check.checked)
        }
        var childs = objetos(`.${check.id}_child`)
        childs.forEach(child => {
            if (check.checked) {
                child.classList.add("active")
                var inputs = objetos(`.${check.id}_child input[type="checkbox"]`)
                inputs.forEach(objeto => {
                    objeto.disabled = false
                })
            } else {
                child.classList.remove("active")
                var inputs = objetos(`.${check.id}_child input[type="checkbox"]`)
                inputs.forEach(objeto => {
                    objeto.disabled = true
                    objeto.checked = false
                })
            }
        })
        check.addEventListener("change", function () {
            data.establecer(`settings.chk.${check.id}`, check.checked)
            showRefreshMenu()
            var childs = objetos(`.${check.id}_child`)
            childs.forEach(child => {
                if (check.checked) {
                    child.classList.add("active")
                    var inputs = objetos(`.${check.id}_child input[type="checkbox"]`)
                    inputs.forEach(objeto => {
                        objeto.disabled = false
                    })
                } else {
                    child.classList.remove("active")
                    var inputs = objetos(`.${check.id}_child input[type="checkbox"]`)
                    inputs.forEach(objeto => {
                        objeto.disabled = true
                        objeto.checked = false
                    })
                }
            })
        })
    })
    document.getElementById("enableNotifications").addEventListener("change", function () {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            if (document.getElementById("enableNotifications").checked){
                var notification = new Notification("Notificaciones activadas", {body: "¡Hola!\nEsto sólo es un mensaje para comunicarte que has activado las notificaciones"});
            }
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    if (document.getElementById("enableNotifications").checked){
                        var notification = new Notification("Notificaciones activadas", {body: "¡Hola!\nEsto sólo es un mensaje para comunicarte que has activado las notificaciones"});
                    }
                } else {
                    document.getElementById("enableNotifications").checked = false
                }
            });
        }
    })
    const texts = objetos("input[type=\"text\"], input[type=\"number\"], input[type=\"email\"], input[type=\"password\"]")
    texts.forEach(text => {
        if (data.existe(`settings.txt.${text.id}`)) {
            text.value = data.obtener(`settings.txt.${text.id}`)
        } else {
            data.establecer(`settings.txt.${text.id}`, "")
        }
        text.addEventListener("change", function () {
            data.establecer(`settings.txt.${text.id}`, text.value)
            showRefreshMenu()
        })
    })
    document.getElementById("clearUserData").addEventListener("click", function(){
        if (!window.confirm("¿Estás segur@ de que desea borrar esta información?\nEste cambio es irreversible.")) return
        elementos = [
            "userName",
            "userAge",
            "userMail",
            "userCountry"
        ]
        elementos.forEach(elemento=>{
            elementoID(elemento).value = ""
            data.establecer(`settings.txt.${elemento}`, "")
        })
    })
}

function showRefreshMenu() {
    document.querySelector("div.float").classList.remove("invisible")
}

var data = {
    eliminar(ruta) {
        localStorage.removeItem(`${ruta}`);
        return localStorage
    },
    establecer(ruta, valor) {
        localStorage.setItem(`${ruta}`, `${valor}`);
        return console.info(`${ruta} tiene ahora el valor \"${valor}\"`)
    },
    existe(ruta) {
        if (localStorage[`${ruta}`]) return true;
        return false;
    },
    obtener(ruta) {
        return localStorage.getItem(`${ruta}`);
    },
    reset() {
        localStorage.clear();
    },
    table() {
        return console.table(localStorage)
    }
}