
import React from "react";
import { Check, Clock, Heart, Briefcase, Dumbbell, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutfitContext } from "@/context/OutfitContext";

interface MoodOption {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const moodOptions: MoodOption[] = [
  {
    id: "work",
    label: "Client Meeting",
    icon: Briefcase,
    description: "Tailored power suits with accessory suggestions"
  },
  {
    id: "workout",
    label: "Morning Workout",
    icon: Dumbbell,
    description: "Moisture-wicking athleisure combos"
  },
  {
    id: "date",
    label: "Date Night",
    icon: Heart,
    description: "Color-coordinated ensembles with fabric texture previews"
  },
  {
    id: "casual",
    label: "Casual Day",
    icon: Coffee,
    description: "Comfortable yet stylish everyday looks"
  }
];

export function MoodSelector() {
  const { currentMood, setCurrentMood, generateOutfit } = useOutfitContext();

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
    generateOutfit(mood);
  };

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-display font-medium mb-6">How are you feeling today?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {moodOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = currentMood === option.id;
          
          return (
            <button
              key={option.id}
              className={cn(
                "p-6 rounded-xl transition-all duration-300 border-2 flex flex-col items-center text-center gap-4",
                isSelected
                  ? "border-outfit-blue bg-outfit-blue bg-opacity-10"
                  : "border-outfit-light-gray hover:border-outfit-gray"
              )}
              onClick={() => handleMoodChange(option.id)}
            >
              <div className={cn(
                "p-4 rounded-full",
                isSelected ? "bg-outfit-blue text-white" : "bg-outfit-light-gray text-outfit-black"
              )}>
                <Icon size={24} />
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <Check size={16} className="text-outfit-blue" />
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
