import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (request: Request): Promise<Response> => {
  const { content } = await request.json();

  const isValidSubject = content.length >= 3 && content.length <= 100;

  if (!isValidSubject) {
    return new Response(
      JSON.stringify({ error: "O tema deve ter de 3 a 100 caracteres" }),
      { status: 400 }
    );
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You have a typescript project that creates forms. It has the following structure:\n\ntype OptionsType = "select" | "radio" | "checkboxes"\ntype BasicType = "text" | "textarea" | "switch" | "checkbox"\ntype DateType = "date"\n\ninterface DateField {\n  type: DateType\n  max?: string\n  min?: string\n}\n\ninterface OptionsField {\n  type: OptionsType\n  options?: {\n    label: string\n    value: string\n  }[];\n  optionOther?: {\n    isVisible: boolean\n    placeholder: string\n  };\n}\n\ninterface BasicField {\n  type: BasicType\n}\n\ninterface FieldBase {\n  id: string\n  label: string\n  isRequired?: boolean\n  placeholder?: string\n  dependsOn?: {\n    fieldId: string\n    optionsValues: string[]\n  };\n  description?: string\n  value?: string;\n}\n\ntype FieldProps = FieldBase & (BasicField | OptionsField | DateField)\n\nexport interface FormProps {\n  title: string\n  description: string\n  fields: FieldProps[]\n}\n\nother requirements: \n1. the id is a string with the following format:  {FieldsType}--{uuidv4()} (eg. "text--d8b2a194-66a6-4c8b-ba6d-68fe496318f0");\n2. date fields has max and min values that can both be a date of format {yyyy-MM-dd} or both a number n where -3650 <= n <= 3650 which means the number of days from today;\n3. if dependsOn.fieldId is filled, optionsValues can\'t be an empty array;\n4. dependsOn prop cannot have a fieldId from a "date", "text" or "textarea" field types;\n5. Do not create a label "Outro", "Outros", "Outra", "Outras" on options array;\n\nWhen you receive a subject, you return an object based on that subject that follows the structure above. It will be a very complete ready to use object. The form must have 3 to 10 fields.\n\nIt is very important that the answer you give is only the object starting this way: {"title": ...\n\nIt is in Portuguese (Brazil).',
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 1,
      max_tokens: 2500,
    });

    const aiContent = response.data.choices[0].message?.content;

    if (aiContent && aiContent.startsWith("{")) {
      return new Response(JSON.stringify(aiContent), {
        status: 201,
      });
    }

    return new Response(
      JSON.stringify({
        error: "Não foi possível gerar um formulário com o tema informado.",
      }),
      {
        status: 500,
      }
    );
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({ error: "Erro ao gerar o formulário." }),
      { status: 500 }
    );
  }
};
