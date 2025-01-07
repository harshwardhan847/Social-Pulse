"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { revalidatePath } from "next/cache";

const UploadData = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) {
      alert("Please upload a file");
      return;
    }

    const parsedData = await data.text();
    console.log(parsedData);
    if (!parsedData) {
      alert("Invalid file format");
      return;
    }
    setLoading(true);

    fetch("/api/instaDataUpload", {
      method: "POST",
      body: JSON.stringify(parsedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Data uploaded successfully",
        });
        revalidatePath("/chat");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card className="min-w-[500px]">
      <CardHeader>
        <CardTitle className="text-5xl text-start bg-clip-text text-transparent bg-gradient-to-r from-black via-primary to-primary">
          Upload Data
        </CardTitle>
      </CardHeader>
      <form
        onSubmit={handleSubmit}
        className="grid w-full items-center gap-1.5"
      >
        <CardContent className="w-full">
          <Label>CSV file</Label>
          <Input
            disabled={loading}
            onChange={(e) =>
              e.target?.files?.[0] && setData(e.target?.files?.[0])
            }
            placeholder="Upload CSV file"
            id="data_file"
            type="file"
            accept=".csv"
            className="w-full"
          />
          <Link
            href="test_dataset.csv"
            download
            className="text-sm text-primary underline"
          >
            Test Dataset
          </Link>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={loading} type="submit">
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UploadData;
