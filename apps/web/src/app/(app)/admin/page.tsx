"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Clock, ThumbsUp, DollarSign } from "lucide-react";
import { ChartWrapper } from "@/components/admin/chart-wrapper";

const dailyQueries = [
  { day: "Mon", count: 45 },
  { day: "Tue", count: 52 },
  { day: "Wed", count: 38 },
  { day: "Thu", count: 61 },
  { day: "Fri", count: 48 },
  { day: "Sat", count: 22 },
  { day: "Sun", count: 15 },
];

const confidenceTrend = [
  { date: "May 15", confidence: 0.82 },
  { date: "May 16", confidence: 0.85 },
  { date: "May 17", confidence: 0.84 },
  { date: "May 18", confidence: 0.88 },
  { date: "May 19", confidence: 0.89 },
  { date: "May 20", confidence: 0.91 },
  { date: "May 21", confidence: 0.92 },
];

const feedbackItems = [
  { question: "pricing details", rating: "positive", time: "2 hours ago" },
  { question: "refund policy", rating: "positive", time: "3 hours ago" },
  { question: "integration setup", rating: "negative", time: "5 hours ago" },
  { question: "SSO configuration", rating: "positive", time: "6 hours ago" },
  { question: "billing cycle", rating: "negative", time: "8 hours ago" },
];

export default function AdminPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between h-14 px-6 border-b bg-background">
        <h1 className="font-semibold">Admin Dashboard</h1>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Queries</p>
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-green-500 mt-1">+12% vs last month</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Latency</p>
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold">1.45s</p>
                <p className="text-xs text-green-500 mt-1">-8% vs last month</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Deflection Rate</p>
                  <ThumbsUp className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold">62%</p>
                <p className="text-xs text-green-500 mt-1">620 tickets deflected</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold">$12.47</p>
                <p className="text-xs text-muted-foreground mt-1">$0.01 per query</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Queries per day</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper chart="bar" data={dailyQueries} config={{ xKey: "day", yKey: "count" }} />
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Confidence trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartWrapper
                  chart="line"
                  data={confidenceTrend}
                  config={{ xKey: "date", yKey: "confidence", domain: [0.7, 1] }}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Recent user feedback</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {feedbackItems.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={item.rating === "positive" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {item.rating}
                      </Badge>
                      <span className="text-sm">{item.question}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  {i < feedbackItems.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
