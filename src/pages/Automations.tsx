import { Zap, Clock, MessageSquare, ToggleLeft, ToggleRight, Trash2, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import AutomationRuleDialog from "@/components/AutomationRuleDialog";
import { sampleAutomationRules, type AutomationRule } from "@/data/sampleData";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

export default function Automations() {
  const [rules, setRules] = useState<AutomationRule[]>(sampleAutomationRules);

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const saveRule = (rule: AutomationRule) => {
    setRules((prev) => {
      const exists = prev.find((r) => r.id === rule.id);
      if (exists) return prev.map((r) => (r.id === rule.id ? rule : r));
      return [...prev, rule];
    });
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "חוק נמחק", description: "החוק הוסר בהצלחה" });
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
        <AutomationRuleDialog onSave={saveRule} />
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
                <div className={cn(
                  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  rule.active ? "gradient-primary shadow-sm" : "bg-muted"
                )}>
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
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className="hover:scale-110 transition-transform"
                  title={rule.active ? "כבה" : "הפעל"}
                >
                  {rule.active ? (
                    <ToggleRight className="h-8 w-8 text-primary" />
                  ) : (
                    <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                  )}
                </button>
                <div className="flex gap-1">
                  <AutomationRuleDialog rule={rule} onSave={saveRule} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-xl text-destructive hover:text-destructive h-8 w-8 p-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent dir="rtl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>מחיקת חוק</AlertDialogTitle>
                        <AlertDialogDescription>האם אתה בטוח שברצונך למחוק את "{rule.name}"?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-row-reverse gap-2">
                        <AlertDialogCancel className="rounded-xl">ביטול</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteRule(rule.id)} className="bg-destructive text-destructive-foreground rounded-xl">מחק</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rules.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-card">
          <Zap className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 font-bold text-foreground">אין חוקים</p>
          <p className="mt-1 text-sm text-muted-foreground">צור חוק אוטומציה ראשון</p>
        </div>
      )}

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
