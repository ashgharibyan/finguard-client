"use client";

import React from "react";
import { UserType } from "@/types/types";
import { Avatar, Button, Card, Group, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

interface DashboardProps {
  user: UserType;
}

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter();
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
                className="text-left px-6 py-2"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant="subtle"
                fullWidth
                className="text-left px-6 py-2"
                onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            </li>
          </ul>
        </nav>
        <div className="p-6">
          <Button fullWidth variant="outline" color="red">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Title order={2}>Welcome, {user.username}!</Title>
          <Group>
            <Avatar size="lg" radius="xl" />
            <div>
              <Text>{user.email}</Text>
              <Text size="sm" color="dimmed">
                {user.expenses.length} Expenses Recorded
              </Text>
            </div>
            <Button
              variant="outline"
              fullWidth
              className="text-left px-6 py-2"
              onClick={() => router.push("/create-expense")}
            >
              Create Expense
            </Button>
          </Group>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Expenses */}
          {user.expenses.map((expense) => (
            <Card shadow="sm" padding="lg" key={expense.id}>
              {/* Expense Details */}
              <Text size="lg">{expense.description}</Text>
              <Text size="sm" color="dimmed">
                {new Date(expense.date).toLocaleDateString()}
              </Text>
              <Text size="md" color="blue">
                ${expense.amount.toFixed(2)}
              </Text>

              {/* Buttons Group */}
              <Group mt="md">
                <Button
                  variant="outline"
                  color="red"
                  size="xs"
                  onClick={() =>
                    console.log("Delete expense with ID:", expense.id)
                  }
                >
                  X
                </Button>
                <Button
                  variant="filled"
                  color="orange"
                  size="xs"
                  onClick={() => console.log("Add expense")}
                >
                  Edit
                </Button>
              </Group>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
