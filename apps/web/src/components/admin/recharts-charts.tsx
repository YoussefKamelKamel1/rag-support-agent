"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface ChartConfig {
  xKey: string;
  yKey: string;
  color?: string;
  domain?: [number, number];
}

export function DynamicBarChart({
  data,
  config,
}: {
  data: Record<string, unknown>[];
  config: ChartConfig;
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={config.xKey} />
        <YAxis domain={config.domain} />
        <Tooltip />
        <Bar
          dataKey={config.yKey}
          fill={config.color || "var(--primary)"}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DynamicLineChart({
  data,
  config,
}: {
  data: Record<string, unknown>[];
  config: ChartConfig;
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={config.xKey} />
        <YAxis domain={config.domain} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={config.yKey}
          stroke={config.color || "var(--primary)"}
          strokeWidth={2}
          dot={{ fill: config.color || "var(--primary)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
