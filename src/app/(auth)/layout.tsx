import { Box, Center, Stack } from "@mantine/core";
import React from "react";
import Footer from "./_components/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Center h={"100vh"}>
      <Stack>
        {children}
        <Footer />
      </Stack>
    </Center>
  );
}
