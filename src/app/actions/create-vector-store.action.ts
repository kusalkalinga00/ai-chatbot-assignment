"use server";
import { createReadStream } from "fs";
import OpenAI from "openai";

export const createVectorStore = async () => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const vector_store = await client.vectorStores.create({
    name: "Ashoka Hospital Information",
  });

  try {
    const result = await client.vectorStores.files.uploadAndPoll(
      vector_store.id,
      createReadStream("data.json")
    );

    return {
      message: "Vector store created successfully",
    };
  } catch (error) {
    console.error("Error creating vector store:", error);
    return {
      error: "Error creating vector store",
    };
  }
};
