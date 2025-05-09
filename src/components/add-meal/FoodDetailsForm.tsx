
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FoodData {
  name: string;
  calories: string;
  serving: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface FoodDetailsFormProps {
  foodData: FoodData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const FoodDetailsForm: React.FC<FoodDetailsFormProps> = ({
  foodData,
  onInputChange,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Food Details</h2>
      <div>
        <Label htmlFor="food-name">Food Name</Label>
        <Input
          id="food-name"
          placeholder="E.g., Grilled Chicken Breast"
          value={foodData.name}
          onChange={onInputChange}
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
            onChange={onInputChange}
          />
        </div>
        <div>
          <Label htmlFor="food-serving">Serving</Label>
          <Input 
            id="food-serving" 
            placeholder="100g" 
            value={foodData.serving}
            onChange={onInputChange}
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
            onChange={onInputChange}
          />
        </div>
        <div>
          <Label htmlFor="food-carbs">Carbs (g)</Label>
          <Input 
            id="food-carbs" 
            type="number" 
            value={foodData.carbs}
            onChange={onInputChange}
          />
        </div>
        <div>
          <Label htmlFor="food-fat">Fat (g)</Label>
          <Input 
            id="food-fat" 
            type="number" 
            value={foodData.fat}
            onChange={onInputChange}
          />
        </div>
      </div>
      
      <Button onClick={onSubmit} className="w-full">
        Add to Diary
      </Button>
    </div>
  );
};

export default FoodDetailsForm;
