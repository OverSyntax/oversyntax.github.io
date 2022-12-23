async function submit() {
    var name = document.getElementById("nameInput").value
    var mail = document.getElementById("emailInput").value
    var msg = document.getElementById("descriptionInput").value
    var chk = document.getElementById("verifyNotifications").checked
    return reportBug(name, mail, msg, chk)
}


async function reportBug(name, mail, msg, chk) {
    if (!data.existe("lastBugReport")) {
        data.establecer("lastBugReport", 0)
    }
    var time = data.obtener("lastBugReport")
    if ((time + (3600 * 24)) > Date.now()) {
        window.alert("¡Sólo se puede reportar un error cada 24 horas!")
    } else {
        await fetch(
            process.env.BUG_REPORT_WEBHOOK,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    allowed_mentions: {
                        parse: ["users"],
                    },
                    embeds: [
                        {
                            color: 11730954,
                            title: "BUG-REPORT",
                            description: `Un usuario ha reportado un error`,
                            fields: [
                                {
                                    name: "Nombre:",
                                    value: name ? name : "*No especificado*",
                                },
                                {
                                    name: "E-mail:",
                                    value: mail ? mail : "*No especificado*",
                                },
                                {
                                    name: "Error:",
                                    value: msg ? msg : "*No especificado*",
                                },
                                {
                                    name: "¿Quiere recibir información?",
                                    value: chk ? "Sí" : "No"
                                }
                            ]
                        },
                    ],
                }),
            }
        );
        return true
    }
}