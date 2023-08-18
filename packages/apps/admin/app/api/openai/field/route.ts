import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (request: Request): Promise<Response> => {
  const { content, messages } = await request.json();

  const messagesBase = [
    {
      role: "system",
      content:
        'You have a typescript project that creates forms. It has the following structure:\n\ntype OptionsType = "select" | "radio" | "checkboxes"\ntype BasicType = "text" | "textarea" | "switch" | "checkbox"\ntype DateType = "date"\n\ninterface DateField {\n  type: DateType\n  max?: string\n  min?: string\n}\n\ninterface OptionsField {\n  type: OptionsType\n  options?: {\n    label: string\n    value: string\n  }[];\n}\n\ninterface BasicField {\n  type: BasicType\n}\n\ninterface FieldBase {\n  label: string\n  isRequired?: boolean\n  placeholder?: string\n  description?: string\n}\n\ntype FieldProps = FieldBase & (BasicField | OptionsField | DateField)\n\nother requirements: \n1. the id is a string with the following format:  {FieldsType}--{uuidv4()} (eg. "text--d8b2a194-66a6-4c8b-ba6d-68fe496318f0");\n2. date fields has max and min values that can both be a date of format {yyyy-MM-dd} or both a number n where -3650 <= n <= 3650 which means the number of days from today;\n3. date fields does not accept time;\n4. All fields must have a type and a label at least;\n5. Limit options to 2 items;\n\nYou will receive the topic and return 1 field . The label should not be equal the topic. It will be a ready to use object. The answer starts with: {\n\nIt is in Portuguese (Brazil).',
    },
    {
      role: "user",
      content,
    },
  ];

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messagesBase, ...messages],
      temperature: 1,
      max_tokens: 300,
    });

    const aiContent = response.data.choices[0].message?.content;

    if (aiContent && aiContent.startsWith("{")) {
      return new Response(JSON.stringify(aiContent), {
        status: 201,
      });
    }

    return new Response(
      JSON.stringify({
        error: "Não foi possível gerar um novo campo.",
      }),
      { status: 500 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao gerar um novo campo." }),
      { status: 500 }
    );
  }
};
