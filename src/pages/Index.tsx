
import React, { useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setupScrollAnimations } from "@/utils/scrollAnimation";

const Index = () => {
  // Initialize scroll animations when component mounts
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  return (
    <OutfitProvider>
      <div className="min-h-screen bg-outfit-white">
        <Navigation />
        
        {/* Fullwidth hero banner with animated fashion icon */}
        <div 
          className="w-full h-[70vh] bg-cover bg-center relative overflow-hidden scroll-parallax" 
          data-speed="0.1"
        >
          {/* Animated background with fashion models */}
          <div 
            className="absolute inset-0 bg-center bg-cover transition-transform duration-30000 animate-slow-pan" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=90")',
              animation: 'slow-zoom 30s infinite alternate'
            }}
          ></div>
          
          {/* Overlay with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto px-4 text-white scroll-fade">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
                Your AI Stylist, Tailored to Your Body
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                Get personalized outfit recommendations based on your body type, style preferences, and mood.
              </p>
              
              {/* Animated element */}
              <div className="animate-bounce inline-block bg-[#9b87f5] rounded-full p-3 shadow-lg">
                <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>
          
          {/* Animated particles for fashion-forward feel */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/30 animate-float"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <main className="container mx-auto px-4 py-12">
          {/* Main content tabs */}
          <Tabs defaultValue="stylist" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-8 scroll-fade">
              <TabsTrigger value="stylist">AI Stylist</TabsTrigger>
              <TabsTrigger value="mood">Your Mood</TabsTrigger>
              <TabsTrigger value="outfits">Style Ideas</TabsTrigger>
              <TabsTrigger value="closet">Closet</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stylist">
              <div className="scroll-fade mb-16">
                <BodyImageUploader />
              </div>
              <div className="scroll-fade" style={{ animationDelay: "0.2s" }}>
                <AIStats />
              </div>
            </TabsContent>
            
            <TabsContent value="mood">
              <div className="scroll-fade">
                <MoodSelector />
              </div>
            </TabsContent>
            
            <TabsContent value="outfits">
              <div className="scroll-fade">
                <OutfitRecommendations />
              </div>
            </TabsContent>
            
            <TabsContent value="closet">
              <div className="scroll-fade">
                <VirtualCloset />
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Extension Promo - below tabs */}
          <div className="scroll-slide mt-16" style={{ animationDelay: "0.4s" }}>
            <ExtensionPromo />
          </div>
        </main>
        
        <Footer />
        
        {/* Floating Action Button with Animation */}
        <button className="floating-action-btn animate-bounce bg-[#9b87f5] hover:bg-[#8B5CF6] fixed bottom-6 right-6 p-4 rounded-full shadow-lg text-white z-50">
          <Camera size={24} />
        </button>
      </div>
      
      {/* Add some global animation keyframes */}
      <style jsx global>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }
        
        @keyframes slow-pan {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-slow-pan {
          animation: slow-pan 30s ease-in-out infinite alternate;
        }
        
        .animate-float {
          animation: float 20s linear infinite;
        }
      `}</style>
    </OutfitProvider>
  );
};

export default Index;
