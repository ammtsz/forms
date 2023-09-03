import { t } from "i18next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (request: Request): Promise<Response | void> => {
  const { content, messages, lng } = await request.json();

  const language = lng === "pt" ? "Portuguese (Brazil)" : "English";

  const messagesBase = [
    {
      role: "system",
      content: `You will create a form with the given topic. Return a title and a description using a javascript object structure: { title: string, description: string }. The answer must start with: {. The form is in ${language}`,
    },
    {
      role: "user",
      content: `topic: ${content}`,
    },
  ];

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messagesBase, ...messages],
      temperature: 1.25,
      max_tokens: 300,
    });

    const aiContent = response.data.choices[0].message?.content;

    if (aiContent && aiContent.startsWith("{")) {
      return new Response(JSON.stringify(aiContent), {
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: t("create.ai.feedbacks.unableCreateTitleAndDescription"),
      }),
      { status: 500 }
    );
  }
};
