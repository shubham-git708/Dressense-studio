
import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useOutfitContext } from "@/context/OutfitContext";

export function BodyImageUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItemToCloset } = useOutfitContext();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTakePhoto = () => {
    toast({
      title: "Camera activated",
      description: "Allow camera access to take a photo",
    });
    // In a real implementation, this would trigger the device camera
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload progress
    let progress = 0;
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Create a URL for the uploaded image
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
        
        // Start processing the image to extract clothing items
        processImage(imageUrl, file.name);
      }
    }, 200);
  };

  const processImage = (imageUrl: string, fileName: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing to extract clothing items
    setTimeout(() => {
      // In a real implementation, this would use computer vision to detect clothing items
      // For now, we'll simulate detecting a top and adding it to the closet
      
      const itemName = fileName.replace(/\.[^/.]+$/, ""); // Remove file extension
      
      // Determine random category (top, bottom, shoes, accessories)
      const categories = ["tops", "bottoms", "shoes", "accessories"];
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      // Add the extracted item to the closet
      addItemToCloset({
        id: `item-${Date.now()}`,
        name: `${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`,
        category,
        image: imageUrl,
      });
      
      setIsProcessing(false);
      
      toast({
        title: "Item added to your closet",
        description: `We've added the detected ${category.slice(0, -1)} to your Virtual Closet tab`,
        variant: "default",
      });
    }, 2000);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadProgress(null);
    setIsProcessing(false);
  };

  return (
    <div className="w-full my-8 bg-white rounded-xl shadow p-6 scroll-fade">
      <h2 className="text-2xl font-display font-medium mb-4">Train Your AI Stylist</h2>
      <p className="text-outfit-gray mb-6">
        Upload a full-body image to create your personalized AI model that understands your proportions and style preferences.
        We'll automatically extract clothing items and add them to your virtual closet.
      </p>
      
      {uploadedImage ? (
        <div className="relative w-full max-w-md mx-auto">
          <img 
            src={uploadedImage} 
            alt="Uploaded body image" 
            className="w-full rounded-lg object-cover aspect-[3/4]"
          />
          <button 
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
          >
            <X size={20} className="text-outfit-black" />
          </button>
          
          <div className="mt-4 bg-outfit-light-gray rounded-lg p-4 flex items-center">
            {isProcessing ? (
              <>
                <div className="animate-spin mr-2 w-5 h-5 border-2 border-outfit-blue border-t-transparent rounded-full"></div>
                <span className="text-sm">Analyzing your image and extracting items...</span>
              </>
            ) : (
              <>
                <Check size={20} className="text-green-500 mr-2" />
                <span className="text-sm">Your AI model is being trained with this image</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive ? "border-outfit-blue bg-outfit-blue bg-opacity-5" : "border-outfit-gray"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload size={48} className="text-outfit-gray mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag and drop your image here</h3>
            <p className="text-outfit-gray mb-4">or click to browse files</p>
            
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            
            <div className="flex gap-4">
              <Button 
                onClick={handleButtonClick} 
                className="outfit-btn-primary cursor-pointer"
              >
                Upload Image
              </Button>
              
              <Button 
                variant="outline" 
                className="outfit-btn-outline"
                onClick={handleTakePhoto}
              >
                <Camera size={18} className="mr-2" /> Take Photo
              </Button>
            </div>
            
            <p className="text-xs text-outfit-gray mt-4">
              Supported formats: JPEG, PNG. Max file size: 5MB
            </p>
          </div>
        </div>
      )}
      
      {uploadProgress !== null && uploadProgress < 100 && (
        <div className="mt-4">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-center mt-2">Uploading... {uploadProgress}%</p>
        </div>
      )}
    </div>
  );
}
