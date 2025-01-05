"use client";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import Link from "next/link";

// import papaParser from "papaparse";

// type TCSV = {
//   post_type?: string;
//   upload_date?: string;
//   saves?: string;
//   shares?: string;
//   likes?: string;
//   comments?: string;
//   views?: string;
//   engagement_rate?: string;
// };

const UploadData = () => {
  const [data, setData] = React.useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) {
      alert("Please upload a file");
      return;
    }

    const text = await data.text();
    // const parsedData = papaParser?.parse<TCSV>(text, { header: true })?.data;
    // console.log(parsedData);
    // if (!parsedData) {
    //   alert("Invalid file format");
    //   return;
    // }

    // const convertedData = parsedData?.map((data: TCSV) => {
    //   let engagement_rate: number | undefined = undefined;
    //   if (data?.likes && data?.comments && data?.shares && data?.views) {
    //     engagement_rate =
    //       ((Number(data?.likes) +
    //         Number(data?.comments) +
    //         Number(data?.shares)) /
    //         Number(data?.views)) *
    //       100;
    //   }
    //   if (!data?.post_type) return;

    //   return `I uploaded a ${data?.post_type} post with ${data?.views} views, ${
    //     data?.likes
    //   } likes, ${data?.comments} comments, ${data?.shares} shares, ${
    //     data?.saves
    //   } saves and an engagement rate of ${
    //     engagement_rate ? `${engagement_rate?.toFixed(2)}%` : "'N/A'"
    //   } on ${data?.upload_date}.`;
    // });

    const chunkSize = 1000; // Maximum number of characters per chunk
    const chunkOverlap = 200; // Number of overlapping characters between chunks

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });

    const chunks = await splitter.createDocuments([text]);

    // Output the chunks
    const dataToSend = chunks.map((chunk) => {
      return {
        $vectorize: chunk.pageContent,
      };
    });

    console.log(dataToSend);

    fetch("/api/instaDataUpload", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-sm items-center gap-1.5"
    >
      <Label htmlFor="data_file">Data PDF</Label>
      <Input
        onChange={(e) => e.target?.files?.[0] && setData(e.target?.files?.[0])}
        id="data_file"
        type="file"
        accept=".csv"
      />
      <Button type="submit">Upload</Button>
      <Link href="test_dataset.csv" download className="text-sm text-blue-600">
        Test Dataset
      </Link>
    </form>
  );
};

export default UploadData;
