
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
      <h2 className="text-2xl font-display font-medium mb-6">Personalized Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutfits.map((outfit) => (
          <div key={outfit.id} className="outfit-card animate-fade-in bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative">
              <img 
                src={outfit.image} 
                alt={outfit.name} 
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={handleSave} 
                  className="p-2 bg-white rounded-full shadow hover:bg-outfit-light-gray"
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-display font-medium">{outfit.name}</h3>
              
              <div className="mt-3 space-y-2 text-sm">
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
                  className="outfit-btn-primary flex-1"
                >
                  <ShoppingBag size={18} className="mr-2" /> Try On
                </Button>
                <Button 
                  onClick={handleShare}
                  variant="outline"
                  className="outfit-btn-outline"
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
