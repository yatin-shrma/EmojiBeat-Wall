"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const formSchema = z.object({
  partyCode: z.string().min(6, "Party code must be 6 characters").max(6, "Party code must be 6 characters"),
});

export default function JoinPartyForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partyCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock party code validation and navigation
    if (values.partyCode.toUpperCase() === "PARTY1") { // Example valid code
      toast({
        title: "Joining Party!",
        description: `Welcome to party ${values.partyCode.toUpperCase()}!`,
      });
      router.push(`/party/${values.partyCode.toUpperCase()}`);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Party Code",
        description: "Please check the code and try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="partyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter 6-character code" 
                  {...field} 
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <LogIn className="mr-2 h-4 w-4" /> Join Party
        </Button>
      </form>
    </Form>
  );
}
