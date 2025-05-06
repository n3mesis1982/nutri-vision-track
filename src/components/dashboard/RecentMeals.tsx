
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  image?: string;
}

const RecentMeals = () => {
  // Example data - in a real app this would come from state or API
  const meals: Meal[] = [
    {
      id: "1",
      name: "Breakfast",
      time: "8:30 AM",
      calories: 450,
      protein: 22,
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "2",
      name: "Lunch",
      time: "12:45 PM",
      calories: 620,
      protein: 35
    },
    {
      id: "3",
      name: "Snack",
      time: "3:30 PM",
      calories: 180,
      protein: 5
    }
  ];

  return (
    <div className="space-y-3">
      {meals.map((meal) => (
        <Card key={meal.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              {meal.image && (
                <div className="w-24 h-24 bg-gray-100">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`p-3 flex-grow ${!meal.image ? 'pl-4' : ''}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{meal.calories} kcal</p>
                    <p className="text-sm text-blue-500">{meal.protein}g protein</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentMeals;
