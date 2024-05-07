import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Animals, Users } from "@/types";
import * as z from "zod";
import { Form, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

// Define the form schema
const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["cat", "dog", "other"]),
  age: z.coerce.number(),
});

// Define the props type for the component
type FormAnimalProps = {
  onClose: () => void;
  handleEditAnimal: (formData: Animals) => Promise<void>;
  animalData: Animals;
};

export function EditAnimal({ onClose, handleEditAnimal }: FormAnimalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      type: "cat",
      age: 0,
    },
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await handleEditAnimal(formData);
      onClose();
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
      <div className="relative">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Update Animal Details</CardTitle>{" "}
            {/* Change form title */}
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                {/* Form fields */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* Form submission buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>{" "}
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
