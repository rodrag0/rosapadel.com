import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/rosa/LanguageProvider";
import { ThemeProvider } from "@/components/rosa/ThemeProvider";
import Index from "./pages/Index.tsx";
import ImprintPage from "./pages/ImprintPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import CookiePolicyPage from "./pages/CookiePolicyPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Product from "./pages/Product.tsx";
import Subscriptions from "./pages/Subscriptions.tsx";
import ForClubs from "./pages/ForClubs.tsx";
import Investors from "./pages/Investors.tsx";
import MatchSessionMatchi from "./pages/MatchSessionMatchi.tsx";
import Events from "./pages/Events.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/imprint" element={<ImprintPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/products/core-led" element={<Navigate to="/products/portable" replace />} />
              <Route path="/products/core-hd" element={<Navigate to="/products/vision" replace />} />
              <Route path="/products/coach" element={<Navigate to="/subscriptions#player" replace />} />
              <Route path="/products/portable" element={<Product productId="portable" />} />
              <Route path="/products/vision" element={<Product productId="vision" />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/for-clubs" element={<ForClubs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/match-session/matchi-live-score" element={<MatchSessionMatchi />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
