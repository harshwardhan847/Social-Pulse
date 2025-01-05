import { instaDataCollection } from "@/datastax";
import { deleteUserSocialData } from "@/datastax/deleteUserSocialData";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
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
  await deleteUserSocialData();
  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "No data found in the request" },
      { status: 400 }
    );
  }
  try {
    const documents: TSocialDataDocument = data.map(
      ({
        $vectorize,
        post_type,
        upload_date,
        saves,
        shares,
        likes,
        comments,
        views,
      }: {
        $vectorize: string;
        post_type?: string;
        upload_date?: string;
        saves?: string;
        shares?: string;
        likes?: string;
        comments?: string;
        views?: string;
        engagement_rate?: string;
      }) => ({
        $vectorize,
        metadata: {
          post_type,
          upload_date,
          saves,
          shares,
          likes,
          comments,
          views,
        },
        userId,
      })
    );
    const res = await instaDataCollection.insertMany(documents);

    if (!res) {
      return NextResponse.json(
        { error: "Failed to insert data" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Data inserted successfully" });

    // try {
    //   const documents: TSocialDataDocument = data.map(
    //     ({
    //       post_type,
    //       upload_date,
    //       saves,
    //       shares,
    //       likes,
    //       comments,
    //       views,
    //       engagement_rate,
    //     }: {
    //       post_type?: string;
    //       upload_date?: string;
    //       saves?: string;
    //       shares?: string;
    //       likes?: string;
    //       comments?: string;
    //       views?: string;
    //       engagement_rate?: string;
    //     }) => ({
    //       userId,
    //       post_type,
    //       upload_date,
    //       saves,
    //       shares,
    //       likes,
    //       comments,
    //       views,
    //       engagement_rate,
    //     })
    //   );
    //   const res = await insightsDataCollection.insertMany(documents);
    //   return NextResponse.json(res);
    // } catch (e) {
    //   console.error(e);
    //   return NextResponse.json(
    //     {
    //       error:
    //         "An error occurred while processing your request: Adding in insights data",
    //     },
    //     { status: 500 }
    //   );
    // }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};
