
import React from "react";
import { Plus, Filter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function VirtualCloset() {
  // Sample clothing items for demonstration
  const clothingItems = {
    tops: [
      { id: 1, name: "White T-shirt", image: "/placeholder.svg" },
      { id: 2, name: "Blue Oxford Shirt", image: "/placeholder.svg" },
      { id: 3, name: "Black Polo", image: "/placeholder.svg" },
    ],
    bottoms: [
      { id: 4, name: "Dark Wash Jeans", image: "/placeholder.svg" },
      { id: 5, name: "Khaki Chinos", image: "/placeholder.svg" },
    ],
    shoes: [
      { id: 6, name: "White Sneakers", image: "/placeholder.svg" },
      { id: 7, name: "Brown Loafers", image: "/placeholder.svg" },
    ],
    accessories: [
      { id: 8, name: "Silver Watch", image: "/placeholder.svg" },
      { id: 9, name: "Leather Belt", image: "/placeholder.svg" },
    ],
  };

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

      <Tabs defaultValue="tops" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tops">Tops</TabsTrigger>
          <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
        
        {Object.entries(clothingItems).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <div key={item.id} className="outfit-card">
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  </div>
                </div>
              ))}
              
              {/* Add new item card */}
              <div className="border-2 border-dashed border-outfit-gray rounded-xl flex flex-col items-center justify-center aspect-square hover:border-outfit-blue transition-colors p-4">
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
