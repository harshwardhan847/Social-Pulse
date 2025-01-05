"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TChartData } from "../AiResponseRenderer";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const chartBarColors = ["#f33535", "#33425b", "#d8e9f0", "#924966", "blue"];

export function MyBarChart({ chart }: { chart: TChartData }) {
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
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chart?.data}
            layout="vertical"
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <XAxis type="number" dataKey={accessors?.[1]} hide />
            <YAxis
              dataKey={accessors?.[0]}
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value)?.toString()?.toLowerCase() === "invalid date"
                  ? value?.slice(0, 6)
                  : new Date(value).toLocaleDateString("in-US", {
                      day: "numeric",
                      month: "short",
                    })
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {accessors?.map((accessor, index) => {
              if (index === 0) return null;
              return (
                <Bar
                  key={accessor}
                  dataKey={accessor}
                  fill={chartBarColors[index - 1]}
                  radius={5}
                />
              );
            })}
          </BarChart>
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
