
import React, { useState } from "react";
import { Menu, X, User, Bell, Search, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-display font-semibold text-outfit-black">
                Chic<span className="text-outfit-blue">Fit</span>
              </span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-outfit-black hover:text-outfit-blue transition-colors">
              Discover
            </a>
            <a href="#" className="text-outfit-black hover:text-outfit-blue transition-colors">
              My Closet
            </a>
            <a href="#" className="text-outfit-black hover:text-outfit-blue transition-colors">
              Style Ideas
            </a>
            <a href="#" className="text-outfit-black hover:text-outfit-blue transition-colors">
              Extension
            </a>
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
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
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>My Outfits</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="outfit-btn-primary">
              Get Extension
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-outfit-light-gray"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-outfit-light-gray">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a href="#" className="block py-2 text-outfit-black hover:text-outfit-blue">
              Discover
            </a>
            <a href="#" className="block py-2 text-outfit-black hover:text-outfit-blue">
              My Closet
            </a>
            <a href="#" className="block py-2 text-outfit-black hover:text-outfit-blue">
              Style Ideas
            </a>
            <a href="#" className="block py-2 text-outfit-black hover:text-outfit-blue">
              Extension
            </a>
            <div className="pt-4 border-t border-outfit-light-gray">
              <Button className="outfit-btn-primary w-full">
                Get Extension
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
