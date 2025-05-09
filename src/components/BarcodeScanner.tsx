
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle, Camera } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Capacitor } from "@capacitor/core";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Only used for web platform, mobile platform will use native camera API
  const startWebCamera = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
      toast({
        title: "Camera access failed",
        description: "Please allow camera access to scan barcodes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopWebCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Simulate barcode detection for web demo
  // In a real implementation, you'd use a proper barcode scanning library
  const simulateBarcodeScan = () => {
    // For demo purposes, generate a random UPC code
    const randomUPC = "049000" + Math.floor(100000 + Math.random() * 900000).toString();
    toast({
      title: "Barcode detected",
      description: `Scanning barcode: ${randomUPC}`,
    });
    onScan(randomUPC);
  };

  useEffect(() => {
    // On mobile platforms, we would use the native barcode scanner
    // For web demo, we'll just start the camera
    if (!Capacitor.isNativePlatform()) {
      startWebCamera();
    } else {
      // Native platform would use Capacitor Plugins in a real implementation
      // For now we'll just simulate a scan after a delay
      const timer = setTimeout(() => {
        simulateBarcodeScan();
      }, 2000);
      
      return () => clearTimeout(timer);
    }

    // Clean up camera on component unmount
    return () => {
      if (!Capacitor.isNativePlatform()) {
        stopWebCamera();
      }
    };
  }, []);

  return (
    <Card className="relative p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Scan Barcode</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 p-3 rounded mb-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {!Capacitor.isNativePlatform() ? (
        <div className="aspect-video bg-gray-100 mb-4 flex items-center justify-center relative">
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
              Loading camera...
            </div>
          )}
          
          {!isCameraActive && !isLoading && (
            <div className="flex flex-col items-center justify-center">
              <Camera className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm mb-2">Camera inactive</p>
              <Button onClick={startWebCamera}>Start Camera</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 mb-4 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400 mb-2 animate-pulse" />
            <p className="text-gray-500 text-sm">Scanning...</p>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        {Capacitor.isNativePlatform() 
          ? "Point your camera at a barcode" 
          : "For demo purposes, we'll simulate a barcode scan"}
      </div>
      
      {!Capacitor.isNativePlatform() && isCameraActive && (
        <Button 
          className="w-full mt-4" 
          onClick={simulateBarcodeScan}
        >
          Simulate Barcode Scan
        </Button>
      )}
    </Card>
  );
};
