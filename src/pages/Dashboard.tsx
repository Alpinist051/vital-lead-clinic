import { useState } from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Flame,
  CheckCircle,
  XCircle,
  ArrowUpRight,
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
  { name: "New", value: 12, color: "hsl(210, 80%, 55%)" },
  { name: "Hot", value: 12, color: "hsl(0, 72%, 55%)" },
  { name: "Closed", value: 28, color: "hsl(152, 60%, 42%)" },
  { name: "Lost", value: 8, color: "hsl(240, 15%, 75%)" },
];

const weeklyData = [
  { day: "Mon", leads: 5 },
  { day: "Tue", leads: 8 },
  { day: "Wed", leads: 3 },
  { day: "Thu", leads: 12 },
  { day: "Fri", leads: 7 },
  { day: "Sat", leads: 2 },
  { day: "Sun", leads: 6 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your clinic's lead performance</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Leads"
          value={sampleKPIs.totalLeads}
          icon={Users}
          variant="primary"
          trend={{ value: 12, positive: true }}
        />
        <KPICard
          title="Hot Leads"
          value={sampleKPIs.hotLeads}
          icon={Flame}
          variant="warning"
          trend={{ value: 8, positive: true }}
        />
        <KPICard
          title="Conversion Rate"
          value={`${sampleKPIs.conversionRate}%`}
          icon={TrendingUp}
          variant="success"
          trend={{ value: 5, positive: true }}
        />
        <KPICard
          title="Revenue"
          value={`₪${sampleKPIs.revenue.toLocaleString()}`}
          icon={DollarSign}
          variant="info"
          subtitle="This month"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Return Rate"
          value={`${sampleKPIs.returnRate}%`}
          icon={ArrowUpRight}
          subtitle="Returning clients"
        />
        <KPICard
          title="Closed Deals"
          value={sampleKPIs.closedDeals}
          icon={CheckCircle}
          subtitle="This month"
        />
        <KPICard
          title="Lost Leads"
          value={sampleKPIs.lostLeads}
          icon={XCircle}
          subtitle="This month"
        />
        <KPICard
          title="Avg Response"
          value={sampleKPIs.avgResponseTime}
          icon={Clock}
          subtitle="First reply time"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar chart */}
        <div className="col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Leads This Week</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 12%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(230, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(230, 10%, 45%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(240, 12%, 90%)",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="leads" fill="hsl(310, 80%, 55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Lead Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
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
          <div className="mt-2 grid grid-cols-2 gap-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-muted-foreground">{s.name}</span>
                <span className="ml-auto font-medium text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Leads</h3>
          <Link to="/leads" className="text-xs font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {sampleLeads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-foreground">{lead.name}</td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.service}</td>
                  <td className="px-6 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-6 py-3 text-muted-foreground">{lead.source}</td>
                  <td className="px-6 py-3 font-medium text-foreground">₪{lead.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
