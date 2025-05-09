
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const API_KEY = "fiAgIvK2oZis1DT0C5WtsOaAfpyZUDKxzZdxP4G8";
const API_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fdcId } = await req.json();

    if (!fdcId) {
      return new Response(
        JSON.stringify({ error: "Food ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call the FoodData Central API
    const url = new URL(`${API_BASE_URL}/food/${fdcId}`);
    url.searchParams.append("api_key", API_KEY);
    
    console.log(`Fetching details for food ID: ${fdcId}`);
    
    const response = await fetch(url.toString());
    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in food-detail function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
