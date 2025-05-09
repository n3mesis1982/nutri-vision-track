
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FoodNutrient {
  nutrientId: number;
  nutrientName: string;
  value: number;
  unitName: string;
}

export interface FoodItem {
  fdcId: number;
  description: string;
  brandOwner?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  foodNutrients: FoodNutrient[];
}

interface FoodData {
  name: string;
  calories: string;
  serving: string;
  protein: string;
  carbs: string;
  fat: string;
}

export const useFoodDetails = (foodId: string | null) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodData, setFoodData] = useState<FoodData>({
    name: "",
    calories: "",
    serving: "",
    protein: "",
    carbs: "",
    fat: ""
  });
  const [isLoadingFood, setIsLoadingFood] = useState(false);
  const { toast } = useToast();

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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFoodData(prev => ({
      ...prev,
      [id.replace("food-", "")]: value
    }));
  };

  return {
    selectedFood,
    foodData,
    isLoadingFood,
    handleInputChange
  };
};
