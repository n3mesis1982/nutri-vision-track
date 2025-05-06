
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Custom404 = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <p className="text-xl mb-8">Oops! Page not found</p>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Button onClick={() => navigate('/')}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default Custom404;
