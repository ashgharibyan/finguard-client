"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

const themeColors: MantineColorsTuple = [
  "#e7efff",
  "#cfdaff",
  "#9db2ff",
  "#6787fc",
  "#3b63fa",
  "#1e4cf9",
  "#0a41fa",
  "#0033df",
  "#002cc8",
  "#0025b1",
];

const secondaryColors: MantineColorsTuple = [
  "#e3f5ff",
  "#cde6ff",
  "#9ccaff",
  "#67adfb",
  "#3c95f9",
  "#1f85f8",
  "#067df9",
  "#006bde",
  "#005fc8",
  "#0052b1",
];

const terniaryColors: MantineColorsTuple = [
  "#defdff",
  "#c9f4ff",
  "#98e7ff",
  "#63d9fd",
  "#39cdfb",
  "#1cc6fb",
  "#00c2fc",
  "#00abe1",
  "#0099cb",
  "#0085b3",
];
const backgroundGray: MantineColorsTuple = [
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
  "#f7f8f9",
];

export const theme = createTheme({
  primaryColor: "primary",
  primaryShade: 4,
  colors: {
    primary: themeColors,
    secondary: secondaryColors,
    terniary: terniaryColors,
    backgroundGray: backgroundGray,
  },
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});
