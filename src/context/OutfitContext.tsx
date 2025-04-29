
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

interface ClosetItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface OutfitContextType {
  outfits: Outfit[];
  currentMood: string;
  setCurrentMood: (mood: string) => void;
  virtualCloset: ClosetItem[];
  addItemToCloset: (item: ClosetItem) => void;
  getClosetItemsByCategory: (category: string) => ClosetItem[];
  generateOutfit: (occasion: string) => void;
  isGenerating: boolean;
}

const OutfitContext = createContext<OutfitContextType | undefined>(undefined);

// Outfit data with high-quality Unsplash images
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
    image: "https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
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
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
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
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    name: "Workout Ready",
    occasion: "casual",
    items: {
      top: "Performance athletic tee",
      bottom: "Running shorts",
      shoes: "Training sneakers",
      accessories: ["Fitness tracker"]
    },
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    name: "Office Formal",
    occasion: "work",
    items: {
      top: "White dress shirt",
      bottom: "Charcoal dress pants",
      shoes: "Black Oxford shoes",
      accessories: ["Silk tie", "Leather belt"]
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6",
    name: "Dinner Date",
    occasion: "date",
    items: {
      top: "Navy blazer with white shirt",
      bottom: "Tailored trousers",
      shoes: "Leather dress shoes",
      accessories: ["Pocket square"]
    },
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  }
];

// Sample closet items
const sampleClosetItems: ClosetItem[] = [
  {
    id: "closet-1",
    name: "White T-shirt",
    category: "tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "closet-2",
    name: "Blue Oxford Shirt",
    category: "tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "closet-3",
    name: "Dark Wash Jeans",
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "closet-4",
    name: "White Sneakers",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "closet-5",
    name: "Silver Watch",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  }
];

export const OutfitProvider = ({ children }: { children: ReactNode }) => {
  const [outfits, setOutfits] = useState<Outfit[]>(sampleOutfits);
  const [currentMood, setCurrentMood] = useState<string>("casual");
  const [virtualCloset, setVirtualCloset] = useState<ClosetItem[]>(sampleClosetItems);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const addItemToCloset = (item: ClosetItem) => {
    setVirtualCloset((prev) => [item, ...prev]);
  };

  const getClosetItemsByCategory = (category: string) => {
    return virtualCloset.filter(item => item.category === category);
  };

  const generateOutfit = (occasion: string) => {
    // In a real implementation, this would call an AI service
    setIsGenerating(true);
    
    // Simulate loading time
    setTimeout(() => {
      // Random high-quality outfit images from Unsplash
      const outfitImages = [
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
      ];
      
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
        image: outfitImages[Math.floor(Math.random() * outfitImages.length)]
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
        addItemToCloset,
        getClosetItemsByCategory,
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
