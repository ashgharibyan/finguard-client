"use client";

import React, { useState } from "react";
import { UserType } from "@/types/types";
import { Avatar, Button, Card, Group, Text, Title, Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { deleteExpense } from "@/api/expenseApi";
import { logout } from "@/utils/authService";
import apiClient from "@/api/apiClient";

interface DashboardProps {
  user: UserType;
}

export default function Dashboard({ user }: DashboardProps) {
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

      // Refresh the page to get updated data
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

  const handleLogout = async () => {
    try {
      // Clear the client-side auth header
      apiClient.defaults.headers.common["Authorization"] = "";

      // Clear the cookie using client-side JavaScript
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      notifications.show({
        title: "Success",
        message: "Logged out successfully",
        color: "green",
      });

      // Use window.location.href for a full page refresh
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Logout error:", error);
      notifications.show({
        title: "Error",
        message: "Failed to logout. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <Title order={3} className="text-white">
            FinGuard
          </Title>
        </div>
        <nav className="flex-1">
          <ul>
            <li>
              <Button
                variant="subtle"
                fullWidth
                className="text-left px-6 py-2 text-white hover:bg-gray-800"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant="subtle"
                fullWidth
                className="text-left px-6 py-2 text-white hover:bg-gray-800"
                onClick={() => router.push("/all")}
              >
                All Expenses
              </Button>
            </li>
          </ul>
        </nav>
        <div className="p-6">
          <Button
            fullWidth
            variant="outline"
            color="red"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Title order={2} c={"black"}>
            Welcome, {user.username}!
          </Title>
          <Group>
            <Avatar size="lg" radius="xl" />
            <div>
              <Text>{user.email}</Text>
              <Text size="sm" c="gray.7">
                {user.expenses.length} Expenses Recorded
              </Text>
            </div>
            <Button
              variant="filled"
              c="white"
              onClick={() => router.push("/create-expense")}
            >
              Create Expense
            </Button>
          </Group>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.expenses.map((expense) => (
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
    </div>
  );
}
