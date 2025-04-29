
import React, { useEffect, useState } from "react";
import { Plus, Filter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useOutfitContext } from "@/context/OutfitContext";
import { setupScrollAnimations } from "@/utils/scrollAnimation";

export function VirtualCloset() {
  const { virtualCloset, getClosetItemsByCategory } = useOutfitContext();
  const [activeTab, setActiveTab] = useState("tops");

  // Set up scroll animations
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  // Categories for tabs
  const categories = ["tops", "bottoms", "shoes", "accessories"];

  return (
    <div className="w-full my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-medium">Your Virtual Closet</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="outfit-btn-outline">
            <Filter size={18} className="mr-2" /> Filter
          </Button>
          <Button className="outfit-btn-primary">
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
                  className="outfit-card scroll-fade" 
                  style={{animationDelay: `${Math.random() * 0.5}s`}}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button variant="outline" size="sm" className="bg-white text-black">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  </div>
                </div>
              ))}
              
              {/* Add new item card */}
              <div className="border-2 border-dashed border-outfit-gray rounded-xl flex flex-col items-center justify-center aspect-square hover:border-outfit-blue transition-colors p-4 cursor-pointer scroll-fade">
                <Upload size={24} className="text-outfit-gray mb-2" />
                <span className="text-sm text-outfit-gray text-center">Upload new item</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
