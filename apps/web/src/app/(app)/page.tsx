"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, ExternalLink, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMockResponse } from "@/lib/mock-rag";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { document: string; text: string; relevance: number }[];
  confidence?: number;
  timestamp: Date;
}

const demoMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI support agent. I'm grounded in your company's documentation and knowledge base. Ask me anything about your products, pricing, policies, or how-to guides. Every answer I give will include inline citations to your source documents.",
    timestamp: new Date(Date.now() - 120000),
  },
];

const quickPrompts = [
  "What are your pricing plans?",
  "How do I cancel my subscription?",
  "What integrations are available?",
  "How to configure SSO?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const delay = 800 + Math.random() * 1200;

    setTimeout(() => {
      const ragResponse = getMockResponse(text);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: ragResponse.answer,
        sources: ragResponse.sources,
        confidence: ragResponse.confidence,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between h-14 px-6 border-b bg-background">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">RAG Support Agent</h1>
            <p className="text-xs text-muted-foreground">Grounded in your knowledge base</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            GPT-4o
          </Badge>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-secondary"}>
                  {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={cn("space-y-2 max-w-[80%]", msg.role === "user" && "items-end")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-card border shadow-sm"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="space-y-1 ml-1">
                    <p className="text-xs font-medium text-muted-foreground">Sources</p>
                    {msg.sources.map((source, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2"
                      >
                        <ExternalLink className="h-3 w-3 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-foreground/80">{source.document}</p>
                          <p className="mt-0.5">{source.text}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] ml-auto shrink-0">
                          {(source.relevance * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {msg.confidence && (
                  <div className="flex items-center gap-3 ml-1">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" />
                      <ThumbsDown className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" />
                    </div>
                    <Badge
                      variant={msg.confidence > 0.8 ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      Confidence {(msg.confidence * 100).toFixed(0)}%
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card border rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="animate-pulse">Thinking</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                  <span className="animate-bounce delay-300">.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.length <= 1 && (
            <div className="flex items-center gap-2 flex-wrap">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-full"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question about your products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              className="rounded-xl"
            />
            <Button onClick={() => sendMessage(input)} disabled={isLoading} className="rounded-xl gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
