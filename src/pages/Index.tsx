
import React from "react";
import { OutfitProvider } from "@/context/OutfitContext";
import { Navigation } from "@/components/Navigation";
import { MoodSelector } from "@/components/MoodSelector";
import { OutfitRecommendations } from "@/components/OutfitRecommendations";
import { BodyImageUploader } from "@/components/BodyImageUploader";
import { ExtensionPromo } from "@/components/ExtensionPromo";
import { VirtualCloset } from "@/components/VirtualCloset";
import { AIStats } from "@/components/AIStats";
import { Footer } from "@/components/Footer";
import { Camera } from "lucide-react";

const Index = () => {
  return (
    <OutfitProvider>
      <div className="min-h-screen bg-outfit-white">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section with Animation */}
          <div className="text-center max-w-3xl mx-auto my-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Your AI Stylist, Tailored to Your Body
            </h1>
            <p className="text-xl text-outfit-gray">
              Get personalized outfit recommendations based on your body type, style preferences, and mood.
            </p>
          </div>
          
          {/* Body Image Upload */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <BodyImageUploader />
          </div>
          
          {/* Mood Selector */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <MoodSelector />
          </div>
          
          {/* Outfit Recommendations */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <OutfitRecommendations />
          </div>
          
          {/* AI Stats with Tabs */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <AIStats />
          </div>
          
          {/* Extension Promo */}
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <ExtensionPromo />
          </div>
          
          {/* Virtual Closet */}
          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <VirtualCloset />
          </div>
        </main>
        
        <Footer />
        
        {/* Floating Action Button with Animation */}
        <button className="floating-action-btn animate-bounce">
          <Camera size={24} />
        </button>
      </div>
    </OutfitProvider>
  );
};

export default Index;
