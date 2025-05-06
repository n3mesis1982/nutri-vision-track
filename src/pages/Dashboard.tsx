
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, BarChart } from "lucide-react";
import NutrientProgress from "@/components/dashboard/NutrientProgress";
import RecentMeals from "@/components/dashboard/RecentMeals";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Example data - in a real app this would come from a state or API
  const dailyGoal = 2000;
  const consumed = 1450;
  const remaining = dailyGoal - consumed;
  const percentConsumed = Math.round((consumed / dailyGoal) * 100);
  
  const nutrients = {
    protein: { consumed: 75, goal: 120, unit: "g" },
    carbs: { consumed: 180, goal: 250, unit: "g" },
    fat: { consumed: 45, goal: 65, unit: "g" }
  };

  React.useEffect(() => {
    // Show welcome toast on first load
    toast({
      title: "Welcome to NutriTrack Personal!",
      description: "Track your nutrition with ease.",
    });
  }, [toast]);

  return (
    <div className="py-6 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Today's Summary</h2>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between">
              <span>Daily Goal</span>
              <span className="text-primary">{dailyGoal} kcal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={percentConsumed} className="h-2" />
              
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-gray-500">Consumed</p>
                  <p className="font-bold text-lg">{consumed} kcal</p>
                </div>
                <div>
                  <p className="text-gray-500">Remaining</p>
                  <p className="font-bold text-lg">{remaining} kcal</p>
                </div>
                <div>
                  <p className="text-gray-500">Progress</p>
                  <p className="font-bold text-lg">{percentConsumed}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Macronutrients</h2>
        <div className="space-y-3">
          <NutrientProgress 
            label="Protein" 
            value={nutrients.protein.consumed} 
            max={nutrients.protein.goal} 
            unit={nutrients.protein.unit}
            className="nutrient-protein"
          />
          <NutrientProgress 
            label="Carbohydrates" 
            value={nutrients.carbs.consumed} 
            max={nutrients.carbs.goal} 
            unit={nutrients.carbs.unit}
            className="nutrient-carbs"
          />
          <NutrientProgress 
            label="Fat" 
            value={nutrients.fat.consumed} 
            max={nutrients.fat.goal} 
            unit={nutrients.fat.unit}
            className="nutrient-fat"
          />
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Today's Meals</h2>
          <button className="text-primary text-sm font-medium">See all</button>
        </div>
        <RecentMeals />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <PieChart size={18} className="mr-2" />
              <span>Nutrition Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-32 flex items-center justify-center text-sm text-gray-400">
              Nutrient distribution chart
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <BarChart size={18} className="mr-2" />
              <span>Weekly Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-32 flex items-center justify-center text-sm text-gray-400">
              Weekly calorie chart
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
