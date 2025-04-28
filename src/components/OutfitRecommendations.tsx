
import React from "react";
import { Heart, ShoppingBag, Share2, Loader } from "lucide-react";
import { useOutfitContext } from "@/context/OutfitContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function OutfitRecommendations() {
  const { outfits, currentMood, isGenerating } = useOutfitContext();

  // Filter outfits based on current mood/occasion
  const filteredOutfits = outfits.filter(
    (outfit) => outfit.occasion === currentMood
  );

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
        <Loader size={48} className="animate-spin text-outfit-blue mb-4" />
        <h3 className="text-xl font-display">Generating your personalized outfits...</h3>
        <p className="text-outfit-gray mt-2">Our AI is working on perfect combinations for you</p>
      </div>
    );
  }

  if (filteredOutfits.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h3 className="text-xl font-display">No outfits found for this mood</h3>
        <p className="text-outfit-gray mt-2">Try selecting a different mood or uploading more items to your virtual closet</p>
      </div>
    );
  }

  return (
    <div className="w-full my-8">
      <h2 className="text-3xl font-display font-medium mb-10 text-center">Personalized Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOutfits.map((outfit) => (
          <div key={outfit.id} className="group relative h-[500px] overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 animate-fade-in">
            <div className="relative h-full">
              <img 
                src={outfit.image} 
                alt={outfit.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
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
