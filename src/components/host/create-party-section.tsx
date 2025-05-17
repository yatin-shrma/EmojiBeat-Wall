"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { suggestInitialTheme, SuggestInitialThemeOutput } from "@/ai/flows/suggest-initial-theme";
import React, { useState } from "react";
import { Loader2, Wand2, PlusCircle } from "lucide-react";

const formSchema = z.object({
  partyName: z.string().min(3, "Party name must be at least 3 characters"),
  themePrompt: z.string().optional(),
});

export default function CreatePartySection() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSuggestingTheme, setIsSuggestingTheme] = useState(false);
  const [suggestedTheme, setSuggestedTheme] = useState<string | null>(null);
  const [isCreatingParty, setIsCreatingParty] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partyName: "",
      themePrompt: "",
    },
  });

  async function handleSuggestTheme() {
    const themePromptValue = form.getValues("themePrompt");
    if (!themePromptValue) {
      toast({
        variant: "destructive",
        title: "Theme Prompt Needed",
        description: "Please enter a theme prompt to get suggestions.",
      });
      return;
    }
    setIsSuggestingTheme(true);
    setSuggestedTheme(null);
    try {
      const result: SuggestInitialThemeOutput = await suggestInitialTheme({ themePrompt: themePromptValue });
      setSuggestedTheme(result.themeSuggestion);
      form.setValue("partyName", result.themeSuggestion, { shouldValidate: true });
      toast({
        title: "Theme Suggested!",
        description: `How about "${result.themeSuggestion}"?`,
      });
    } catch (error) {
      console.error("Error suggesting theme:", error);
      toast({
        variant: "destructive",
        title: "Theme Suggestion Failed",
        description: "Could not get a theme suggestion at this time.",
      });
    } finally {
      setIsSuggestingTheme(false);
    }
  }
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreatingParty(true);
    // Mock party creation
    // In a real app, this would involve a backend call to create a party and get an ID
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const newPartyId = "NEW" + Math.random().toString(36).substring(2, 7).toUpperCase(); // Generate a mock party ID
    
    toast({
      title: "Party Created!",
      description: `"${values.partyName}" is ready. Party Code: ${newPartyId}`,
    });
    router.push(`/host/party/${newPartyId}`);
    setIsCreatingParty(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="themePrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party Theme Idea (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., '80s retro disco night', 'chill beach vibes', 'futuristic cyberpunk'"
                  {...field}
                />
              </FormControl
              <FormDescription>
                Describe the vibe you're going for, and we can suggest a theme name!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" variant="outline" onClick={handleSuggestTheme} disabled={isSuggestingTheme} className="w-full sm:w-auto">
          {isSuggestingTheme ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Suggest Theme Name with AI
        </Button>

        {suggestedTheme && (
          <p className="text-sm text-primary">AI Suggestion: <span className="font-semibold">{suggestedTheme}</span></p>
        )}

        <FormField
          control={form.control}
          name="partyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter party name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isCreatingParty}>
          {isCreatingParty ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
             <PlusCircle className="mr-2 h-4 w-4" />
          )}
          Create New Party
        </Button>
      </form>
    </Form>
  );
}
