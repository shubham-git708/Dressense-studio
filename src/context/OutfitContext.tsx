
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Outfit {
  id: string;
  name: string;
  occasion: string;
  items: {
    top: string;
    bottom: string;
    shoes: string;
    accessories?: string[];
  };
  image: string;
}

interface OutfitContextType {
  outfits: Outfit[];
  currentMood: string;
  setCurrentMood: (mood: string) => void;
  virtualCloset: string[];
  addToVirtualCloset: (item: string) => void;
  generateOutfit: (occasion: string) => void;
  isGenerating: boolean;
}

const OutfitContext = createContext<OutfitContextType | undefined>(undefined);

// Sample outfit data with Unsplash images
const sampleOutfits: Outfit[] = [
  {
    id: "1",
    name: "Business Casual",
    occasion: "work",
    items: {
      top: "Light blue button-up shirt",
      bottom: "Navy chinos",
      shoes: "Brown leather loafers",
      accessories: ["Silver watch", "Leather belt"]
    },
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    name: "Evening Out",
    occasion: "date",
    items: {
      top: "Black fitted shirt",
      bottom: "Dark wash jeans",
      shoes: "Black Chelsea boots",
      accessories: ["Minimalist watch"]
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Weekend Casual",
    occasion: "casual",
    items: {
      top: "White t-shirt",
      bottom: "Light wash jeans",
      shoes: "White sneakers",
      accessories: ["Sunglasses"]
    },
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  }
];

export const OutfitProvider = ({ children }: { children: ReactNode }) => {
  const [outfits, setOutfits] = useState<Outfit[]>(sampleOutfits);
  const [currentMood, setCurrentMood] = useState<string>("casual");
  const [virtualCloset, setVirtualCloset] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const addToVirtualCloset = (item: string) => {
    setVirtualCloset((prev) => [...prev, item]);
  };

  const generateOutfit = (occasion: string) => {
    // In a real implementation, this would call an AI service
    setIsGenerating(true);
    
    // Simulate loading time
    setTimeout(() => {
      // Create a new outfit with a real image
      const newOutfit: Outfit = {
        id: `outfit-${Date.now()}`,
        name: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Look`,
        occasion,
        items: {
          top: "Generated top",
          bottom: "Generated bottom",
          shoes: "Generated shoes",
          accessories: ["Generated accessory"]
        },
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
      };
      
      setOutfits((prev) => [newOutfit, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <OutfitContext.Provider
      value={{
        outfits,
        currentMood,
        setCurrentMood,
        virtualCloset,
        addToVirtualCloset,
        generateOutfit,
        isGenerating
      }}
    >
      {children}
    </OutfitContext.Provider>
  );
};

export const useOutfitContext = () => {
  const context = useContext(OutfitContext);
  if (context === undefined) {
    throw new Error("useOutfitContext must be used within an OutfitProvider");
  }
  return context;
};
