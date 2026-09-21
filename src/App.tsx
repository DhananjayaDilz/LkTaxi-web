import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ContactTracking from "./components/ContactTracking";
import PageSEO from "./components/PageSEO";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LocationPage from "./pages/LocationPage.tsx";
import RoutePage from "./pages/RoutePage.tsx";
import Blogs from "./pages/Blogs.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import TaxiPageRouter from "./pages/TaxiPageRouter.tsx";

const queryClient = new QueryClient();

export const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <>
        <PageSEO />
        <ContactTracking />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/taxi/:slug" element={<TaxiPageRouter />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => <BrowserRouter><AppContent /></BrowserRouter>;
export default App;
