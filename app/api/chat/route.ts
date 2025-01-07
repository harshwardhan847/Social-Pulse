import { instaDataCollection } from "@/datastax";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    console.log("userId", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 160000); // 1 minute timeout
    const tweaks = {
      "ChatInput-dbLB4": {
        background_color: "",
        chat_icon: "",
        files: "",
        // input_value: "give me a report on carousels last month performance",
        sender: "User",
        sender_name: "User",
        session_id: "",
        should_store_message: true,
        text_color: "",
      },
      "ParseData-xprEN": {
        sep: "\n",
        template: "{text}",
      },
      "Prompt-M8Wzm": {
        context: "",
        question: "",
        template: `
{context}
---
You are "Ronnie," a highly intelligent and analytical Social Media Performance Analyser Bot, equipped with advanced skills in social media management and content writing. Based on the provided context and social media data, follow these guidelines:

### Core Capabilities:
1. **Post Analysis**:
   - Analyze post performance across key metrics like engagement rate, likes, comments, shares, and saves.
   - Identify top-performing post types (e.g., Videos, Carousel, Text, etc.) and highlight actionable trends and patterns.
   - if user ask for specific post insights you should prefer giving them insights like:-
      --Carousel posts have 20% higher engagement than static posts
      --Reels drive 2x more comments compared to other formats.

2. **Actionable Recommendations**:
   - Provide data-backed insights to improve engagement and optimize post performance.
   - Suggest strategies like optimal post frequency, best posting times, and effective content types.

3. **Growth Strategies**:
   - Offer comprehensive social media growth plans upon explicit request.
   - Recommend audience engagement tactics (e.g., hashtags, content styles, or interactive posts).

4. **Content Writing and Strategy**:
   - Assist with crafting engaging captions, post ideas, or campaigns tailored to the platform.
   - Help optimize content for specific audiences or goals.

5. **Post-Specific Insights**:
   - If asked about a specific post, find it based on the provided details (e.g., date or content) and offer concise insights.

6. **Follow-Up Engagement**:
   - Suggest three concise, relevant questions the user might want to ask next, encouraging deeper exploration of their social media strategy.

### Response Format:
Respond naturally and concisely, like a human expert. Only generate detailed reports if explicitly requested of userId ${userId}(Comprehensive Analysis of Post Performance,Actionable Insights and Recommendations,Growth Strategy & Optimization Tips, use tables if applicable). Maintain clarity and relevance in all interactions.

Question:
{question}

Answer:
It should be a json with keys:

#### JSON Response Structure:
report- //Markdown giving answer to user's question.(provide a detailed report of user's social media if applicable)
questions- //array of questions that can be further asked by user(Max. 3 questions)
questions:[
name://short title of the question for UI
value://actual question prompt
]
charts- //array of chart data to generate chart (only include if it is useful for user in this answering the question:-"{question}")
charts:[
type:// type of chart can be "bar" or "line",
title://title of chart
data://data to generate chart prefer using dates or post types as x axis of the graph(array of an object which contain x-axis data's keys which are labels and y-axis data's as value of that key'),
insight:// a useful insight on chart's data,
trend://can have value "up" or "down" define the chart's growth
suggestion://any suggestion based on the chart

]
`,
      },
      "SplitText-51HeC": {
        chunk_overlap: 200,
        chunk_size: 1000,
        separator: "\n",
      },
      "OpenAIModel-sJc97": {
        api_key: process.env.OPENAI_API_KEY as string,
        input_value: "",
        json_mode: false,
        max_tokens: null,
        model_kwargs: {},
        model_name: "gpt-4o-mini",
        openai_api_base: "",
        output_schema: {},
        seed: 1,
        stream: false,
        system_message: "",
        temperature: 0.1,
      },
      "ChatOutput-3O03u": {
        background_color: "",
        chat_icon: "",
        data_template: "{text}",
        input_value: "",
        sender: "Machine",
        sender_name: "AI",
        session_id: "",
        should_store_message: true,
        text_color: "",
      },
      "AstraDB-WKKW1": {
        advanced_search_filter: "{}",
        api_endpoint:
          "https://fcc1f901-cd40-4f52-9abd-6138831db6ce-us-east-2.apps.astra.datastax.com",
        batch_size: null,
        bulk_delete_concurrency: null,
        bulk_insert_batch_concurrency: null,
        bulk_insert_overwrite_concurrency: null,
        collection_indexing_policy: "",
        collection_name: "social_data",
        embedding_choice: "Embedding Model",
        keyspace: "",
        metadata_indexing_exclude: "",
        metadata_indexing_include: "",
        metric: "cosine",
        number_of_results: 4,
        pre_delete_collection: false,
        search_filter: {},
        search_input: "",
        search_score_threshold: 0,
        search_type: "Similarity",
        setup_mode: "Sync",
        token: "ASTRA_DB_APPLICATION_TOKEN",
      },
      "OpenAIEmbeddings-s7cOT": {
        chunk_size: 1000,
        client: "",
        default_headers: {},
        default_query: {},
        deployment: "",
        dimensions: null,
        embedding_ctx_length: 1536,
        max_retries: 3,
        model: "text-embedding-3-small",
        model_kwargs: {},
        openai_api_base: "",
        openai_api_key: process.env.OPENAI_API_KEY as string,
        openai_api_type: "",
        openai_api_version: "",
        openai_organization: "",
        openai_proxy: "",
        request_timeout: null,
        show_progress_bar: false,
        skip_empty: false,
        tiktoken_enable: true,
        tiktoken_model_name: "",
      },
      "AstraDB-XxTM8": {
        advanced_search_filter: "{}",
        api_endpoint:
          "https://fcc1f901-cd40-4f52-9abd-6138831db6ce-us-east-2.apps.astra.datastax.com",
        batch_size: null,
        bulk_delete_concurrency: null,
        bulk_insert_batch_concurrency: null,
        bulk_insert_overwrite_concurrency: null,
        collection_indexing_policy: "",
        collection_name: "social_data",
        embedding_choice: "Embedding Model",
        keyspace: "",
        metadata_indexing_exclude: "",
        metadata_indexing_include: "",
        metric: "cosine",
        number_of_results: 4,
        pre_delete_collection: false,
        search_filter: {},
        search_input: "",
        search_score_threshold: 0,
        search_type: "Similarity",
        setup_mode: "Sync",
        token: "ASTRA_DB_APPLICATION_TOKEN",
      },
      "OpenAIEmbeddings-n5osj": {
        chunk_size: 1000,
        client: "",
        default_headers: {},
        default_query: {},
        deployment: "",
        dimensions: null,
        embedding_ctx_length: 1536,
        max_retries: 3,
        model: "text-embedding-3-small",
        model_kwargs: {},
        openai_api_base: "",
        openai_api_key: process.env.OPENAI_API_KEY as string,
        openai_api_type: "",
        openai_api_version: "",
        openai_organization: "",
        openai_proxy: "",
        request_timeout: null,
        show_progress_bar: false,
        skip_empty: false,
        tiktoken_enable: true,
        tiktoken_model_name: "",
      },
      "File-0a0oO": {
        concurrency_multithreading: 4,
        path: "test_dataset (1).csv",
        silent_errors: false,
        use_multithreading: false,
      },
    };

    try {
      const { message } = await request?.json();
      if (!message) throw new Error("No message");
      const raw = JSON.stringify({
        input_value: message,
        output_type: "chat",
        input_type: "chat",
        tweaks,
      });
      if (
        !process.env.LANG_FLOW_API_URL ||
        !process.env.LANG_FLOW_APPLICATION_TOKEN
      ) {
        throw new Error("Missing environment variables");
      }
      const response = await fetch(process.env.LANG_FLOW_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LANG_FLOW_APPLICATION_TOKEN}`,
        },
        body: raw,
        signal: controller.signal,
      });
      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.log(e);
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid JSON response from API");
      }

      return NextResponse.json(data);
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
    clearTimeout(timeoutId);
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  //does user has data in db
  try {
    const { userId } = await auth();
    console.log("userId", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 160000);

    // await instaDataCollection.deleteMany({});

    const response = await instaDataCollection.findOne({
      userId: userId,
    });

    clearTimeout(timeoutId);
    console.log("has data", response);
    if (response) {
      return NextResponse.json(true);
    }
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
