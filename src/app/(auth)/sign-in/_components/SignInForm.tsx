"use client";

import { signIn } from "@/api/auth";
import { login } from "@/utils/authService";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export function SignInForm() {
  const [error, setError] = useState("");

  const form = useForm<LoginForm>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Please enter a valid email"),
      password: isNotEmpty("Please enter a password"),
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginForm) => signIn(email, password),
    onSuccess: async (data) => {
      if (data.token) {
        await login(data.token);
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.data?.error?.statusCode === 401) {
          setError("Invalid password");
        } else {
          setError("User not found");
        }
      }
    },
  });

  const handleLoginSubmit = async (formValues: LoginForm) => {
    console.log(formValues);
    setError("");

    loginMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });

    form.reset();
  };
  return (
    <Container size={420} my={40} miw={400}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} href="/sign-up">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert
            variant="filled"
            color="red"
            withCloseButton
            title={error}
            my="xs"
            icon={<IconInfoCircle />}
            onClose={() => {
              setError("");
            }}
          />
        )}
        <form onSubmit={form.onSubmit((values) => handleLoginSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="Youre email address"
            required
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button
            type="submit"
            loading={loginMutation.isPending}
            fullWidth
            mt="xl"
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
