import { Message } from "ai";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const prompt = [
      {
        role: "system",
        content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      `,
      },
    ];

    // Prepare the messages for the request
    const userMessages = messages.filter(
      (message: Message) => message.role === "user"
    );
    const fullPrompt = [...prompt, ...userMessages]
      .map((message) => message.content)
      .join("\n");

    // Make a request to the local AI service
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-r1",
      prompt: fullPrompt,
      stream: false,
    });

    const result = response.data;

    // Convert the response into a friendly text-stream
    return new Response(
      JSON.stringify({
        messages: [{ role: "assistant", content: result.response }],
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response("An error occurred while processing your request.", {
      status: 500,
      statusText: String(error),
    });
  }
}
