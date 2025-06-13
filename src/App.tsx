
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./components/Dashboard";
import CreateProposal from "./pages/CreateProposal";
import EditProposal from "./pages/EditProposal";
import ViewProposal from "./pages/ViewProposal";
import ProposalView from "./pages/ProposalView";
import CompanySettings from "./pages/CompanySettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <CreateProposal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditProposal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/view/:id" 
              element={
                <ProtectedRoute>
                  <ViewProposal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/configuracoes" 
              element={
                <ProtectedRoute>
                  <CompanySettings />
                </ProtectedRoute>
              } 
            />
            <Route path="/proposal/:id" element={<ProposalView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
