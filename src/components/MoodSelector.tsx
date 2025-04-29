
import React, { useState } from "react";
import { Check, Clock, Heart, Briefcase, Dumbbell, Coffee, Sparkles, Music, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutfitContext } from "@/context/OutfitContext";
import { toast } from "sonner";

interface MoodOption {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  {
    id: "work",
    label: "Client Meeting",
    icon: Briefcase,
    description: "Tailored power suits with accessory suggestions",
    color: "bg-amber-100 text-amber-700"
  },
  {
    id: "workout",
    label: "Morning Workout",
    icon: Dumbbell,
    description: "Moisture-wicking athleisure combos",
    color: "bg-green-100 text-green-700"
  },
  {
    id: "date",
    label: "Date Night",
    icon: Heart,
    description: "Color-coordinated ensembles with fabric texture previews",
    color: "bg-red-100 text-red-700"
  },
  {
    id: "casual",
    label: "Casual Day",
    icon: Coffee,
    description: "Comfortable yet stylish everyday looks",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "party",
    label: "Night Out",
    icon: Music,
    description: "Statement pieces that stand out in the crowd",
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "vacation",
    label: "Vacation Mode",
    icon: Sun,
    description: "Relaxed fits for your getaway adventures",
    color: "bg-orange-100 text-orange-700"
  },
  {
    id: "special",
    label: "Special Occasion",
    icon: Sparkles,
    description: "Elevated outfits for memorable moments",
    color: "bg-pink-100 text-pink-700"
  }
];

export function MoodSelector() {
  const { currentMood, setCurrentMood, generateOutfit } = useOutfitContext();
  const [selectedTime, setSelectedTime] = useState("now");

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
    generateOutfit(mood);
    toast.success(`Generating outfit recommendations for ${mood} mood`);
  };

  return (
    <div className="w-full my-8">
      <h2 className="text-3xl font-display font-medium mb-2">How are you feeling today?</h2>
      <p className="text-outfit-gray mb-6">Select your current mood to get personalized outfit recommendations</p>
      
      <div className="mb-6 flex items-center justify-start">
        <button 
          className={cn(
            "px-4 py-2 rounded-l-lg border",
            selectedTime === "now" 
              ? "bg-outfit-blue text-white border-outfit-blue" 
              : "border-outfit-light-gray text-outfit-gray"
          )}
          onClick={() => setSelectedTime("now")}
        >
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            Current Weather
          </div>
        </button>
        <button 
          className={cn(
            "px-4 py-2 rounded-r-lg border",
            selectedTime === "later" 
              ? "bg-outfit-blue text-white border-outfit-blue" 
              : "border-outfit-light-gray text-outfit-gray"
          )}
          onClick={() => setSelectedTime("later")}
        >
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            Plan for Later
          </div>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 scroll-fade">
        {moodOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = currentMood === option.id;
          
          return (
            <button
              key={option.id}
              className={cn(
                "p-6 rounded-xl transition-all duration-300 border-2 flex flex-col items-center text-center gap-4 hover:shadow-md",
                isSelected
                  ? "border-outfit-blue bg-outfit-blue bg-opacity-10 shadow-md"
                  : "border-outfit-light-gray hover:border-outfit-gray"
              )}
              onClick={() => handleMoodChange(option.id)}
            >
              <div className={cn(
                "p-4 rounded-full relative",
                isSelected ? "bg-outfit-blue text-white" : option.color
              )}>
                <Icon size={24} />
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
                    <Check size={14} className="text-outfit-blue" />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-display font-medium text-lg">{option.label}</h3>
                <p className="text-outfit-gray text-sm mt-2">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
