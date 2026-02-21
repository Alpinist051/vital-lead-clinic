// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import Leads from "@/pages/Leads";
import Automations from "@/pages/Automations";
import SettingsPage from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import WhatsAppIntegration from "@/pages/WhatsAppIntegration";
import TeamManagement from "@/pages/TeamManagement";
import NotificationsCenter from "@/pages/NotificationsCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});


const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/leads" element={<AppLayout><Leads /></AppLayout>} />
          <Route path="/automations" element={<AppLayout><Automations /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
          <Route path="/whatsapp" element={<AppLayout><WhatsAppIntegration /></AppLayout>} />
          <Route path="/team" element={<AppLayout><TeamManagement /></AppLayout>} />
          <Route path="/notifications" element={<AppLayout><NotificationsCenter /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;