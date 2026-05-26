import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ProductCoreLED from "./pages/ProductCoreLED.tsx";
import ProductCoreHD from "./pages/ProductCoreHD.tsx";
import ProductVision from "./pages/ProductVision.tsx";
import ProductCoach from "./pages/ProductCoach.tsx";
import ForClubs from "./pages/ForClubs.tsx";
import Investors from "./pages/Investors.tsx";

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
              <Route path="/products/core-led" element={<ProductCoreLED />} />
              <Route path="/products/core-hd" element={<ProductCoreHD />} />
              <Route path="/products/vision" element={<ProductVision />} />
              <Route path="/products/coach" element={<ProductCoach />} />
              <Route path="/for-clubs" element={<ForClubs />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
