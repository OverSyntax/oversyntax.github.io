async function reportBug(name, mail, msg, chk, tkn) {
    await fetch(
        "",
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