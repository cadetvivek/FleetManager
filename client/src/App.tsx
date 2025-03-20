import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Maintenance from "./pages/Maintenance";

import Reports from "./pages/Reports";
import RouteManagement from "./pages/RouteManagement";
import FuelManagement from "./pages/FuelManagement";
import Trips from "./pages/Trips";
import Geofencing from "./pages/Geofencing";
import Emergency from "./pages/Emergency";

import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/maintenance" element={<Maintenance />} />

          <Route path="/reports" element={<Reports />} />
          <Route path="/routes" element={<RouteManagement />} />
          <Route path="/fuel" element={<FuelManagement />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/geofencing" element={<Geofencing />} />
          <Route path="/emergency" element={<Emergency />} />

          <Route path="/users" element={<Users />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
