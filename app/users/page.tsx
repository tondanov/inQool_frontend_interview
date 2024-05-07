"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Users } from "@/types";
import UsersDataTable from "./data-table";
import { columns } from "./columns";

async function getData(): Promise<Users[]> {
  try {
    const response = await axios.get<Users[]>(
      "https://inqool-interview-api.vercel.app/api/users"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function addNewUser(newUser: Omit<Users, "id">): Promise<void> {
  try {
    const userToAdd: Omit<Users, "id"> = { ...newUser, banned: false };
    await axios.post(
      "https://inqool-interview-api.vercel.app/api/users",
      userToAdd
    );
    console.log("New user added successfully");
  } catch (error) {
    console.error("Error adding new user:", error);
    throw new Error("Error adding new user. Please try again later.");
  }
}

const UsersTable = () => {
  const [data, setData] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getData();
        setData(result);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddUser = async (newUser: Users) => {
    try {
      setLoading(true);
      await addNewUser(newUser);
      const updatedData = await getData();
      setData(updatedData);
      setError(null);
    } catch (error) {
      console.error("Error adding new user:", error);
      setError("Error adding new user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersDataTable
      columns={columns}
      data={data}
      handleAddUser={handleAddUser}
    />
  );
};

export default UsersTable;
