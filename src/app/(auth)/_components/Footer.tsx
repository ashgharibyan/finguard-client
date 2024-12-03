"use client";

import { Anchor, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <Group justify="center" align="center">
      <Anchor component={Link} href={"/"}>
        <h1 className="text-2xl font-bold">FinGuard</h1>
      </Anchor>

      <Text size="sm" fw={300}>
        {" "}
        © 2024 FinGuard. All rights reserved.
      </Text>
    </Group>
  );
}
