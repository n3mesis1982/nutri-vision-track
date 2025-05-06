
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Body Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" defaultValue="175" />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" defaultValue="70" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" defaultValue="30" />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select 
                  id="gender" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="male"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="activity">Activity Level</Label>
              <select 
                id="activity" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="moderately-active"
              >
                <option value="sedentary">Sedentary</option>
                <option value="lightly-active">Lightly Active</option>
                <option value="moderately-active">Moderately Active</option>
                <option value="very-active">Very Active</option>
                <option value="extremely-active">Extremely Active</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="calorie-goal">Daily Calorie Goal</Label>
              <Input id="calorie-goal" type="number" defaultValue="2000" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="protein-goal">Protein (g)</Label>
                <Input id="protein-goal" type="number" defaultValue="120" />
              </div>
              <div>
                <Label htmlFor="carbs-goal">Carbs (g)</Label>
                <Input id="carbs-goal" type="number" defaultValue="250" />
              </div>
              <div>
                <Label htmlFor="fat-goal">Fat (g)</Label>
                <Input id="fat-goal" type="number" defaultValue="65" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex-grow">Push Notifications</Label>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-report" className="flex-grow">Weekly Report Email</Label>
              <Switch id="weekly-report" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reminder" className="flex-grow">Meal Log Reminders</Label>
              <Switch id="reminder" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button className="w-full" onClick={handleSaveProfile}>
        Save Profile
      </Button>
    </div>
  );
};

export default Profile;
