
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Search, Barcode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Capacitor } from "@capacitor/core";

const AddMeal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodData, setFoodData] = useState({
    name: "",
    calories: "",
    serving: "",
    protein: "",
    carbs: "",
    fat: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFoodData(prev => ({
      ...prev,
      [id.replace("food-", "")]: value
    }));
  };
  
  const handleAddManually = () => {
    // Validate required fields
    if (!foodData.name || !foodData.calories) {
      toast({
        title: "Missing information",
        description: "Please provide at least a food name and calories.",
        variant: "destructive",
      });
      return;
    }
    
    // For now, just show a toast and navigate back
    toast({
      title: "Meal added successfully!",
      description: `${foodData.name} has been added to your diary.`,
    });
    navigate("/diary");
  };
  
  const handleScan = (type: 'barcode' | 'camera') => {
    const isNative = Capacitor.isNativePlatform();
    
    if (isNative) {
      // This is where we would implement the native functionality
      toast({
        title: type === 'barcode' ? "Scanning Barcode" : "Taking Photo",
        description: "Native functionality coming soon.",
      });
    } else {
      toast({
        title: type === 'barcode' ? "Barcode Scanner" : "Photo Recognition",
        description: `This feature works best on a mobile device.`,
        variant: "default",
      });
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Add Food</h1>
      
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for a food..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleScan('barcode')}>
            <Barcode className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium text-center">Scan Barcode</h3>
            <p className="text-xs text-gray-500 text-center mt-1">Scan packaged food</p>
          </Card>
          
          <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleScan('camera')}>
            <Camera className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium text-center">Take Photo</h3>
            <p className="text-xs text-gray-500 text-center mt-1">AI food recognition</p>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Add</h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="food-name">Food Name</Label>
                <Input
                  id="food-name"
                  placeholder="E.g., Grilled Chicken Breast"
                  value={foodData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="food-calories">Calories</Label>
                  <Input 
                    id="food-calories" 
                    type="number" 
                    placeholder="kcal" 
                    value={foodData.calories}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="food-serving">Serving</Label>
                  <Input 
                    id="food-serving" 
                    placeholder="100g" 
                    value={foodData.serving}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="food-protein">Protein (g)</Label>
                  <Input 
                    id="food-protein" 
                    type="number" 
                    value={foodData.protein}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="food-carbs">Carbs (g)</Label>
                  <Input 
                    id="food-carbs" 
                    type="number" 
                    value={foodData.carbs}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="food-fat">Fat (g)</Label>
                  <Input 
                    id="food-fat" 
                    type="number" 
                    value={foodData.fat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <Button onClick={handleAddManually} className="w-full">
                Add to Diary
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
