"use client";

import { signUp } from "@/api/auth";
import { signUpFormSchema } from "@/types/auth";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";

type SignUpForn = {
  email: string;
  username: string;
  password: string;
};

export function SignUpForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpForn>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: zodResolver(signUpFormSchema),
  });

  const handleSignUpSubmit = async (formValues: SignUpForn) => {
    console.log(formValues);
    setError("");
    setLoading(true);

    try {
      await signUp(formValues.email, formValues.password, formValues.username);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.data?.error?.statusCode === 409) {
          setError("User already exists with that email or username.");
        } else {
          setError("An unexpected error occurred. Please Try Again.");
        }
      } else {
        setError("An unexpected error occurred. Please Try Again.");
      }
    }

    form.reset();
  };
  return (
    <Container size={420} my={40} miw={400}>
      <Title ta="center">Create an Account!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} href="/sign-in">
          Log In
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
        <form onSubmit={form.onSubmit((values) => handleSignUpSubmit(values))}>
          <TextInput
            label="Email"
            placeholder="Your email address"
            required
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Button type="submit" loading={loading} fullWidth mt="xl">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
