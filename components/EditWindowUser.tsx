import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Users } from "@/types";
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
  gender: z.enum(["female", "male", "other"]),
  banned: z.boolean(),
});

// Define the props type for the component
type FormUserProps = {
  onClose: () => void;
  handleEditUser: (formData: Users) => Promise<void>; // Add handleEditUser prop
  userData: Users; // Add userData prop
};

// FormUser component
export function EditUser({ onClose, handleEditUser }: FormUserProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      gender: "male",
      banned: false,
    },
  });

  // Handle form submission
  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await handleEditUser(formData);
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
            <CardTitle>Update User Details</CardTitle> {/* Change form title */}
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
