import {
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Flame,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";
import KPICard from "@/components/KPICard";
import StatusBadge from "@/components/StatusBadge";
import { sampleKPIs, sampleLeads } from "@/data/sampleData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const statusData = [
  { name: "חדש", value: 12, color: "hsl(210, 80%, 55%)" },
  { name: "חם", value: 12, color: "hsl(0, 72%, 55%)" },
  { name: "נסגר", value: 28, color: "hsl(152, 60%, 42%)" },
  { name: "אבוד", value: 8, color: "hsl(240, 15%, 75%)" },
];

const weeklyData = [
  { day: "ראשון", leads: 6 },
  { day: "שני", leads: 8 },
  { day: "שלישי", leads: 3 },
  { day: "רביעי", leads: 12 },
  { day: "חמישי", leads: 7 },
  { day: "שישי", leads: 2 },
  { day: "שבת", leads: 5 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">לוח בקרה</h1>
          <p className="text-sm text-muted-foreground mt-0.5">סקירה כללית של ביצועי הלידים במרפאה</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
          <CalendarDays className="h-4 w-4" />
          <span>פברואר 2025</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <KPICard
          title="סה״כ לידים"
          value={sampleKPIs.totalLeads}
          icon={Users}
          variant="primary"
          trend={{ value: 12, positive: true }}
        />
        <KPICard
          title="לידים חמים"
          value={sampleKPIs.hotLeads}
          icon={Flame}
          variant="warning"
          trend={{ value: 8, positive: true }}
        />
        <KPICard
          title="אחוז המרה"
          value={`${sampleKPIs.conversionRate}%`}
          icon={TrendingUp}
          variant="success"
          trend={{ value: 5, positive: true }}
        />
        <KPICard
          title="הכנסות"
          value={`₪${sampleKPIs.revenue.toLocaleString()}`}
          icon={DollarSign}
          variant="info"
          subtitle="החודש"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <KPICard
          title="שיעור חזרה"
          value={`${sampleKPIs.returnRate}%`}
          icon={ArrowUpRight}
          subtitle="לקוחות חוזרים"
        />
        <KPICard
          title="עסקאות שנסגרו"
          value={sampleKPIs.closedDeals}
          icon={CheckCircle}
          subtitle="החודש"
        />
        <KPICard
          title="לידים אבודים"
          value={sampleKPIs.lostLeads}
          icon={XCircle}
          subtitle="החודש"
        />
        <KPICard
          title="זמן תגובה ממוצע"
          value={sampleKPIs.avgResponseTime}
          icon={Clock}
          subtitle="תגובה ראשונה"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 lg:p-6 shadow-card">
          <h3 className="mb-4 text-sm font-bold text-foreground">לידים השבוע</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 12%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(230, 10%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(230, 10%, 45%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(240, 12%, 90%)",
                  borderRadius: "10px",
                  fontSize: 12,
                  direction: "rtl",
                }}
              />
              <Bar dataKey="leads" name="לידים" fill="hsl(310, 80%, 55%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="rounded-2xl border border-border bg-card p-5 lg:p-6 shadow-card">
          <h3 className="mb-4 text-sm font-bold text-foreground">התפלגות סטטוס</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                dataKey="value"
                strokeWidth={0}
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-muted-foreground flex-1">{s.name}</span>
                <span className="font-bold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 lg:px-6">
          <h3 className="text-sm font-bold text-foreground">לידים אחרונים</h3>
          <Link to="/leads" className="text-xs font-semibold text-primary hover:underline">
            צפה בהכל ←
          </Link>
        </div>
        {/* Mobile cards */}
        <div className="divide-y divide-border lg:hidden">
          {sampleLeads.slice(0, 4).map((lead) => (
            <Link to="/leads" key={lead.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                  <p className="text-[11px] text-muted-foreground">{lead.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={lead.status} />
                <span className="text-sm font-bold text-foreground hidden sm:block">₪{lead.value.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-right text-xs text-muted-foreground">
                <th className="px-6 py-3 font-medium">שם</th>
                <th className="px-6 py-3 font-medium">שירות</th>
                <th className="px-6 py-3 font-medium">סטטוס</th>
                <th className="px-6 py-3 font-medium">מקור</th>
                <th className="px-6 py-3 font-medium">ערך</th>
              </tr>
            </thead>
            <tbody>
              {sampleLeads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">{lead.service}</td>
                  <td className="px-6 py-3.5"><StatusBadge status={lead.status} /></td>
                  <td className="px-6 py-3.5 text-muted-foreground">{lead.source}</td>
                  <td className="px-6 py-3.5 font-bold text-foreground">₪{lead.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
