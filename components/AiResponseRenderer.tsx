"use client";
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { MyLineChart } from "@/components/charts/MyLineChart";
import { MyBarChart } from "./charts/MyBarCharts";
export type TChartData = {
  data?: Record<string, string | number>[];
  keys?: string[];
  type?: string;
  insight?: string;
  suggestion?: string;
  trend?: "up" | "down";
  title?: string;
};
const AIResponseRenderer = memo(function AIResponseRenderer({
  message,
  setPrompts,
}: {
  message: string;
  setPrompts?: Dispatch<SetStateAction<{ name: string; value: string }[]>>;
}) {
  const [isClient, setIsClient] = useState(false);
  const extractJSON = (message: string) => {
    const regex = /```json\n([\s\S]*?)\n```/; // Match everything between ```json and ```
    const match = message.match(regex);

    if (match && match[1]) {
      try {
        // Parse the extracted JSON string
        return JSON.parse(match[1]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    return null; // Return null if no match or error in parsing
  };
  const getAIParsedResponse = (text: string) => {
    const parsedJSON = extractJSON(text);
    if (!parsedJSON) return { report: text };

    return parsedJSON;
  };
  const parsedAIJson = getAIParsedResponse(message);
  useEffect(() => {
    setIsClient(true);
    if (parsedAIJson.questions) {
      setPrompts?.(parsedAIJson.questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient) return <div>Loading...</div>;

  console.log(parsedAIJson);
  return (
    <div className="flex w-full flex-col gap-4 bg-transparent backdrop-blur-sm rounded-md ">
      <div
        className="w-full prose dark:prose-invert prose-red prose-sm md:prose-lg
  prose-h1:font-bold min-w-full
 prose-p:text-justify prose-img:rounded-xl
 prose-headings:text-red-700 prose-headings:font-bold prose-h1:text-red-900 prose-h2:text-red-700 prose-h3:text-red-700
 prose-li:marker:text-red-700
 prose-strong:text-red-900 prose-strong:font-semibold
 prose-table:block prose-table:overflow-x-auto
 prose-table:p-4 prose-table:border-collapse  prose-td:border-red-500 prose-td:border-2 prose-th:border-red-700 prose-th:border-2 prose-th:p-2 prose-th:first:rounded-tl-md prose-table:border-red-700 prose-tr:border-red-700 rounded-md p-4 prose-p:text-red-700 prose-dl:text-red-700 prose-ol:text-red-700 prose-li:text-red-700 prose-table:text-red-900 prose-table:text-sm prose-table:text-center prose-table:font-semibold prose-thead:font-bold prose-th:truncate prose-td:text-center prose-th:text-center
"
      >
        <ReactMarkdown
          className="min-w-full"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          remarkRehypeOptions={{ passThrough: ["link"] }}
        >
          {parsedAIJson?.report}
        </ReactMarkdown>
      </div>
      {parsedAIJson?.charts?.length > 0 && (
        <div className="flex flex-1 w-full flex-wrap md:space-y-0 space-y-2 mt-4 text-black">
          {parsedAIJson?.charts?.map((chart: TChartData, index: number) => {
            if (chart?.type?.toLowerCase() === "line") {
              return (
                <div className="px-2 w-full md:w-1/2" key={index}>
                  <MyLineChart chart={chart} />
                </div>
              );
            }
            if (chart.type === "bar") {
              return (
                <div className="px-2 w-full md:w-1/2" key={index}>
                  <MyBarChart chart={chart} />
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
});

export default AIResponseRenderer;
