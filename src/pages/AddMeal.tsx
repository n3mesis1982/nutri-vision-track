
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AddFoodOptions from "@/components/add-meal/AddFoodOptions";
import FoodDetailsForm from "@/components/add-meal/FoodDetailsForm";
import LoadingState from "@/components/add-meal/LoadingState";
import { useFoodDetails } from "@/hooks/useFoodDetails";

const AddMeal = () => {
  const [searchParams] = useSearchParams();
  const foodId = searchParams.get("foodId");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { foodData, isLoadingFood, handleInputChange } = useFoodDetails(foodId);
  
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

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Add Food</h1>
      
      {isLoadingFood ? (
        <LoadingState />
      ) : (
        <div className="space-y-6">
          <AddFoodOptions />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {foodId ? "Food Details" : "Quick Add"}
            </h2>
            <Card className="p-4">
              <FoodDetailsForm 
                foodData={foodData}
                onInputChange={handleInputChange}
                onSubmit={handleAddManually}
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMeal;
