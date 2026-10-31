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
import ProductPortable from "./pages/ProductPortable.tsx";
import ProductVision from "./pages/ProductVision.tsx";
import ProductCoach from "./pages/ProductCoach.tsx";
import ForClubs from "./pages/ForClubs.tsx";
import Investors from "./pages/Investors.tsx";
import MatchSessionMatchi from "./pages/MatchSessionMatchi.tsx";
import NewTab from "./pages/NewTab.tsx";
import Learn from "./pages/Learn";
import ComparisonGuide from "./pages/ComparisonGuide";
import { comparisonGuides } from "@/lib/comparisonGuides";
import { tournamentManagementHref } from "@/lib/siteLinks";
import SectionNavigation from "@/components/rosa/SectionNavigation";
import PageMetadata from "@/components/rosa/PageMetadata";
import { useEffect, type ReactNode } from "react";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export const SiteRoutes = () => (
  <>
            <SectionNavigation />
            <PageMetadata />
            <Routes>
              <Route path="/learn" element={<Learn />} />
              {comparisonGuides.map(guide => <Route key={guide.path} path={guide.path} element={<ComparisonGuide guide={guide} />} />)}
              <Route path="/" element={<Index />} />
              <Route path="/imprint" element={<ImprintPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/products/portable" element={<ProductPortable />} />
              <Route path="/products/vision" element={<ProductVision />} />
              <Route path="/products/core-led" element={<Navigate to="/products/portable" replace />} />
              <Route path="/products/core-hd" element={<Navigate to="/products/vision" replace />} />
              <Route path="/products/coach" element={<ProductCoach />} />
              <Route path="/for-clubs" element={<ForClubs />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/match-session/matchi-live-score" element={<MatchSessionMatchi />} />
              <Route path={tournamentManagementHref} element={<NewTab />} />
              <Route path="/new-tab" element={<Navigate to={tournamentManagementHref} replace />} />
              <Route path="/tournamen-managment" element={<Navigate to={tournamentManagementHref} replace />} />
              <Route path="/tournament-managment" element={<Navigate to={tournamentManagementHref} replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
  </>
);

const App = () => {
  useEffect(() => {
    const frame = requestAnimationFrame(() => document.getElementById("root")?.removeAttribute("data-prerendered"));
    return () => cancelAnimationFrame(frame);
  }, []);
  return <AppProviders><BrowserRouter><SiteRoutes /></BrowserRouter></AppProviders>;
};

export default App;
