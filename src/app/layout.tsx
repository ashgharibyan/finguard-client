import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { QueryProvider } from "@/utils/QueryProvider";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
  title: "FinGuard",
  description: "Expense Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <QueryProvider>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" />
            {children}
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
