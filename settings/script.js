const objetos = function (name) { return document.querySelectorAll(name) }

function startSettings() {
    const elements = objetos("input[type=\"checkbox\"]")
    elements.forEach(element => {
        element.addEventListener("change", function(){
            data.establecer(element.id, element.checked)
        })
    })
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