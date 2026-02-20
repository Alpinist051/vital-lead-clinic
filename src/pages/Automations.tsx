import { Zap, Clock, MessageSquare, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import { sampleAutomationRules, type AutomationRule } from "@/data/sampleData";

export default function Automations() {
  const [rules, setRules] = useState(sampleAutomationRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Automations</h1>
        <p className="text-muted-foreground">
          Automated WhatsApp follow-up rules for your leads
        </p>
      </div>

      {/* Status banner */}
      <div className="rounded-xl gradient-hero border border-primary/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-card">
            <MessageSquare className="h-5 w-5 text-whatsapp" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">WhatsApp Integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect your WhatsApp Business API to activate automations. Currently in demo mode.
            </p>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={cn(
              "rounded-xl border bg-card p-5 shadow-card transition-all animate-fade-in",
              rule.active ? "border-primary/20" : "border-border opacity-70"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    rule.active ? "gradient-primary" : "bg-muted"
                  )}
                >
                  <Zap className={cn("h-4 w-4", rule.active ? "text-primary-foreground" : "text-muted-foreground")} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{rule.name}</h3>
                    <StatusBadge status={rule.targetStatus} />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" /> {rule.trigger}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rule.delayDays === 0 ? "Immediate" : `After ${rule.delayDays} days`}
                    </span>
                  </div>
                  <p className="mt-3 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    "{rule.message}"
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleRule(rule.id)}
                className="shrink-0 mt-1"
              >
                {rule.active ? (
                  <ToggleRight className="h-7 w-7 text-primary" />
                ) : (
                  <ToggleLeft className="h-7 w-7 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
