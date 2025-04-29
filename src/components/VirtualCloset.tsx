
import React, { useEffect, useState } from "react";
import { Plus, Filter, Upload, ShoppingBag, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useOutfitContext } from "@/context/OutfitContext";
import { setupScrollAnimations } from "@/utils/scrollAnimation";
import { toast } from "sonner";

export function VirtualCloset() {
  const { virtualCloset, getClosetItemsByCategory } = useOutfitContext();
  const [activeTab, setActiveTab] = useState("tops");
  const [showTryOn, setShowTryOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Set up scroll animations
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  // Categories for tabs with enhanced categorization
  const categories = ["tops", "bottoms", "shoes", "accessories"];

  // Function to simulate try-on functionality
  const handleTryOn = (itemId: string, itemName: string) => {
    setSelectedItem(itemId);
    setShowTryOn(true);
    toast(`Now trying on: ${itemName}`);
    
    // Simulate loading
    setTimeout(() => {
      setShowTryOn(false);
      toast.success(`${itemName} virtual try-on complete!`);
      
      // Show option to try with e-commerce items
      setTimeout(() => {
        toast("Want to see how this looks with items from online stores? Install our extension!");
      }, 1500);
    }, 2500);
  };

  // Function to upload new items
  const handleUploadNew = (category: string) => {
    // Create a temporary hidden input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          const result = e.target?.result as string;
          if (result) {
            // Simulate adding the item to the closet
            toast(`New ${category.slice(0, -1)} uploaded and being processed...`);
            
            setTimeout(() => {
              toast.success(`New ${category.slice(0, -1)} added to your virtual closet!`);
            }, 2000);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-full my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-medium">Your Virtual Closet</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="outfit-btn-outline">
            <Filter size={18} className="mr-2" /> Filter
          </Button>
          <Button className="outfit-btn-primary" onClick={() => {
            toast("Choose a category and upload a new item");
          }}>
            <Plus size={18} className="mr-2" /> Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tops" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {getClosetItemsByCategory(category).map((item) => (
                <div 
                  key={item.id} 
                  className={`outfit-card scroll-fade relative ${selectedItem === item.id && showTryOn ? 'ring-2 ring-[#9b87f5]' : ''}`} 
                  style={{animationDelay: `${Math.random() * 0.5}s`}}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white text-black"
                          onClick={() => handleTryOn(item.id, item.name)}
                        >
                          Try On
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-[#9b87f5] text-white border-none"
                          onClick={() => toast.success(`${item.name} added to outfit`)}
                        >
                          <ShoppingBag size={14} className="mr-1" /> Use
                        </Button>
                      </div>
                    </div>
                    
                    {selectedItem === item.id && showTryOn && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="text-white text-center">
                          <div className="animate-spin h-8 w-8 border-4 border-[#9b87f5] border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p className="text-sm font-medium">Virtual Try-On</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  </div>
                </div>
              ))}
              
              {/* Add new item card - making it functional */}
              <div 
                className="border-2 border-dashed border-outfit-gray rounded-xl flex flex-col items-center justify-center aspect-square hover:border-outfit-blue transition-colors p-4 cursor-pointer scroll-fade"
                onClick={() => handleUploadNew(category)}
              >
                <Upload size={24} className="text-outfit-gray mb-2" />
                <span className="text-sm text-outfit-gray text-center">Upload new {category.slice(0, -1)}</span>
              </div>
              
              {/* Camera upload option */}
              <div 
                className="border-2 border-dashed border-outfit-gray rounded-xl flex flex-col items-center justify-center aspect-square hover:border-outfit-blue transition-colors p-4 cursor-pointer scroll-fade"
                onClick={() => {
                  toast("Camera activated for capturing new item");
                  setTimeout(() => {
                    toast("Allow camera access to take a photo");
                  }, 1000);
                }}
              >
                <Camera size={24} className="text-outfit-gray mb-2" />
                <span className="text-sm text-outfit-gray text-center">Take photo of {category.slice(0, -1)}</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Try-on with e-commerce integration prompt */}
      <div className="mt-10 p-4 border border-[#9b87f5]/20 bg-[#9b87f5]/5 rounded-lg">
        <h3 className="text-lg font-medium mb-2">E-commerce Integration</h3>
        <p className="text-sm text-outfit-gray mb-4">
          With our browser extension, you can try on clothes from your favorite online stores using your own body model.
          Install the extension to unlock this feature!
        </p>
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
          onClick={() => {
            toast("Browser extension installation started");
            setTimeout(() => {
              toast("DripFit extension installed successfully!");
            }, 2000);
          }}
        >
          <ShoppingBag size={18} className="mr-2" /> Get Extension
        </Button>
      </div>
    </div>
  );
}
