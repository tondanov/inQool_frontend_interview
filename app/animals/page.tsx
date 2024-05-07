"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Animals } from "@/types";
import { AnimalsDataTable } from "./data-table";
import { columns } from "./columns";

async function getData(): Promise<Animals[]> {
  try {
    const response = await axios.get<Animals[]>(
      "https://inqool-interview-api.vercel.app/api/animals"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function addNewAnimal(newAnimal: Omit<Animals, "id">): Promise<void> {
  try {
    const animalToAdd: Omit<Animals, "id"> = { ...newAnimal };
    await axios.post(
      "https://inqool-interview-api.vercel.app/api/animals",
      animalToAdd
    );
    console.log("New animal added successfully");
  } catch (error) {
    console.error("Error adding new animal:", error);
    throw new Error("Error adding new animal. Please try again later.");
  }
}

const AnimalsTable = () => {
  const [data, setData] = useState<Animals[]>([]);
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

  const handleAddAnimal = async (newAnimal: Animals) => {
    try {
      setLoading(true);
      await addNewAnimal(newAnimal);
      const updatedData = await getData();
      setData(updatedData);
      setError(null);
    } catch (error) {
      console.error("Error adding new animal:", error);
      setError("Error adding new animal. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimalsDataTable
      columns={columns}
      data={data}
      handleAddAnimal={handleAddAnimal}
    />
  );
};

export default AnimalsTable;
