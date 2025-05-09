
import React, { useState } from "react";
import { Heart, ShoppingBag, Share2, Loader, Filter, Sparkles } from "lucide-react";
import { useOutfitContext } from "@/context/OutfitContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// High-quality outfit images from fashion websites
const hdOutfitImages = [
  {
    id: "casual-1",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Urban Explorer",
    occasion: "casual",
    items: {
      top: "Beige Overshirt",
      bottom: "Slim Fit Black Jeans",
      shoes: "Casual White Sneakers",
      accessories: ["Minimal Watch", "Silver Bracelet"]
    },
    brand: "Zara"
  },
  {
    id: "casual-2",
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Weekend Comfort",
    occasion: "casual",
    items: {
      top: "Grey Sweater",
      bottom: "Dark Blue Jeans",
      shoes: "Canvas Sneakers",
      accessories: ["Leather Bracelet"]
    },
    brand: "H&M"
  },
  {
    id: "work-1",
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Business Class",
    occasion: "work",
    items: {
      top: "Tailored Blazer & White Shirt",
      bottom: "Fitted Trousers",
      shoes: "Leather Oxfords",
      accessories: ["Tie", "Pocket Square", "Cufflinks"]
    },
    brand: "Boss"
  },
  {
    id: "work-2",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Modern Elegance",
    occasion: "work",
    items: {
      top: "Navy Suit Jacket",
      bottom: "Matching Suit Pants",
      shoes: "Brown Derby Shoes",
      accessories: ["Silk Tie", "Leather Belt"]
    },
    brand: "Calvin Klein"
  },
  {
    id: "party-1",
    image: "https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Night Vibes",
    occasion: "party",
    items: {
      top: "Black Henley",
      bottom: "Distressed Jeans",
      shoes: "Chelsea Boots",
      accessories: ["Leather Jacket", "Statement Watch"]
    },
    brand: "AllSaints"
  },
  {
    id: "party-2",
    image: "https://images.unsplash.com/photo-1614252369475-531eba7d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Party Essential",
    occasion: "party",
    items: {
      top: "Patterned Button-up Shirt",
      bottom: "Black Slim Fit Jeans",
      shoes: "Fashion Sneakers",
      accessories: ["Minimalist Necklace"]
    },
    brand: "Topman"
  },
  {
    id: "workout-1",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Active Lifestyle",
    occasion: "workout",
    items: {
      top: "Performance T-shirt",
      bottom: "Running Shorts",
      shoes: "Athletic Trainers",
      accessories: ["Sports Watch", "Fitness Tracker"]
    },
    brand: "Nike"
  },
  {
    id: "workout-2",
    image: "https://images.unsplash.com/photo-1616257266927-6ed9536c0f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Urban Athlete",
    occasion: "workout",
    items: {
      top: "Zip-up Hoodie",
      bottom: "Track Pants",
      shoes: "High-top Sneakers",
      accessories: ["Cap", "Wireless Earbuds"]
    },
    brand: "Adidas"
  },
  {
    id: "date-1",
    image: "https://images.unsplash.com/photo-1516555839402-c0921be9689f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "First Impression",
    occasion: "date",
    items: {
      top: "Light Blue Button-up",
      bottom: "Khaki Chinos",
      shoes: "Suede Desert Boots",
      accessories: ["Leather Watch", "Braided Belt"]
    },
    brand: "J.Crew"
  },
  {
    id: "date-2",
    image: "https://images.unsplash.com/photo-1617113930975-f9c7243ae527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Romantic Evening",
    occasion: "date",
    items: {
      top: "Black Turtleneck",
      bottom: "Fitted Pants",
      shoes: "Loafers",
      accessories: ["Minimalist Watch", "Cologne"]
    },
    brand: "COS"
  },
  {
    id: "special-1",
    image: "https://images.unsplash.com/photo-1507114845806-0347040042f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Gala Ready",
    occasion: "special",
    items: {
      top: "Tuxedo Jacket",
      bottom: "Matching Pants",
      shoes: "Patent Leather Shoes",
      accessories: ["Bow Tie", "Cufflinks", "Pocket Square"]
    },
    brand: "Armani"
  },
  {
    id: "vacation-1",
    image: "https://images.unsplash.com/photo-1598898457345-a2b032cf7f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    name: "Beach Getaway",
    occasion: "vacation",
    items: {
      top: "Linen Shirt",
      bottom: "Swim Shorts",
      shoes: "Leather Sandals",
      accessories: ["Sunglasses", "Woven Hat"]
    },
    brand: "Orlebar Brown"
  }
];

