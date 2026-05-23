"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, Trash2, CheckCircle, Loader2 } from "lucide-react";

const documents = [
  { id: "doc_1", name: "pricing-guide.pdf", status: "ready", chunks: 45, date: "May 20, 2026" },
  { id: "doc_2", name: "faq.md", status: "ready", chunks: 12, date: "May 21, 2026" },
  { id: "doc_3", name: "api-docs.html", status: "ready", chunks: 28, date: "May 21, 2026" },
  { id: "doc_4", name: "onboarding-guide.pdf", status: "processing", chunks: 0, date: "May 22, 2026" },
];

export default function DocumentsPage() {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between h-14 px-6 border-b bg-background">
        <h1 className="font-semibold">Documents</h1>
        <Button
          className="gap-2"
          onClick={() => {
            setUploading(true);
            setTimeout(() => setUploading(false), 2000);
          }}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload document
            </>
          )}
        </Button>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
          <Card className="rounded-xl border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium mb-1">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground mb-4">
                PDF, Markdown, HTML, DOCX — up to 50MB
              </p>
              <Button variant="outline">Select files</Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Knowledge base</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {documents.map((doc, i) => (
                <div key={doc.id}>
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {doc.status === "ready" ? (
                            <Badge variant="default" className="text-[10px] gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Ready
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px] gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Processing
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {doc.chunks} chunks · {doc.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  {i < documents.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
