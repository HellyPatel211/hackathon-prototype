import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WellnessCheck from "./pages/WellnessCheck";
import Result from "./pages/Result";
import React, { useState } from "react";
import type { AnalysisResult } from "./lib/analyzer";

export default function App() {
  const queryClient = new QueryClient();
  const [res, setRes] = useState<AnalysisResult | null>(null);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            <Route
              path="/check"
              element={
                <WellnessCheck
                  onCancel={() => window.history.back()}
                  onComplete={(r) => setRes(r)}
                />
              }
            />

            <Route
              path="/result"
              element={
                res ? (
                  <Result
                    result={res}
                    onRestart={() => {
                      setRes(null);
                      return <Navigate to="/check" replace />; // ✅ correct redirect
                    }}
                  />
                ) : (
                  <Navigate to="/" replace /> // if no result, go home
                )
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