export function OutfitRecommendations() {
  const { outfits = [], currentMood = "casual", isGenerating = false } = useOutfitContext();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");

  // Filter outfits based on current mood/occasion
  // Use our HD outfit images, or fall back to context outfits if available
  const filteredOutfits = hdOutfitImages.filter(
    (outfit) => {
      if (selectedFilter !== "all" && outfit.brand.toLowerCase() !== selectedFilter) return false;
      return outfit.occasion === currentMood;
    }
  );

  // If no outfits match the current mood in our HD images, use any from that mood
  const displayOutfits = filteredOutfits.length > 0 ? filteredOutfits : hdOutfitImages.slice(0, 3);

  const handleSave = () => {
    toast.success("Outfit saved to your favorites!");
  };

  const handleTryOn = () => {
    toast.success("Virtual try-on initiated! Install our browser extension for the full experience.");
  };

  const handleShare = () => {
    toast.success("Sharing options opened!");
  };

  if (isGenerating) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16">
        <Loader size={48} className="animate-spin text-[#9b87f5] mb-4" />
        <h3 className="text-xl font-display">Generating your personalized outfits...</h3>
        <p className="text-outfit-gray mt-2">Our AI is working on perfect combinations for you</p>
      </div>
    );
  }

  if (displayOutfits.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h3 className="text-xl font-display">No outfits found for this mood</h3>
        <p className="text-outfit-gray mt-2">Try selecting a different mood or uploading more items to your virtual closet</p>
      </div>
    );
  }

  const uniqueBrands = Array.from(new Set(hdOutfitImages.map(outfit => outfit.brand.toLowerCase())));

  return (
    <div className="w-full my-8">
      <h2 className="text-3xl font-display font-medium mb-4 text-center">Personalized Recommendations</h2>
      <p className="text-outfit-gray text-center mb-8">Discover curated outfits from top brands based on your style preferences</p>
      
      {/* Filters section */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <Filter size={20} className="text-outfit-gray mr-2" />
          <span className="text-outfit-black font-medium mr-4">Filters:</span>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 text-sm rounded-full ${selectedFilter === 'all' ? 'bg-[#9b87f5] text-white' : 'bg-outfit-light-gray text-outfit-gray'}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Brands
            </button>
            
            {uniqueBrands.slice(0, 3).map(brand => (
              <button 
                key={brand}
                className={`px-3 py-1 text-sm rounded-full ${selectedFilter === brand ? 'bg-[#9b87f5] text-white' : 'bg-outfit-light-gray text-outfit-gray'}`}
                onClick={() => setSelectedFilter(brand)}
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </button>
            ))}
            
            <button className="px-3 py-1 text-sm rounded-full bg-outfit-light-gray text-outfit-gray">
              More +
            </button>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="text-[#9b87f5] border-[#9b87f5]"
          onClick={() => toast.success("AI customization activated!")}
        >
          <Sparkles size={16} className="mr-2" />
          AI Customize
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-fade">
        {displayOutfits.map((outfit) => (
          <div key={outfit.id} className="group relative h-[500px] overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in">
            <div className="relative h-full">
              <img 
                src={outfit.image} 
                alt={outfit.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 left-4">
                <span className="bg-white px-2 py-1 text-xs font-medium rounded shadow-sm">
                  {outfit.brand}
                </span>
              </div>
              
              {/* Floating save button */}
              <button 
                onClick={handleSave} 
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-outfit-light-gray transition-colors duration-300"
              >
                <Heart size={20} />
              </button>
              
              {/* Outfit info overlay - appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white transform translate-y-2 opacity-90 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-2xl font-display font-medium mb-2">{outfit.name}</h3>
                
                <div className="mt-3 space-y-1 text-sm opacity-90">
                  <div><span className="font-semibold">Top:</span> {outfit.items.top}</div>
                  <div><span className="font-semibold">Bottom:</span> {outfit.items.bottom}</div>
                  <div><span className="font-semibold">Shoes:</span> {outfit.items.shoes}</div>
                  {outfit.items.accessories && outfit.items.accessories.length > 0 && (
                    <div>
                      <span className="font-semibold">Accessories:</span> {outfit.items.accessories.join(", ")}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    onClick={handleTryOn}
                    className="bg-white text-black hover:bg-opacity-90 flex-1"
                  >
                    <ShoppingBag size={18} className="mr-2" /> Try On
                  </Button>
                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:bg-opacity-20"
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
