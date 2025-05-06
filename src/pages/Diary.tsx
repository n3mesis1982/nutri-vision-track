
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface MealSection {
  id: string;
  title: string;
  items: MealItem[];
}

interface MealItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample data - in a real app this would come from state or API
  const mealSections: MealSection[] = [
    {
      id: "breakfast",
      title: "Breakfast",
      items: [
        {
          id: "1",
          name: "Oatmeal with Banana",
          portion: "1 bowl (250g)",
          calories: 350,
          protein: 12,
          carbs: 60,
          fat: 6
        },
        {
          id: "2",
          name: "Coffee with Milk",
          portion: "1 cup",
          calories: 100,
          protein: 2,
          carbs: 10,
          fat: 4
        }
      ]
    },
    {
      id: "lunch",
      title: "Lunch",
      items: [
        {
          id: "3",
          name: "Chicken Salad",
          portion: "1 plate",
          calories: 450,
          protein: 35,
          carbs: 20,
          fat: 25
        }
      ]
    },
    {
      id: "dinner",
      title: "Dinner",
      items: [
        {
          id: "4",
          name: "Grilled Salmon",
          portion: "150g",
          calories: 300,
          protein: 36,
          carbs: 0,
          fat: 18
        },
        {
          id: "5",
          name: "Steamed Vegetables",
          portion: "1 cup",
          calories: 120,
          protein: 4,
          carbs: 24,
          fat: 1
        }
      ]
    },
    {
      id: "snacks",
      title: "Snacks",
      items: [
        {
          id: "6",
          name: "Apple",
          portion: "1 medium",
          calories: 95,
          protein: 0.5,
          carbs: 25,
          fat: 0.3
        }
      ]
    }
  ];

  // Calculate totals
  const totals = mealSections.reduce(
    (acc, section) => {
      const sectionTotals = section.items.reduce(
        (secAcc, item) => {
          return {
            calories: secAcc.calories + item.calories,
            protein: secAcc.protein + item.protein,
            carbs: secAcc.carbs + item.carbs,
            fat: secAcc.fat + item.fat,
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
      
      return {
        calories: acc.calories + sectionTotals.calories,
        protein: acc.protein + sectionTotals.protein,
        carbs: acc.carbs + sectionTotals.carbs,
        fat: acc.fat + sectionTotals.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Food Diary</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{format(selectedDate, "MMM d, yyyy")}</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {mealSections.map((section) => (
          <div key={section.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{section.title}</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                + Add Food
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                {section.items.length > 0 ? (
                  <div>
                    {section.items.map((item, index) => (
                      <div 
                        key={item.id}
                        className={`p-3 flex justify-between ${
                          index !== section.items.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.portion}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.calories} kcal</p>
                          <div className="text-xs text-gray-500 space-x-2">
                            <span className="nutrient-protein">P: {item.protein}g</span>
                            <span className="nutrient-carbs">C: {item.carbs}g</span>
                            <span className="nutrient-fat">F: {item.fat}g</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No items added yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex justify-between font-medium">
            <span>Daily Totals</span>
            <span>{totals.calories} kcal</span>
          </div>
          <div className="text-sm flex justify-end space-x-3 mt-1">
            <span className="nutrient-protein">Protein: {totals.protein}g</span>
            <span className="nutrient-carbs">Carbs: {totals.carbs}g</span>
            <span className="nutrient-fat">Fat: {totals.fat}g</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Diary;
