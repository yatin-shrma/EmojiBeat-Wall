
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lightbulb, Sun, Moon, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const lightThemes = [
  { name: "Chill Blue", color: "bg-blue-500", icon: <Moon /> },
  { name: "Party Purple", color: "bg-purple-500", icon: <Zap /> },
  { name: "Sunset Orange", color: "bg-orange-500", icon: <Sun /> },
  { name: "Forest Green", color: "bg-green-500", icon: <Lightbulb /> },
];

export default function LightingController() {
  const { toast } = useToast();
  const [brightness, setBrightness] = useState(75);
  const [activeTheme, setActiveTheme] = useState(lightThemes[0].name);

  const handleThemeChange = (themeName: string) => {
    setActiveTheme(themeName);
    toast({
      title: "Lighting Updated!",
      description: `Theme set to ${themeName}. Brightness at ${brightness}%.`,
    });
    // In a real app, API call to smart lights would happen here
    console.log(`Lighting theme changed to ${themeName}, brightness ${brightness}%`);
  };

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
    // Debounce API call in real app
    console.log(`Brightness changed to ${value[0]}%`);
  };
  
  const handleBrightnessCommit = (value: number[]) => {
     toast({
      title: "Brightness Adjusted!",
      description: `Brightness set to ${value[0]}%. Current theme: ${activeTheme}.`,
    });
  }

  return (
    <div className="space-y-6">
      <div className="px-3"> {/* Added horizontal padding here */}
        <Label htmlFor="brightness-slider" className="text-sm font-medium">Brightness: {brightness}%</Label>
        <Slider
          id="brightness-slider"
          defaultValue={[brightness]}
          max={100}
          step={1}
          onValueChange={handleBrightnessChange}
          onValueCommit={handleBrightnessCommit} // Called when user finishes sliding
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Color Themes</Label>
        <div className="grid grid-cols-2 gap-3">
          {lightThemes.map((theme) => (
            <Button
              key={theme.name}
              variant={activeTheme === theme.name ? "default" : "outline"}
              onClick={() => handleThemeChange(theme.name)}
              className="flex flex-col h-auto p-3 items-center justify-center space-y-1.5 text-center"
            >
              <span className={`w-6 h-6 rounded-full ${theme.color} ring-2 ring-offset-2 ring-offset-background ring-transparent group-hover:ring-current transition-all ${activeTheme === theme.name ? 'ring-current' : ''}`}></span>
              <span className="text-xs">{theme.name}</span>
            </Button>
          ))}
        </div>
      </div>
       <Button className="w-full" onClick={() => handleThemeChange(activeTheme)}>
          <Lightbulb className="mr-2 h-4 w-4" /> Apply Current Settings
      </Button>
    </div>
  );
}
