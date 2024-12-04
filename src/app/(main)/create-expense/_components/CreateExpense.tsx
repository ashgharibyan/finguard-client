"use client";

import React, { useState } from "react";
import { Button, TextInput, NumberInput, Title, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UserType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { createExpense, CreateExpenseBody } from "@/api/expenseApi";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

interface AddExpenseProps {
  user: UserType;
}

export default function AddExpense({ user }: AddExpenseProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const create = useMutation({
    mutationFn: (expense: CreateExpenseBody) => createExpense(expense),
    mutationKey: ["createExpense"],
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Expense created successfully",
        color: "green",
      });
      router.push("/dashboard");
      console.log("Successfully created Expense");
      setLoading(false);
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Error creating an expense",
        color: "red",
      });
      console.error("error creating Expense");
      alert("Error creating expense, please try again");
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log(description, amount, date);
    if (!description || !amount || !date) {
      alert("Please fill in all required fields.");
      setLoading(false);

      return;
    }

    if (amount <= 0.01) {
      alert("Amount must be greater than 0");
      setLoading(false);

      return;
    }

    console.log(description, amount, date);

    const expense = {
      description: description,
      amount: amount,
      date: date,
      userId: user.id,
    };

    create.mutate(expense);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      {/* Page Header */}
      <Button onClick={() => router.push("/dashboard")}>Back</Button>
      <Title order={2} className="mb-6">
        Add New Expense
      </Title>

      {/* Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <TextInput
          label="Description"
          placeholder="Enter expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <NumberInput
          label="Amount"
          placeholder="Enter expense amount"
          value={amount}
          // Use a type-safe onChange handler
          onChange={(value: number | string) => {
            // Ensure we only set numeric values
            const numValue =
              typeof value === "string" ? parseFloat(value) : value;
            setAmount(isNaN(numValue) ? 0 : numValue);
          }}
          min={0.01}
          required
        />

        <DatePicker value={date} onChange={setDate} />

        <Group>
          <Button type="submit" color="blue" loading={loading}>
            Add Expense
          </Button>
        </Group>
      </form>
    </div>
  );
}
