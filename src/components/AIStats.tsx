
import React from "react";
import { Star, Zap, ThumbsUp, Cpu } from "lucide-react";

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
    <div className="w-full my-12 bg-outfit-light-gray rounded-xl p-8">
      <h2 className="text-2xl font-display font-medium mb-8 text-center">Your AI Stylist Stats</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-outfit-blue bg-opacity-10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-outfit-blue" />
              </div>
              
              <h3 className="text-xl font-semibold mb-1">{stat.value}</h3>
              <p className="text-outfit-black font-medium">{stat.label}</p>
              <p className="text-outfit-gray text-sm mt-2">{stat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
