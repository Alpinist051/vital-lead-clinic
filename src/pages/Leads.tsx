import { useState } from "react";
import { Search, Filter, Plus, MessageSquare, Phone, Mail, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import LeadDetail from "@/components/LeadDetail";
import { sampleLeads, type Lead, type LeadStatus } from "@/data/sampleData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusFilters: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Hot", value: "hot" },
  { label: "Closed", value: "closed" },
  { label: "Lost", value: "lost" },
];

export default function Leads() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = sampleLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.service.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "all" || lead.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (selectedLead) {
    return <LeadDetail lead={selectedLead} onBack={() => setSelectedLead(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">Manage and track your clinic leads</p>
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                activeFilter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lead cards (mobile) / Table (desktop) */}
      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {filteredLeads.map((lead) => (
          <button
            key={lead.id}
            onClick={() => setSelectedLead(lead)}
            className="w-full rounded-xl border border-border bg-card p-4 text-left shadow-card transition-all hover:shadow-card-hover animate-fade-in"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.service}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {lead.phone}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> {lead.messages.length} msgs
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">₪{lead.value.toLocaleString()}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Phone</th>
              <th className="px-6 py-3 font-medium">Service</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Last Contact</th>
              <th className="px-6 py-3 font-medium">Value</th>
              <th className="px-6 py-3 font-medium">Messages</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors animate-fade-in"
              >
                <td className="px-6 py-3.5 font-medium text-foreground">{lead.name}</td>
                <td className="px-6 py-3.5 text-muted-foreground">{lead.phone}</td>
                <td className="px-6 py-3.5 text-muted-foreground">{lead.service}</td>
                <td className="px-6 py-3.5"><StatusBadge status={lead.status} /></td>
                <td className="px-6 py-3.5 text-muted-foreground">{lead.source}</td>
                <td className="px-6 py-3.5 text-muted-foreground">{lead.lastContact}</td>
                <td className="px-6 py-3.5 font-medium text-foreground">₪{lead.value.toLocaleString()}</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-3.5 w-3.5" /> {lead.messages.length}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLeads.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
          <Users className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium text-foreground">No leads found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
