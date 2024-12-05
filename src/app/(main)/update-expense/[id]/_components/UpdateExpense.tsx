"use client";

import React, { useState } from "react";
import { Button, TextInput, NumberInput, Title, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CreateExpenseBody, updateExpense } from "@/api/expenseApi";
import { ExpenseType, UserType } from "@/types/types";
import { notifications } from "@mantine/notifications";

interface UpdateExpenseProps {
  user: UserType;
  expense: ExpenseType;
}

export default function UpdateExpense({ expense }: UpdateExpenseProps) {
  const router = useRouter();

  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState<number>(expense.amount);
  const [date, setDate] = useState<Date | null>(new Date(expense.date));

  const update = useMutation({
    mutationFn: (updatedExpense: Partial<CreateExpenseBody>) =>
      updateExpense(expense.id, updatedExpense),
    mutationKey: ["updateExpense", expense.id],
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Expense updated successfully",
        color: "green",
      });
      router.push("/dashboard");
      console.log("Successfully updated expense");
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Error updating expense",
        color: "red",
      });
      console.error("Error updating expense");
      alert("Error updating expense, please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    if (amount <= 0.01) {
      alert("Amount must be greater than 0");
      return;
    }

    const updatedExpense = {
      description,
      amount,
      date: date,
    };

    update.mutate(updatedExpense);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      {/* Page Header */}
      <Button
        onClick={() => router.push("/dashboard")}
        variant="subtle"
        className="mb-4"
      >
        Back
      </Button>
      <Title order={2} className="mb-6">
        Update Expense
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
          onChange={(value: number | string) => {
            const numValue =
              typeof value === "string" ? parseFloat(value) : value;
            setAmount(isNaN(numValue) ? 0 : numValue);
          }}
          min={0.01}
          required
        />

        <DatePicker value={date} onChange={setDate} />

        <Group>
          <Button type="submit" color="blue" loading={update.isPending}>
            Update Expense
          </Button>
        </Group>
      </form>
    </div>
  );
}
