"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const SuspenseFallback = () => (
  <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
    Loading chart...
  </div>
);

export function ChartWrapper({
  chart,
  data,
  config,
}: {
  chart: "bar" | "line";
  data: Record<string, unknown>[];
  config: {
    xKey: string;
    yKey: string;
    color?: string;
    domain?: [number, number];
  };
}) {
  const DynamicChart = dynamic(
    () =>
      import("./recharts-charts").then((mod) => ({
        default: chart === "bar" ? mod.DynamicBarChart : mod.DynamicLineChart,
      })),
    { ssr: false, loading: () => <SuspenseFallback /> }
  );

  return <DynamicChart data={data} config={config} />;
}
