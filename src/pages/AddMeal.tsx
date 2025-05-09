
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Search, Barcode, Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

interface FoodItem {
  fdcId: number;
  description: string;
  brandOwner?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  foodNutrients: {
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
  }[];
}

const AddMeal = () => {
  const [searchParams] = useSearchParams();
  const foodId = searchParams.get("foodId");
  
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingFood, setIsLoadingFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
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
  
  // Load food details if ID is provided in URL
  useEffect(() => {
    if (foodId) {
      fetchFoodDetails(foodId);
    }
  }, [foodId]);
  
  const fetchFoodDetails = async (id: string) => {
    setIsLoadingFood(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('food-detail', {
        body: { fdcId: id },
      });
      
      if (error) throw error;
      
      if (data) {
        handleFoodSelect(data);
      }
    } catch (error) {
      console.error("Error fetching food details:", error);
      toast({
        title: "Failed to load food details",
        description: "There was an error loading the food information",
        variant: "destructive",
      });
    } finally {
      setIsLoadingFood(false);
    }
  };
  
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
  
  const navigateToSearch = () => {
    navigate("/food-search");
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    
    let calories = "";
    let protein = "";
    let carbs = "";
    let fat = "";
    
    // Find nutrients
    food.foodNutrients.forEach(nutrient => {
      if (nutrient.nutrientName === "Energy" && nutrient.unitName === "KCAL") {
        calories = nutrient.value.toString();
      } else if (nutrient.nutrientName === "Protein") {
        protein = nutrient.value.toString();
      } else if (nutrient.nutrientName === "Carbohydrate, by difference") {
        carbs = nutrient.value.toString();
      } else if (nutrient.nutrientName === "Total lipid (fat)") {
        fat = nutrient.value.toString();
      }
    });
    
    setFoodData({
      name: food.description,
      calories,
      serving: food.servingSize ? `${food.servingSize} ${food.servingSizeUnit || 'g'}` : "100g",
      protein,
      carbs,
      fat
    });
    
    setSearchResults([]);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Add Food</h1>
      
      {isLoadingFood ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Loading food information...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="p-4" onClick={navigateToSearch}>
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <Search className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Search for food</h3>
                <p className="text-sm text-gray-500">Find foods in our database</p>
              </div>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={navigateToSearch}>
              <Barcode className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center">Scan Barcode</h3>
              <p className="text-xs text-gray-500 text-center mt-1">Scan packaged food</p>
            </Card>
            
            <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate("/add-meal")}>
              <Camera className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center">Take Photo</h3>
              <p className="text-xs text-gray-500 text-center mt-1">AI food recognition</p>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedFood ? "Food Details" : "Quick Add"}
            </h2>
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
      )}
    </div>
  );
};

export default AddMeal;
