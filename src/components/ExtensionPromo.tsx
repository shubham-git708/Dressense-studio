
import React, { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ExtensionPromo() {
  const [isExtensionInstalling, setIsExtensionInstalling] = useState(false);

  const handleGetExtension = () => {
    setIsExtensionInstalling(true);
    
    // Simulate extension installation process
    setTimeout(() => {
      toast("DripFit Extension installed successfully! Now you can try on clothes from any e-commerce site.");
      setIsExtensionInstalling(false);
      
      // Add a fake extension badge to the page to simulate installation
      const badge = document.createElement('div');
      badge.className = 'fixed top-20 right-4 bg-white rounded-lg shadow-lg p-2 z-50 flex items-center';
      badge.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
          <path d="M20 5C12.268 5 6 11.268 6 19C6 24.6 9.3 29.4 14 31.7V35H26V31.7C30.7 29.4 34 24.6 34 19C34 11.268 27.732 5 20 5Z" fill="#9b87f5"/>
        </svg>
        <span>DripFit Active</span>
      `;
      document.body.appendChild(badge);
      
      // Remove the badge after 5 seconds
      setTimeout(() => {
        badge.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(badge);
        }, 1000);
      }, 5000);
    }, 2000);
  };

  const handleLearnMore = () => {
    toast("The DripFit extension lets you try on clothes from any online store using your uploaded body images!");
  };

  return (
    <div className="w-full my-16">
      <div className="bg-gradient-to-r from-outfit-blue to-blue-500 rounded-2xl overflow-hidden shadow-xl">
        <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white max-w-2xl mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Try before you buy with our Browser Extension
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Our AI-powered extension lets you virtually try on clothes while shopping online. 
              See how items would look on your body before making a purchase.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-white text-outfit-blue hover:bg-blue-50 outfit-btn-primary"
                onClick={handleGetExtension}
                disabled={isExtensionInstalling}
              >
                <ShoppingBag size={18} className="mr-2" /> 
                {isExtensionInstalling ? "Installing..." : "Get the Extension"}
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 outfit-btn-outline"
                onClick={handleLearnMore}
              >
                Learn More <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-3 animate-float">
              <div className="bg-gray-100 p-2 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="py-2 px-4 bg-white rounded-md mb-4 text-center">
                  <span className="text-outfit-gray text-xs">fashion-store.com</span>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 bg-white p-2 rounded-md">
                    <div className="bg-outfit-light-gray w-full h-32 rounded mb-2"></div>
                    <div className="w-full h-4 bg-outfit-light-gray rounded mb-1"></div>
                    <div className="w-1/2 h-4 bg-outfit-light-gray rounded"></div>
                  </div>
                  <div className="w-1/2 flex flex-col justify-center items-center">
                    <div 
                      className="text-outfit-blue mb-2 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => toast("Virtual try-on activated! Browse any clothing site to try on items.")}
                    >
                      <ShoppingBag size={24} />
                    </div>
                    <div className="text-xs text-center font-medium text-outfit-black">
                      Try On
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
