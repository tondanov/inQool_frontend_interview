"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Animals } from "@/types";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal } from "lucide-react";

import { useState } from "react";
import { EditUser } from "@/components/EditWindowUser";
import { EditAnimal } from "@/components/EditWindowAnimals";

interface CellActionProps {
  data: Animals;
}

export const CellActionAnimal: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  const [showCard, setShowCard] = useState(false); // State to manage card visibility

  const toggleCard = () => setShowCard(!showCard); // Function to toggle card visibility

  const updateAnimal = async (formData: Animals) => {
    try {
      const response = await axios.patch(
        `https://inqool-interview-api.vercel.app/api/animals/${data.id}`,
        {
          name: formData.name,
        }
      );
      console.log("User data updated successfully:", response.data);
      // Handle success
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleCard}>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy id
        </DropdownMenuItem>
      </DropdownMenuContent>
      {showCard && (
        <EditAnimal
          onClose={toggleCard}
          handleEditAnimal={updateAnimal}
          animalData={data}
        />
      )}
    </DropdownMenu>
  );
};
