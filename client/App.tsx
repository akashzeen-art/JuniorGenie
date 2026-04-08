import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { FairyTales } from "./pages/FairyTales";
import { Education } from "./pages/Education";
import { Games } from "./pages/Games";
import { Preloader } from "@/components/Preloader";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {/* Global background video */}
      <video
        id="bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://vz-2c7aef55-281.b-cdn.net/f407fbdf-ada7-4940-a9c6-55b9a6c93627/play_480p.mp4" type="video/mp4" />
      </video>
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fairy-tales" element={<FairyTales />} />
          <Route path="/education" element={<Education />} />
          <Route path="/games" element={<Games />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
