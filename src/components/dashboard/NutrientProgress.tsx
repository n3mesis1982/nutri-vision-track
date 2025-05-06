
import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface NutrientProgressProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  className?: string;
}

const NutrientProgress = ({ 
  label, 
  value, 
  max, 
  unit, 
  className 
}: NutrientProgressProps) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className={cn("font-medium", className)}>
          {value}/{max} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-end">
        <span className="text-xs text-gray-500">{percentage}%</span>
      </div>
    </div>
  );
};

export default NutrientProgress;
