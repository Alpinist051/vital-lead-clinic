import { Settings as SettingsIcon, User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your clinic CRM configuration</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: User, title: "Profile", desc: "Manage your account and clinic info" },
          { icon: Bell, title: "Notifications", desc: "Configure alert preferences" },
          { icon: Shield, title: "Roles & Access", desc: "User roles and permissions" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-semibold text-foreground">Demo Mode</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This is a demo version of ClinicCRM. All data shown is sample data. Connect your WhatsApp Business API and database to go live.
        </p>
      </div>
    </div>
  );
}
