
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Nutrition Reports</h1>
      
      <Tabs defaultValue="calories">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="calories" className="flex-1">Calories</TabsTrigger>
          <TabsTrigger value="macros" className="flex-1">Macros</TabsTrigger>
          <TabsTrigger value="nutrients" className="flex-1">Nutrients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calories" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Calorie Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400 border-t pt-4 mt-2">
                Calorie chart will appear here
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Calorie Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-gray-500 text-sm">Daily Average</p>
                  <p className="font-bold text-lg">1,850 kcal</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Highest Day</p>
                  <p className="font-bold text-lg">2,240 kcal</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Lowest Day</p>
                  <p className="font-bold text-lg">1,560 kcal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="macros" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Macronutrient Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400 border-t pt-4 mt-2">
                Macronutrient pie chart will appear here
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="nutrient-protein font-medium">Protein</span>
                    <span>90g avg / 120g goal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="nutrient-carbs font-medium">Carbohydrates</span>
                    <span>210g avg / 250g goal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="nutrient-fat font-medium">Fat</span>
                    <span>55g avg / 65g goal</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nutrients" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Micronutrient Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <h3 className="font-medium mb-2">Vitamins</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Vitamin A</span>
                      <span className="text-green-500">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vitamin C</span>
                      <span className="text-green-500">120%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vitamin D</span>
                      <span className="text-amber-500">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vitamin E</span>
                      <span className="text-red-500">40%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Minerals</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Calcium</span>
                      <span className="text-amber-500">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Iron</span>
                      <span className="text-amber-500">70%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potassium</span>
                      <span className="text-green-500">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Magnesium</span>
                      <span className="text-green-500">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
