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
    document.querySelector("#closeButton").addEventListener("click", function () {
        document.querySelector(".specialfix").classList.remove("active")
    })
    document.querySelector("#openButton").addEventListener("click", function () {
        document.querySelector(".specialfix").classList.add("active")
    })
    startLabels()
    filter()
}

function startLabels() {
    const children = document.querySelector("#etiquetas").children
    for (var i = 0; i < children.length; i++) {
        if (url.has("label", children[i].innerHTML.toLowerCase())) {
            children[i].classList.add("active")
        }
        children[i].addEventListener("click", function () {
            this.classList.toggle("active")
            document.getElementById("applyButton").disabled = false
        })
    }
}

function filter() {
    const repos = document.querySelector("#repos").children
    const labels = url.obtenerData("label")[0].value
    var count = 0
    for ( var i = 0;i<repos.length;i++) {
        if(repos[i].localName == "a") {
            if (labels.length>0){
                var show = false
                var cardvalues = repos[i].attributes["etiquetas"].value.split(";")
                labels.forEach(label => {
                    cardvalues.forEach(value => {
                        if (value==label) show = true
                    })
                })
                repos[i].hidden = !show
                if (show) count =+ 1
            } else {
                repos[i].hidden = false
                count =+ 1
            }
        }
    }
    console.log(count)
    if (count>0) {
        document.getElementById("nothing").hidden = true  
    } else {
        document.getElementById("nothing").hidden = false  
    }
}

function applyFilters() {
    const children = document.querySelector("#etiquetas").children
    let labels = []
    for (var i = 0; i < children.length; i++) {
        if (children[i].classList.contains("active")) {
            labels.push(children[i].innerHTML.toLowerCase())
        }
    }
    if (labels.length == 0 ) return url.eliminarData("label")
    return url.establecerData("label", labels)
}

const url = {
    complete: window.location.href,
    obtenerData(parent, scope) {
        try {
            const scopes = this.complete.split("?")[1].split("&")
            var new_scopes = []
            scopes.forEach(scope => {
                new_scopes.push({name: scope.split("=")[0], value: scope.split("=")[1].split(";") })
            })
            return new_scopes
        } catch {
            return []
        }
    },
    añadirData(parent, value, scopes) {
        scopes = scopes || this.obtenerData()
        if (this.exist(parent)){
            for (var i = 0;i<scopes.length;i++) {
                if (scopes[i].name == parent) {
                    if (value && value!=null && value!="") {
                        scopes[i].value.push(value)
                    } else {
                        if (typeof value != "object") {
                            scopes[i].value = [value]
                        } else {
                            scopes[i].value = value
                        }
                    }
                }
            }
        } else {
            return this.establecerData(parent, value, scopes)
        }
        return this.apply(scopes)
    },
    eliminarData(parent, value, scopes) {
        scopes = scopes || this.obtenerData()
        for (var i = 0;i<scopes.length;i++) {
            if (scopes[i].name == parent) {
                if (value && value!=null && value!="" && scopes[i].value.length>1) {
                    var newArray = []
                    for (var x = 0;i<scopes[i].value.length;i++) {
                        if (scopes[i].value[x] != value) {
                            newArray.push(value)
                        }
                    }
                    scopes[i].value = newArray
                } else {
                    scopes[i] = undefined
                }
            }
        }
        return this.apply(scopes)
    },
    establecerData(parent, value, scopes) {
        scopes = scopes || this.obtenerData()
        if (typeof value != "object") {
            value = [value]
        }
        if (this.exist(parent)) {
            for (var i = 0;i<scopes.length;i++) {
                if (scopes[i].name == parent) {
                    scopes[i].value = value
                }
            }
        } else {
            scopes[scopes.length] = {name: parent, value: value}
        }
        console.log(scopes)
        return this.apply(scopes)
    },
    obtener() {
        try {
            return this.complete.split("?")[0]
        } catch {
            return this.complete
        }
    },
    apply(scopes) {
        scopes = scopes || this.obtenerData()
        var toShow = []
        for (var i = 0;i<scopes.length;i++) if (scopes[i]) toShow.push(`${scopes[i].name}=${scopes[i].value.join(";")}`)
        return window.location.href = `${this.obtener().endsWith("/")?this.obtener():`${this.obtener()}/`}?${toShow.join("&")}`
    },
    exist(parent, scopes) {
        scopes = scopes || this.obtenerData()
        if (scopes==undefined) return false
        for (var i = 0;i<scopes.length;i++) {
            if (scopes[i].name == parent) return true
        }
        return false
    },
    has(parent, value, scopes) {
        if (! this.exist(parent)) return false
        scopes = scopes || this.obtenerData()
        for (var i = 0;i<scopes.length;i++) {
            if (scopes[i].name == parent) {
                values = scopes[i].value
                return values.includes(value.toLowerCase())
            }
        }
        return false
    }
}