import { useState } from "react";
import { Search, MessageSquare, Phone, ChevronLeft, Users, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import LeadDetail from "@/components/LeadDetail";
import AddLeadDialog from "@/components/AddLeadDialog";
import { useLeads } from "@/hooks/useLeads";
import type { Lead, LeadStatus } from "@/data/sampleData";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const statusFilters: { label: string; value: LeadStatus | "all" }[] = [
  { label: "הכל", value: "all" },
  { label: "חדש", value: "new" },
  { label: "חם 🔥", value: "hot" },
  { label: "נסגר ✓", value: "closed" },
  { label: "אבוד", value: "lost" },
];

export default function Leads() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<LeadStatus | "all">("all");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const { leads, addLead, updateLead, deleteLead, addMessage } = useLeads();

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.service.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || lead.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  if (selectedLead) {
    return (
      <LeadDetail
        lead={selectedLead}
        onBack={() => setSelectedLeadId(null)}
        onUpdate={updateLead}
        onAddMessage={addMessage}
        onDelete={(id) => {
          deleteLead(id);
          setSelectedLeadId(null);
          toast({ title: "ליד נמחק", description: `${selectedLead.name} הוסר מהרשימה` });
        }}
      />
    );
  }

  return (
    <div className="space-y-5 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">לידים</h1>
          <p className="text-sm text-muted-foreground mt-0.5">ניהול ומעקב אחרי הלידים של המרפאה</p>
        </div>
        <AddLeadDialog onAdd={addLead} />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="חפש לידים..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10 rounded-xl" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                activeFilter === f.value
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filteredLeads.length} לידים נמצאו</p>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {filteredLeads.map((lead, i) => (
          <button
            key={lead.id}
            onClick={() => setSelectedLeadId(lead.id)}
            className="w-full rounded-2xl border border-border bg-card p-4 text-right shadow-card transition-all hover:shadow-card-hover active:scale-[0.99] animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.service}</p>
                </div>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {lead.messages.length} הודעות</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">₪{lead.value.toLocaleString()}</span>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-right text-xs text-muted-foreground bg-muted/30">
              <th className="px-5 py-3.5 font-semibold">שם</th>
              <th className="px-5 py-3.5 font-semibold">טלפון</th>
              <th className="px-5 py-3.5 font-semibold">שירות</th>
              <th className="px-5 py-3.5 font-semibold">סטטוס</th>
              <th className="px-5 py-3.5 font-semibold">מקור</th>
              <th className="px-5 py-3.5 font-semibold">תאריך יצירה</th>
              <th className="px-5 py-3.5 font-semibold">ערך</th>
              <th className="px-5 py-3.5 font-semibold">הודעות</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, i) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                className="border-b border-border last:border-0 hover:bg-muted/40 cursor-pointer transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {lead.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-foreground">{lead.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs" dir="ltr">{lead.phone}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{lead.service}</td>
                <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                <td className="px-5 py-3.5 text-muted-foreground">{lead.source}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{lead.createdAt}</td>
                <td className="px-5 py-3.5 font-bold text-foreground">₪{lead.value.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                    <MessageSquare className="h-3.5 w-3.5" /> {lead.messages.length}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-card">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 font-bold text-foreground">לא נמצאו לידים</p>
          <p className="mt-1 text-sm text-muted-foreground">נסה לשנות את החיפוש או הפילטרים</p>
        </div>
      )}
    </div>
  );
}
