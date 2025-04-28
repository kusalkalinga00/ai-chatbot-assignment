"use server";
import OpenAI from "openai";

function formatResults(
  results: OpenAI.VectorStores.VectorStoreSearchResponsesPage
) {
  let formattedResults = "";
  for (const result of results.data) {
    let formattedResult = `<result file_id='${result.file_id}' file_name='${result.filename}'>`;
    for (const part of result.content) {
      formattedResult += `<content>${part.text}</content>`;
    }
    formattedResults += formattedResult + "</result>";
  }
  return `<sources>${formattedResults}</sources>`;
}

export const retrieveVectorStore = async ({ query }: { query: string }) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const vector_store = await client.vectorStores.list();

    const results = await client.vectorStores.search(vector_store.data[0].id, {
      query,
      rewrite_query: true,
    });

    const formattedResults = formatResults(results);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content:
            "Produce a concise answer to the query based on the provided sources. format the answer in markdown. format the tables in markdown correctly If the sources are not relevant, say 'No specific information found'.",
        },
        {
          role: "user",
          content: `Sources: ${formattedResults}\n\nQuery: '${query}'`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error retrieving vector store:", error);
  }
};
