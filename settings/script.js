const objetos = function (name) { return document.querySelectorAll(name) }

function startSettings() {
    const checks = objetos("input[type=\"checkbox\"]")
    checks.forEach(check => {
        check.addEventListener("change", function(){
            data.establecer(`settings.chk.${check.id}`, check.checked)
        })
        if(data.existe(check.id)) {
            check.checked = data.obtener(`settings.chk.${check.id}`)=="true"?true:false
        } else {
            data.establecer(`settings.chk.${check.id}`, check.checked)
        }
    })
    const texts = objetos("input[type=\"text\"], input[type=\"number\"], input[type=\"email\"], input[type=\"password\"]")
    console.log(data.table())
    texts.forEach(text => {
        if(data.existe(text.id)) {
            text.value = data.obtener(`settings.txt.${text.id}`)=="true"?true:false
        } else {
            data.establecer(`settings.txt.${text.id}`, "")
        }
        text.addEventListener("change", function(){
            data.establecer(`settings.txt.${text.id}`, text.value)
        })
    })
    console.log(texts)

    if (!window.confirm("La página se encuentra en desarrollo y ninguna de sus funcionalidades está activa.\n¿Desea acceder de todas formas?")) {
        window.location = "https://oversyntax.github.io"
    }
}

function showRefreshMenu() {

}
const data = {
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