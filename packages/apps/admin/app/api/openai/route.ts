import { Configuration, OpenAIApi } from "openai";

import { SYSTEM_CONTENT } from "./utils";

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
          content: SYSTEM_CONTENT,
        },
        {
          role: "user",
          content,
        },
      ],
      temperature: 0,
      max_tokens: 2500,
      top_p: 0,
    });

    const resp = response.data.choices[0];

    console.log(resp.message?.content);

    if (response) {
      return new Response(JSON.stringify(response), {
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
