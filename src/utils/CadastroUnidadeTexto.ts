const secoes = [
    {
        id: 1,
        titulo: "Insira os dados básicos da Unidade",
        entradaTexto: [
            {
                id: 1,
                label: "Nome",
                placeholder: 'Digite o nome da unidade.',
            },
            {
                id: 2,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
            {
                id: 3,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
            {
                id: 4,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
            {
                id: 5,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
            {
                id: 6,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
            {
                id: 7,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
            {
                id: 8,
                label: "Área",
                placeholder: 'Digite a área total da unidade.'
            },
        ],
        checkbox:[]
    },
    {
        id: 2,
        titulo: "Insira os dados complementares da Unidade",
        entradaTexto: [
            {
                id: 1,
                label: "Volume",
                placeholder: 'Digite o volume da unidade.'
            },
            {
                id: 2,
                label: "Usuario",
                placeholder: 'Digite o usuário responsável pela unidade.'
            },
        ],
        checkbox:[]
    },
    {
      id: 3,
      titulo: "Indique se a Unidade está ativa ou não",
      entradaTexto: [],
      checkbox: [
          {
              id: 1,
              value: "Unidade ativa."
          },
          {
              id: 2,
              value: "Unidade inativa."
          },
          {
            id: 3,
            value: "Unidade quse fechando."
        },
      ]
  }
]
export {secoes}