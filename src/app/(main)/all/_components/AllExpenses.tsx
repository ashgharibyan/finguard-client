"use client";

import React, { useState } from "react";
import { EnhancedExpenseType, UserType } from "@/types/types";
import { Button, Card, Group, Text, Title, Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { deleteExpense } from "@/api/expenseApi";

interface AllExpensesProps {
  expenses: EnhancedExpenseType[];
  currentUser: UserType;
}

export default function AllExpenses({
  expenses,
  currentUser,
}: AllExpensesProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    expenseId: number | null;
  }>({
    isOpen: false,
    expenseId: null,
  });

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      setLoading((prev) => ({ ...prev, [expenseId]: true }));
      await deleteExpense(expenseId);

      notifications.show({
        title: "Success",
        message: "Expense deleted successfully",
        color: "green",
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting expense:", error);
      notifications.show({
        title: "Error",
        message: "Failed to delete expense. Please try again.",
        color: "red",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [expenseId]: false }));
      setDeleteModal({ isOpen: false, expenseId: null });
    }
  };

  // Check if the expense belongs to the current user
  const isExpenseOwner = (expense: EnhancedExpenseType) => {
    return expense.createdBy === currentUser.email;
  };

  return (
    <main className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Title order={2} c={"black"}>
          All Expenses
        </Title>
        <Button
          variant="filled"
          c="white"
          onClick={() => router.push("/create-expense")}
        >
          Create Expense
        </Button>
        <Button onClick={() => router.push("/dashboard")}>Back</Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense) => (
          <Card
            key={expense.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section className="p-4 border-b">
              <Text size="lg">{expense.description}</Text>
            </Card.Section>

            <Group mt="md">
              <div>
                <Text size="sm" c="gray.7">
                  Date
                </Text>
                <Text size="sm">
                  {new Date(expense.date).toLocaleDateString()}
                </Text>
              </div>
              <div>
                <Text size="sm" c="gray.7">
                  Amount
                </Text>
                <Text size="lg" c="blue">
                  ${expense.amount.toFixed(2)}
                </Text>
              </div>
            </Group>

            <Group mt="md">
              <Text size="sm" c="gray.7">
                Created by: {expense.createdBy}
              </Text>
              <Text size="sm" c="gray.7">
                on {new Date(expense.createdAt).toLocaleDateString()}
              </Text>
            </Group>

            {isExpenseOwner(expense) && (
              <Group mt="md">
                <Button
                  variant="outline"
                  color="red"
                  size="xs"
                  loading={loading[expense.id]}
                  onClick={() =>
                    setDeleteModal({
                      isOpen: true,
                      expenseId: expense.id,
                    })
                  }
                >
                  Delete
                </Button>
                <Button
                  variant="filled"
                  color="blue"
                  size="xs"
                  onClick={() => router.push(`/update-expense/${expense.id}`)}
                >
                  Edit
                </Button>
              </Group>
            )}
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, expenseId: null })}
        title="Delete Expense"
        c={"black"}
        centered
      >
        <Text size="sm" mb="lg" c={"black"}>
          Are you sure you want to delete this expense? This action cannot be
          undone.
        </Text>
        <Group>
          <Button
            variant="outline"
            onClick={() => setDeleteModal({ isOpen: false, expenseId: null })}
          >
            Cancel
          </Button>
          <Button
            color="red"
            loading={
              deleteModal.expenseId ? loading[deleteModal.expenseId] : false
            }
            onClick={() => {
              if (deleteModal.expenseId) {
                handleDeleteExpense(deleteModal.expenseId);
              }
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </main>
  );
}
