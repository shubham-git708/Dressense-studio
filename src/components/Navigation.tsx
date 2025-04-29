
import React, { useState } from "react";
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

// SVG Logo component for the dripped out llama
const LlamaLogo = () => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path
      d="M20 5C12.268 5 6 11.268 6 19C6 24.6 9.3 29.4 14 31.7V35H26V31.7C30.7 29.4 34 24.6 34 19C34 11.268 27.732 5 20 5Z"
      fill="#9b87f5"
    />
    <path
      d="M16 15C16 16.1 15.1 17 14 17C12.9 17 12 16.1 12 15C12 13.9 12.9 13 14 13C15.1 13 16 13.9 16 15Z"
      fill="white"
    />
    <path
      d="M26 15C26 16.1 25.1 17 24 17C22.9 17 22 16.1 22 15C22 13.9 22.9 13 24 13C25.1 13 26 13.9 26 15Z"
      fill="white"
    />
    <path
      d="M20 25C22.2091 25 24 23.2091 24 21H16C16 23.2091 17.7909 25 20 25Z"
      fill="white"
    />
    <path
      d="M30 14C30 12.3 28.7 11 27 11C27 9.3 25.7 8 24 8C22.3 8 21 9.3 21 11H19C19 9.3 17.7 8 16 8C14.3 8 13 9.3 13 11C11.3 11 10 12.3 10 14C10 15.7 11.3 17 13 17H27C28.7 17 30 15.7 30 14Z"
      fill="#7E69AB"
      opacity="0.7"
    />
    <path
      d="M10 19L8 24M30 19L32 24"
      stroke="#7E69AB"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 32L15 37M23 32L25 37"
      stroke="#7E69AB"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <LlamaLogo />
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
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Extension
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 rounded-full text-outfit-gray hover:text-outfit-black hover:bg-outfit-light-gray transition-colors">
              <Search size={20} />
            </button>
            
            <button className="p-2 rounded-full text-outfit-gray hover:text-outfit-black hover:bg-outfit-light-gray transition-colors">
              <Heart size={20} />
            </button>
            
            <button className="p-2 rounded-full text-outfit-gray hover:text-outfit-black hover:bg-outfit-light-gray transition-colors">
              <Bell size={20} />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>My Outfits</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="outfit-btn-primary bg-[#9b87f5] hover:bg-[#8B5CF6]">
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
              
              <Link to="/" className="block py-3 px-4 text-outfit-black hover:text-[#9b87f5] hover:bg-outfit-light-gray rounded-md">
                Extension
              </Link>
            </nav>
            
            <div className="pt-4 border-t border-outfit-light-gray flex space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={20} />
              </Button>
            </div>
            
            <div>
              <Button className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]">
                Get Extension
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
