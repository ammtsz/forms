import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (request: Request): Promise<Response> => {
  const { content } = await request.json();

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will create a form with the given topic. Return a title and a description using a javascript object structure: { title: string, description: string }. The answer must start with: {. The form is in portuguese (Brazil)",
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 1.25,
      max_tokens: 300,
    });

    console.log(response.data.choices[0]);

    const aiContent = response.data.choices[0].message?.content;

    if (aiContent && aiContent.startsWith("{")) {
      return new Response(JSON.stringify(aiContent), {
        status: 201,
      });
    }

    return new Response(
      JSON.stringify({
        error: "Não foi possível gerar um título e uma descrição.",
      }),
      { status: 500 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao gerar um título e uma descrição." }),
      { status: 500 }
    );
  }
};
