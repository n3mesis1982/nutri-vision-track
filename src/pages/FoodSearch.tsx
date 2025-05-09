
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Barcode, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

interface FoodSearchResult {
  fdcId: number;
  description: string;
  brandOwner?: string;
}

const FoodSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('food-search', {
        body: { searchTerm },
      });
      
      if (error) throw error;
      
      if (data && data.foods) {
        setSearchResults(data.foods);
      }
    } catch (error) {
      console.error("Error searching foods:", error);
      toast({
        title: "Search failed",
        description: "There was an error searching for foods. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleBarcodeScan = async (barcodeData: string) => {
    setIsScannerOpen(false);
    
    if (!barcodeData) {
      toast({
        title: "No barcode detected",
        description: "Please try scanning again",
        variant: "destructive",
      });
      return;
    }

    setSearchTerm(barcodeData);
    setIsSearching(true);
    
    try {
      // Use the barcode as search term
      const { data, error } = await supabase.functions.invoke('food-search', {
        body: { searchTerm: barcodeData },
      });
      
      if (error) throw error;
      
      if (data && data.foods && data.foods.length > 0) {
        setSearchResults(data.foods);
        toast({
          title: "Barcode scanned successfully",
          description: `Found ${data.foods.length} matching products`,
        });
      } else {
        toast({
          title: "No products found",
          description: `No products found for barcode: ${barcodeData}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching by barcode:", error);
      toast({
        title: "Barcode search failed",
        description: "There was an error searching for this product.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleFoodSelect = (food: FoodSearchResult) => {
    // Navigate to add meal page with the selected food ID
    navigate(`/add-meal?foodId=${food.fdcId}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Search Foods</h1>
      </div>

      {isScannerOpen ? (
        <div className="mb-4">
          <BarcodeScanner 
            onScan={handleBarcodeScan}
            onClose={() => setIsScannerOpen(false)}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for a food..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>

          <Button 
            onClick={() => setIsScannerOpen(true)} 
            className="w-full mb-6"
            variant="outline"
          >
            <Barcode className="mr-2 h-5 w-5" />
            Scan Barcode
          </Button>
        </>
      )}
      
      {searchResults.length > 0 && (
        <Card className="p-2 mt-4 max-h-[60vh] overflow-y-auto">
          <ul className="divide-y">
            {searchResults.map(food => (
              <li 
                key={food.fdcId}
                className="p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleFoodSelect(food)}
              >
                <p className="font-medium">{food.description}</p>
                {food.brandOwner && <p className="text-sm text-gray-500">{food.brandOwner}</p>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isSearching && (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
