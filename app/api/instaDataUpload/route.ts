import { instaDataCollection } from "@/datastax";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { revalidatePath } from "next/cache";

export type TSocialDataDocument = {
  $vectorize: string;
  userId: string;
}[];
// Add Data to Astra DB
export const POST = async (req: NextRequest) => {
  const data = await req.json();

  console.log(data);

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 500 }
    );
  }
  if (!data) {
    return NextResponse.json(
      { error: "No data found in the request" },
      { status: 400 }
    );
  }
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // Maximum number of characters per chunk
    chunkOverlap: 200, // Number of overlapping characters between chunks
  });

  const chunks = await splitter.splitText(data);
  try {
    const documents: TSocialDataDocument = chunks.map((chunk) => ({
      $vectorize: chunk,
      userId,
    }));
    const res = await instaDataCollection.insertMany(documents);

    if (!res) {
      return NextResponse.json(
        { error: "Failed to insert data" },
        { status: 500 }
      );
    }
    revalidatePath("/chat");
    return NextResponse.json({ message: "Data inserted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};
