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
import ErrorBoundary from "@/components/ErrorBoundary";

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
          <Route path="/dashboard" element={<AppLayout>    <ErrorBoundary><Dashboard /></ErrorBoundary></AppLayout>} />
          <Route path="/leads" element={<AppLayout>    <ErrorBoundary><Leads /></ErrorBoundary></AppLayout>} />
          <Route path="/automations" element={<AppLayout>    <ErrorBoundary><Automations /></ErrorBoundary></AppLayout>} />
          <Route path="/analytics" element={<AppLayout>    <ErrorBoundary><Analytics /></ErrorBoundary></AppLayout>} />
          <Route path="/whatsapp" element={<AppLayout>    <ErrorBoundary><WhatsAppIntegration /></ErrorBoundary></AppLayout>} />
          <Route path="/team" element={<AppLayout>    <ErrorBoundary><TeamManagement /></ErrorBoundary></AppLayout>} />
          <Route path="/notifications" element={<AppLayout>    <ErrorBoundary><NotificationsCenter /></ErrorBoundary></AppLayout>} />
          <Route path="/settings" element={<AppLayout>    <ErrorBoundary><SettingsPage /></ErrorBoundary></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;