import React, { useState, useRef } from "react";
import { Upload, X, Check, Camera, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useOutfitContext } from "@/context/OutfitContext";
import { toast } from "sonner";

export function BodyImageUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSeparating, setIsSeparating] = useState(false);
  const { toast: toastFromHook } = useToast();
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
    toastFromHook({
      title: "Camera activated",
      description: "Allow camera access to take a photo",
    });
    // In a real implementation, this would trigger the device camera
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toastFromHook({
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
      setIsProcessing(false);
      setIsSeparating(true);
      
      // Simulate separating top and bottom wear
      separateClothing(imageUrl, fileName);
    }, 2000);
  };

  const separateClothing = (imageUrl: string, fileName: string) => {
    // Simulate AI separation of clothing items
    setTimeout(() => {
      const itemName = fileName.replace(/\.[^/.]+$/, ""); // Remove file extension
      
      // Add the top wear to the closet
      addItemToCloset({
        id: `top-${Date.now()}`,
        name: `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} - Top`,
        category: "tops",
        image: imageUrl,
      });
      
      // Add the bottom wear to the closet with slight delay to simulate processing
      setTimeout(() => {
        addItemToCloset({
          id: `bottom-${Date.now()}`,
          name: `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} - Bottom`,
          category: "bottoms",
          image: imageUrl,
        });
        
        setIsSeparating(false);
        
        toast("Outfit successfully separated into top and bottom wear!");
      }, 1000);
    }, 2000);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadProgress(null);
    setIsProcessing(false);
    setIsSeparating(false);
  };

  const handleSeperateTops = () => {
    if (!uploadedImage) return;
    
    setIsSeparating(true);
    
    // Simulate AI separation specifically for tops
    toastFromHook({
      title: "Processing tops",
      description: "AI is detecting and extracting top wear from your image",
    });
    
    setTimeout(() => {
      addItemToCloset({
        id: `top-${Date.now()}`,
        name: "Extracted Top Wear",
        category: "tops",
        image: uploadedImage,
      });
      
      setIsSeparating(false);
      toastFromHook({
        title: "Top extracted successfully",
        description: "The detected top has been added to your closet",
      });
    }, 2500);
  };
  
  const handleSeperateBottoms = () => {
    if (!uploadedImage) return;
    
    setIsSeparating(true);
    
    // Simulate AI separation specifically for bottoms
    toastFromHook({
      title: "Processing bottoms",
      description: "AI is detecting and extracting bottom wear from your image",
    });
    
    setTimeout(() => {
      addItemToCloset({
        id: `bottom-${Date.now()}`,
        name: "Extracted Bottom Wear",
        category: "bottoms",
        image: uploadedImage,
      });
      
      setIsSeparating(false);
      toastFromHook({
        title: "Bottom extracted successfully",
        description: "The detected bottom has been added to your closet",
      });
    }, 2500);
  };

  return (
    <div className="w-full my-8 bg-white rounded-xl shadow-lg p-6 scroll-fade">
      <h2 className="text-2xl font-display font-medium mb-4">Train Your AI Stylist</h2>
      <p className="text-outfit-gray mb-6">
        Upload a full-body image to create your personalized AI model. We'll automatically separate and extract your top and bottom wear, then add them to your virtual closet.
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
          
          {isProcessing ? (
            <div className="mt-4 bg-outfit-light-gray rounded-lg p-4 flex items-center">
              <div className="animate-spin mr-2 w-5 h-5 border-2 border-outfit-blue border-t-transparent rounded-full"></div>
              <span className="text-sm">Analyzing your image and extracting items...</span>
            </div>
          ) : isSeparating ? (
            <div className="mt-4 bg-outfit-light-gray rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Scissors size={18} className="text-outfit-blue mr-2 animate-pulse" />
                <span className="text-sm font-medium">Separating clothing items...</span>
              </div>
              <Progress value={70} className="h-2 mb-2" />
              <p className="text-xs text-outfit-gray">Our AI is working to identify and separate your outfit</p>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
                onClick={handleSeperateTops}
              >
                Extract Top Wear
              </Button>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
                onClick={handleSeperateBottoms}
              >
                Extract Bottom Wear
              </Button>
              <Button 
                variant="outline"
                className="col-span-2 border-[#9b87f5] text-[#9b87f5]"
                onClick={() => {
                  handleSeperateTops();
                  setTimeout(handleSeperateBottoms, 1500);
                }}
              >
                <Scissors size={18} className="mr-2" />
                Extract Both
              </Button>
            </div>
          )}
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
                className="outfit-btn-primary cursor-pointer bg-[#9b87f5] hover:bg-[#8B5CF6]"
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
