
import React from "react";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-outfit-light-gray pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center mb-4">
              <span className="text-2xl font-display font-semibold text-outfit-black">
                Chic<span className="text-outfit-blue">Fit</span>
              </span>
            </a>
            <p className="text-outfit-gray mb-4 text-sm">
              AI-powered outfit recommendations personalized to your body type and style preferences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-outfit-gray hover:text-outfit-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-outfit-gray hover:text-outfit-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-outfit-gray hover:text-outfit-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-outfit-gray hover:text-outfit-blue">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">How It Works</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">AI Technology</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Virtual Try-On</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Style Quiz</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Extension</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Download</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Compatible Shops</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Feature Updates</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Developer API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Help Center</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-outfit-gray hover:text-outfit-blue text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-outfit-light-gray mt-12 pt-8 text-center">
          <p className="text-outfit-gray text-sm">
            &copy; {new Date().getFullYear()} ChicFit. All rights reserved. AI-powered outfit recommendations.
          </p>
        </div>
      </div>
    </footer>
  );
}
