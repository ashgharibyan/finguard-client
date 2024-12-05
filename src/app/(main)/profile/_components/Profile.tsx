"use client";

import React from "react";
import { UserType } from "@/types/types";
import { Avatar, Button, TextInput, Title, Text, Divider } from "@mantine/core";
import { useRouter } from "next/navigation";

interface ProfileProps {
  user: UserType;
}

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      {/* Page Header */}
      <Button onClick={() => router.push("/dashboard")}>Back</Button>
      <Title order={2} className="mb-6">
        Your Profile
      </Title>

      {/* Profile Details Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {/* Avatar and Username */}
        <div className="flex flex-col items-center mb-6">
          <Avatar size={100} radius="xl" className="mb-4" />
          <Title order={3}>{user.username}</Title>
          <Text size="sm" color="dimmed">
            {user.email}
          </Text>
        </div>

        <Divider my="sm" />

        {/* Profile Information Form */}
        <form className="space-y-4">
          <TextInput
            label="Username"
            placeholder="Enter your username"
            defaultValue={user.username}
            required
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            defaultValue={user.email}
            type="email"
            required
          />
          <TextInput
            label="Password"
            placeholder="Enter a new password"
            type="password"
          />
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            type="password"
          />
          <div className="flex justify-end">
            <Button type="submit" color="blue">
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Expenses Overview */}
      <div className="w-full max-w-lg mt-8 bg-white shadow-lg rounded-lg p-6">
        <Title order={4} className="mb-4">
          Your Expenses
        </Title>
        {user.expenses.length > 0 ? (
          <ul className="space-y-3">
            {user.expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <Text>{expense.description}</Text>
                <Text>${expense.amount.toFixed(2)}</Text>
              </li>
            ))}
          </ul>
        ) : (
          <Text size="sm" color="dimmed">
            No expenses recorded.
          </Text>
        )}
      </div>
    </div>
  );
}
