import { Zap, Clock, MessageSquare, ToggleLeft, ToggleRight, Plus, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import { sampleAutomationRules } from "@/data/sampleData";
import { Button } from "@/components/ui/button";

export default function Automations() {
  const [rules, setRules] = useState(sampleAutomationRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const activeCount = rules.filter((r) => r.active).length;

  return (
    <div className="space-y-5 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">אוטומציות</h1>
          <p className="text-sm text-muted-foreground mt-0.5">חוקי מעקב אוטומטיים בוואטסאפ ללידים שלך</p>
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground gap-2 rounded-xl shadow-lg hover:opacity-90">
          <Plus className="h-4 w-4" />
          הוסף חוק
        </Button>
      </div>

      {/* Status banner */}
      <div className="rounded-2xl gradient-hero border border-primary/10 p-5 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-card shrink-0">
              <MessageSquare className="h-6 w-6 text-whatsapp" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">חיבור וואטסאפ</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                חבר את ה-WhatsApp Business API כדי להפעיל אוטומציות. כרגע במצב הדגמה.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-card border border-border px-4 py-2 text-center shadow-sm">
              <p className="text-lg font-extrabold text-primary">{activeCount}</p>
              <p className="text-[10px] text-muted-foreground">פעילים</p>
            </div>
            <div className="rounded-xl bg-card border border-border px-4 py-2 text-center shadow-sm">
              <p className="text-lg font-extrabold text-foreground">{rules.length}</p>
              <p className="text-[10px] text-muted-foreground">סה״כ חוקים</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-3">
        {rules.map((rule, i) => (
          <div
            key={rule.id}
            className={cn(
              "rounded-2xl border bg-card p-4 lg:p-5 shadow-card transition-all animate-fade-in hover:shadow-card-hover",
              rule.active ? "border-primary/20" : "border-border opacity-60"
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
                <div
                  className={cn(
                    "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    rule.active ? "gradient-primary shadow-sm" : "bg-muted"
                  )}
                >
                  <Zap className={cn("h-4 w-4", rule.active ? "text-primary-foreground" : "text-muted-foreground")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-foreground">{rule.name}</h3>
                    <StatusBadge status={rule.targetStatus} />
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 bg-muted rounded-full px-2 py-0.5">
                      <Zap className="h-3 w-3" /> {rule.trigger}
                    </span>
                    <span className="flex items-center gap-1 bg-muted rounded-full px-2 py-0.5">
                      <Clock className="h-3 w-3" />
                      {rule.delayDays === 0 ? "מיידי" : `אחרי ${rule.delayDays} ימים`}
                    </span>
                  </div>
                  <div className="mt-3 rounded-xl bg-muted/60 border border-border/50 p-3 text-sm text-muted-foreground leading-relaxed">
                    "{rule.message}"
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleRule(rule.id)}
                className="shrink-0 mt-1 hover:scale-110 transition-transform"
                title={rule.active ? "כבה" : "הפעל"}
              >
                {rule.active ? (
                  <ToggleRight className="h-8 w-8 text-primary" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 rounded-2xl border border-info/20 bg-info/5 p-4 text-sm">
        <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">טיפ</p>
          <p className="text-muted-foreground mt-0.5">
            אוטומציות פעילות ישלחו הודעות מעקב אוטומטיות ללידים על פי הכללים שהגדרת. ודא שחשבון הוואטסאפ העסקי שלך מחובר לפני ההפעלה.
          </p>
        </div>
      </div>
    </div>
  );
}
