import { ArrowLeft, Phone, Mail, MessageSquare, Calendar, Clock, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import type { Lead } from "@/data/sampleData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
}

export default function LeadDetail({ lead, onBack }: LeadDetailProps) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">{lead.name}</h1>
            <StatusBadge status={lead.status} />
          </div>
          <p className="text-sm text-muted-foreground">{lead.service}</p>
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground gap-2 hidden sm:flex">
          <Phone className="h-4 w-4" />
          Call
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lead info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{lead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{lead.source}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value</span>
                <span className="font-semibold text-foreground">₪{lead.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="text-foreground">{lead.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Contact</span>
                <span className="text-foreground">{lead.lastContact}</span>
              </div>
              {lead.nextFollowUp && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Follow-up</span>
                  <span className="font-medium text-primary">{lead.nextFollowUp}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Notes</h3>
            <p className="text-sm text-muted-foreground">{lead.notes}</p>
          </div>
        </div>

        {/* Message history */}
        <div className="lg:col-span-2 flex flex-col rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="border-b border-border px-5 py-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-whatsapp" />
            <h3 className="text-sm font-semibold text-foreground">Message History</h3>
            <span className="ml-auto text-xs text-muted-foreground">{lead.messages.length} messages</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-5 max-h-[500px] bg-muted/30">
            {lead.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "clinic" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.sender === "clinic"
                      ? "bg-whatsapp text-whatsapp-foreground rounded-br-sm"
                      : "bg-card border border-border text-foreground rounded-bl-sm"
                  )}
                >
                  <p>{msg.text}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      msg.sender === "clinic" ? "text-whatsapp-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {msg.timestamp} · {msg.channel}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4 flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button size="icon" className="gradient-primary border-0 text-primary-foreground shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
