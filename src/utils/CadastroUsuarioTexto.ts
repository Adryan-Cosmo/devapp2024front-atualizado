const usuarios = 
    {
        id: 1,
        titulo: "Cadastro de Usuário",
        entradaTexto: [
            {
                id: 1,
                label: "Nome",
                placeholder: 'Digite o nome completo.',
                name: "nome"
            },
            {
                id: 2,
                label: "CPF",
                placeholder: 'Digite o CPF.',
                name: "cpf"
            },
            {
                id: 3,
                label: "E-mail",
                placeholder: 'Digite o e-mail.',
                name: "email"
            },
            {
                id: 4,
                label: "Senha",
                placeholder: 'Digite a senha.',
                secureTextEntry:true,
                name: "senha"
            },
            {
                id: 5,
                label: "Confirmação de Senha",
                placeholder: 'Digite novamente sua senha.',
                secureTextEntry:true,
                name: "confirmacao"
            }
        ]
    }
export {usuarios}