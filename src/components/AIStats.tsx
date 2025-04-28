
import React from "react";
import { Star, Zap, ThumbsUp, Cpu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AIStats() {
  const stats = [
    {
      icon: Cpu,
      label: "AI Model",
      value: "Personal",
      description: "Trained on your body type"
    },
    {
      icon: ThumbsUp,
      label: "Accuracy",
      value: "95%",
      description: "Style match precision"
    },
    {
      icon: Star,
      label: "Outfits",
      value: "124",
      description: "Generated for you"
    },
    {
      icon: Zap,
      label: "Try-ons",
      value: "37",
      description: "Virtual fittings this month"
    }
  ];

  return (
    <div className="w-full my-12">
      <h2 className="text-2xl font-display font-medium mb-6 text-center">Your AI Stylist Stats</h2>
      
      <Tabs defaultValue="model" className="w-full">
        <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-6">
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          <TabsTrigger value="outfits">Outfits</TabsTrigger>
          <TabsTrigger value="tryons">Try-ons</TabsTrigger>
        </TabsList>
        
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const tabValue = ["model", "accuracy", "outfits", "tryons"][index];
          
          return (
            <TabsContent 
              key={index} 
              value={tabValue} 
              className="animate-fade-in"
            >
              <div className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-all max-w-xl mx-auto">
                <div className="bg-outfit-blue bg-opacity-10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-outfit-blue" />
                </div>
                
                <h3 className="text-3xl font-semibold mb-2">{stat.value}</h3>
                <p className="text-lg text-outfit-black font-medium mb-2">{stat.label}</p>
                <p className="text-outfit-gray">{stat.description}</p>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
