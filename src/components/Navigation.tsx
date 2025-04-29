import React, { useState, useEffect } from "react";
import { Menu, X, User, Bell, Search, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { toast } from "sonner";

// Animated Cute Llama Logo component
const CuteLlamaLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Animate logo periodically
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <svg 
      width="45" 
      height="45" 
      viewBox="0 0 45 45" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`mr-2 transition-all duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => setTimeout(() => setIsAnimating(false), 1000)}
    >
      {/* Llama Body with rounder shape */}
      <path
        d="M22 8C14.268 8 8 14.268 8 22C8 27.6 11.3 32.4 16 34.7V38H28V34.7C32.7 32.4 36 27.6 36 22C36 14.268 29.732 8 22 8Z"
        fill={isAnimating ? "#8B5CF6" : "#9b87f5"}
        className="transition-all duration-500"
      />
      
      {/* Cute big Llama Eyes */}
      <ellipse
        cx="16"
        cy="19"
        rx="3"
        ry={isAnimating ? "3.5" : "3"}
        fill="white"
        className="transition-all duration-300"
      />
      <ellipse
        cx="28"
        cy="19"
        rx="3"
        ry={isAnimating ? "3.5" : "3"}
        fill="white"
        className="transition-all duration-300"
      />
      
      {/* Cute pupils that move when animated */}
      <circle
        cx={isAnimating ? "15.5" : "16"}
        cy={isAnimating ? "18.5" : "19"}
        r="1.5"
        fill="black"
        className="transition-all duration-300"
      />
      <circle
        cx={isAnimating ? "27.5" : "28"}
        cy={isAnimating ? "18.5" : "19"}
        r="1.5"
        fill="black"
        className="transition-all duration-300"
      />
      
      {/* Cute blush circles that appear when animated */}
      <circle
        cx="14"
        cy="22"
        r="1.5"
        fill="#FFB6C1"
        opacity={isAnimating ? "0.8" : "0"}
        className="transition-all duration-500"
      />
      <circle
        cx="30"
        cy="22"
        r="1.5"
        fill="#FFB6C1"
        opacity={isAnimating ? "0.8" : "0"}
        className="transition-all duration-500"
      />
      
      {/* Llama Smile that changes with animation */}
      <path
        d={isAnimating 
          ? "M18 26C20.2091 26 24.2091 26 26 26C26 28.2091 24.2091 30 22 30C19.7909 30 18 28.2091 18 26Z" 
          : "M18 25C20.2091 25 24.2091 25 26 25C26 27.2091 24.2091 29 22 29C19.7909 29 18 27.2091 18 25Z"}
        fill="white"
        className="transition-all duration-500"
      />
      
      {/* Llama Cute Hat */}
      <path
        d="M30 15C30 13.3 28.7 12 27 12C27 10.3 25.7 9 24 9C22.3 9 21 10.3 21 12H19C19 10.3 17.7 9 16 9C14.3 9 13 10.3 13 12C11.3 12 10 13.3 10 15C10 16.7 11.3 18 13 18H27C28.7 18 30 16.7 30 15Z"
        fill="#D6BCFA"
        opacity="0.9"
        transform={isAnimating ? "translate(0, -1) rotate(3deg)" : ""}
        className="transition-all duration-500"
      />
      
      {/* Llama Ears */}
      <path
        d="M12 14L8 8M32 14L36 8"
        stroke="#7E69AB"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-all duration-500 ${isAnimating ? 'stroke-[#9b87f5]' : ''}`}
      />
      
      {/* Llama Fashion Accessories - appears when animated */}
      <path
        d="M22 34V36M18 34L17 37M26 34L27 37"
        stroke="#D6BCFA"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isAnimating ? "1" : "0"}
        className="transition-all duration-500"
      />
      
      {/* Sparkle effects when animated */}
      {isAnimating && (
        <>
          <circle cx="10" cy="13" r="1" fill="white" className="animate-ping opacity-75" />
          <circle cx="34" cy="13" r="1" fill="white" className="animate-ping opacity-75" />
          <circle cx="22" cy="5" r="1" fill="#FFD700" className="animate-ping opacity-75" />
          <path d="M22 1L22.7 3.5H25.3L23.3 5L24 7.5L22 6L20 7.5L20.7 5L18.7 3.5H21.3L22 1Z" fill="#FFD700" opacity="0.7" className="animate-pulse" />
        </>
      )}
    </svg>
  );
};

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CuteLlamaLogo />
              <span className="text-2xl font-display font-semibold text-outfit-black">
                Drip<span className="text-[#9b87f5]">Fit</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation using NavigationMenu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Discover
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>My Closet</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="font-medium mb-2">Categories</div>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Tops
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Bottoms
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Dresses
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Shoes
                        </Link>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Collections</div>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Summer
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Winter
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Casual
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Formal
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Style Ideas</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="font-medium mb-2">Trending Styles</div>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Street Style
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Minimalist
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Athleisure
                        </Link>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Occasions</div>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Work
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Date Night
                        </Link>
                        <Link to="/" className="block py-2 text-sm text-outfit-black hover:text-[#9b87f5]">
                          Casual
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/" 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => toast("Extension functionality can be accessed from the extension section below")}
                >
                  Extension
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-outfit-gray hover:text-outfit-black hover:bg-outfit-light-gray transition-colors"
              onClick={() => toast("Search functionality coming soon!")}
            >
              <Search size={20} />
            </button>
            
            <button 
              className="p-2 rounded-full text-outfit-gray hover:text-outfit-black hover:bg-outfit-light-gray transition-colors"
              onClick={() => toast("Added to favorites!")}
            >
              <Heart size={20} />
            </button>
            
            <button 
              className="p-2 rounded-full text-outfit-gray hover:text-outfit-black hover:bg-outfit-light-gray transition-colors"
              onClick={() => toast("No new notifications")}
            >
              <Bell size={20} />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem onClick={() => toast("Profile page coming soon")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast("Settings page coming soon")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast("My Outfits page coming soon")}>My Outfits</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast("Signed out successfully")}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              className="outfit-btn-primary bg-[#9b87f5] hover:bg-[#8B5CF6]"
              onClick={() => {
                toast("Browser extension installation started");
                setTimeout(() => {
                  toast("DripFit extension installed successfully!");
                }, 2000);
              }}
            >
              Get Extension
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-outfit-light-gray"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - improved styling */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-outfit-light-gray shadow-lg absolute left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="space-y-2">
              <Link to="/" className="block py-3 px-4 text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                Discover
              </Link>
              
              <div className="border-b border-outfit-light-gray py-1">
                <div className="font-medium py-2 px-4">My Closet</div>
                <div className="pl-4 pb-2 space-y-1">
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Tops
                  </Link>
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Bottoms
                  </Link>
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Dresses
                  </Link>
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Shoes
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-outfit-light-gray py-1">
                <div className="font-medium py-2 px-4">Style Ideas</div>
                <div className="pl-4 pb-2 space-y-1">
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Street Style
                  </Link>
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Minimalist
                  </Link>
                  <Link to="/" className="block py-2 px-4 text-sm text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                    Athleisure
                  </Link>
                </div>
              </div>
              
              <Link 
                to="/" 
                className="block py-3 px-4 text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md"
                onClick={() => toast("Extension functionality can be accessed from the extension section below")}
              >
                Extension
              </Link>
            </nav>
            
            <div className="pt-4 border-t border-outfit-light-gray flex space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast("Search functionality coming soon!")}>
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast("Added to favorites!")}>
                <Heart size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast("No new notifications")}>
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast("Profile page coming soon")}>
                <User size={20} />
              </Button>
            </div>
            
            <div>
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
                onClick={() => {
                  toast("Browser extension installation started");
                  setTimeout(() => {
                    toast("DripFit extension installed successfully!");
                  }, 2000);
                }}
              >
                Get Extension
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
