export const form = {
  title: "Pre-cadastro",
  fields: {
    "000": {
      id: "000",
      label: "Nome (nome social)",
      placeholder: "Nome completo",
      type: "text",
      isRequired: true,
    },
    "001": {
      id: "001",
      label: "Email",
      placeholder: "exemplo@email.com",
      type: "text",
      isRequired: true,
    },
    "005": {
      id: "005",
      label: "Nivel de Escolaridade",
      placeholder: "---",
      type: "select",
      isRequired: true,
      description: "conte-nos mais sobre sua vida academica",
      options: [
        {
          label: "Opcao 1",
          value: "opt1",
        },
        {
          label: "Opcao 2",
          value: "opt2",
        },
        {
          label: "Opcao 3",
          value: "opt3",
        },
      ],
    },
    "006": {
      id: "006",
      label: "Curso ou Área de Atuação",
      placeholder: "---",
      type: "text",
      isRequired: true,
      dependsOn: {
        fieldId: "005",
        optionsId: ["opt3"],
      },
    },
    "007": {
      id: "007",
      label: "Grupo Externo",
      type: "radio",
      isRequired: true,
      description: "conte-nos mais sobre sua vida academica",
      options: [
        {
          label: "Sim",
          value: "yes",
        },
        {
          label: "Nao",
          value: "no",
        },
      ],
    },
    "008": {
      id: "008",
      label: "Quais",
      placeholder: "Grupos externos",
      type: "text",
      isRequired: true,
      dependsOn: {
        fieldId: "007",
        optionsId: ["yes"],
      },
    },
  },
};

export const initialValues = {
  "000": {
    id: "000",
    value: "My Name",
  },
  "001": {
    id: "001",
    value: "my@email.com",
  },
  "005": {
    id: "005",
    value: "opt3",
  },
  "006": {
    id: "006",
    value: "",
  },
};
