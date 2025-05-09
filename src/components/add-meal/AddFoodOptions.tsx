
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Barcode, Camera, Plus } from "lucide-react";

const AddFoodOptions: React.FC = () => {
  const navigate = useNavigate();
  
  const navigateToSearch = () => {
    navigate("/food-search");
  };

  return (
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
    </div>
  );
};

export default AddFoodOptions;
