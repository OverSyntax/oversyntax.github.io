async function submit(){
    var name = document.getElementById("nameInput").value
    var mail = document.getElementById("emailInput").value
    var msg = document.getElementById("descriptionInput").value
    var chk = document.getElementById("verifyNotifications").value
    return reportBug(name, mail, msg, chk)
}

async function reportBug(name, mail, msg, chk) {
    await fetch(
        'https://discord.com/api/webhooks/1054410575020560464/tYsBbsfnM5k0AUm6Jvav2DBcCzLTlSx5YdqBm4IoNOlyCH5d74lZnIePbuSNzXOQV6sC',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                allowed_mentions: {
                    parse: ["users", "roles"],
                },
                embeds: [
                    {
                        color: 11730954,
                        title: "BUG-REPORT",
                        description: `Un usuario ha reportado un error`,
                        fields: [
                            {
                                name: "Nombre:",
                                value: name?name:"*No especificado*",
                            },
                            {
                                name: "E-mail:",
                                value: mail?mail:"*No especificado*",
                            },
                            {
                                name: "Error:",
                                value: msg?msg:"*No especificado*",
                            },
                            {
                                name: "¿Quiere recibir información?",
                                value: chk?"Sí":"No"
                            }
                        ]
                    },
                ],
            }),
        }
    );
    return true
}