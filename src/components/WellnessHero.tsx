import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.jpg";
import React, { useState } from "react";

type WellnessHeroProps = {
  onStart: () => void;   // 👈 tells TS this must be 
};

const WellnessHero: React.FC<WellnessHeroProps> = ({ onStart }) =>  {
  // const [view, setView] = useState<"home" | "check" | "result">("home");
  return (
    <div className="min-h-screen bg-gradient-calm relative overflow-hidden">
      {/* Breathing animation background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-wellness-lavender/30 animate-breathe"></div>
      <div className="absolute top-40 right-16 w-16 h-16 rounded-full bg-wellness-peach/40 animate-breathe" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-primary-soft/50 animate-breathe" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center min-h-screen relative z-10">
        {/* Illustration - left */}
        <div className="flex-1 flex justify-center items-center mb-10 md:mb-0 md:mr-10 animate-float">
          <img
            src={heroIllustration}
            alt="Calming abstract illustration representing mental wellness"
            className="w-full max-w-xl h-auto rounded-3xl shadow-soft"
          />
        </div>

        {/* Hero Content - right */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Check in with yourself today{" "}
            <span className="inline-block animate-breathe">💙</span>
          </h1>

          {/* Subheading with icons */}
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-xl leading-relaxed font-[400] md:font-[500] font-sans md:font-[Quicksand,ui-rounded,sans-serif]">
            <span className="mr-2">🌱</span>
            Answer a few quick questions. Get gentle, AI-powered support for your wellness.
            <span className="ml-2">💬</span>
          </p>

          {/* CTA Button */}
          <div className="pt-2 w-full flex flex-col items-center md:items-start">
            {/* <Button 
              variant="wellness" 
              size="lg" 
              className="text-lg px-12 py-6 rounded-full shadow-soft bg-gradient-to-r from-wellness-blue to-wellness-green hover:from-wellness-green hover:to-wellness-blue transition-all duration-300 hover:shadow-gentle hover:scale-105"
            >
              Start My Wellness Check
            </Button> */}
            <Button
              size="lg"
              className="text-lg px-12 py-6 rounded-full shadow-soft bg-gradient-to-r from-wellness-blue to-wellness-green hover:from-wellness-green hover:to-wellness-blue transition-all duration-300 hover:shadow-gentle hover:scale-105"
              onClick={onStart} // 👈 trigger parent action
            >
              Start My Wellness Check
            </Button>
            {/* Reassurance line */}
            <span className="mt-3 text-base text-muted-foreground flex items-center gap-2">
              <span className="text-lg">✨</span>
              Takes less than 2 minutes
            </span>
          </div>
        </div>
      </div>

      {/* Subtle floating icons */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-8 text-2xl opacity-60 pointer-events-none">
        <span className="animate-breathe" style={{ animationDelay: "0.5s" }}>🌱</span>
        <span className="animate-breathe" style={{ animationDelay: "1.5s" }}>💬</span>
        <span className="animate-breathe" style={{ animationDelay: "2.5s" }}>🌞</span>
      </div>

      {/* Sticky ethical footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/70 dark:bg-background/80 text-center text-xs py-2 border-t border-border z-50 backdrop-blur">
        For urgent help, call a professional helpline. You matter. 💛
      </footer>
    </div>
  );
};

export default WellnessHero;