"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TChartData } from "@/components/AiResponseRenderer";
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartBarColors = ["#f33535", "#33425b", "#d8e9f0", "#924966", "blue"];
export function MyLineChart({ chart }: { chart: TChartData }) {
  const accessors = Object.keys(chart?.data?.[0] ?? "") ?? "";
  if (!accessors || !chart.data) return null;
  console.log(chart.data);
  return (
    <Card>
      <CardHeader>
        {chart?.title && <CardTitle>{chart?.title}</CardTitle>}
        <CardDescription className="line-clamp-2 h-[4ch]">
          {chart?.suggestion}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            accessibilityLayer
            data={chart?.data}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={accessors?.[0]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value)?.toString() === "invalid date"
                  ? value
                  : new Date(value).toLocaleDateString("in-US", {
                      day: "numeric",
                      month: "short",
                    })
              }
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            {accessors?.map((accessor, index) => {
              if (index === 0) return null;
              return (
                <Line
                  key={accessor}
                  dataKey={accessor}
                  type={"natural"}
                  stroke={chartBarColors[index - 1]}
                  strokeWidth={2}
                  dot={true}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start flex gap-2 text-sm">
        {chart?.insight && (
          <div className="flex gap-2 font-medium leading-normal w-full items-start justify-between">
            <p className="w-full line-clamp-2">{chart?.insight}</p>
            {chart?.trend === "up" ? (
              <TrendingUp className="h-4 aspect-square inline-block w-4 text-green-500" />
            ) : chart?.trend === "down" ? (
              <TrendingDown className="h-4 aspect-square inline-block w-4 text-red-500" />
            ) : null}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
