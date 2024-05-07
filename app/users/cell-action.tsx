"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Users } from "@/types";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Copy, Edit, MoreHorizontal } from "lucide-react";

import { useState } from "react";
import { EditUser } from "@/components/EditWindowUser";

interface CellActionProps {
  data: Users;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  const [showCard, setShowCard] = useState(false); // State to manage card visibility

  const toggleCard = () => setShowCard(!showCard); // Function to toggle card visibility

  const updateUser = async (formData: Users) => {
    try {
      const response = await axios.patch(
        `https://inqool-interview-api.vercel.app/api/users/${data.id}`,
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

  const handleBanUser = async (userId: string) => {
    try {
      await axios.patch(
        `https://inqool-interview-api.vercel.app/api/users/${userId}`,
        { banned: true }
      );
    } catch (error) {
      console.error("Error banning user:", error);
      // Handle error if needed
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
        <DropdownMenuItem onClick={() => handleBanUser(data.id)}>
          <Ban className="mr-2 h-4 w-4" />
          Ban User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy id
        </DropdownMenuItem>
      </DropdownMenuContent>
      {showCard && (
        <EditUser
          onClose={toggleCard}
          handleEditUser={updateUser}
          userData={data}
        />
      )}
    </DropdownMenu>
  );
};
