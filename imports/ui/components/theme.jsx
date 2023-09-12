import React from "react";
import { createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";
import { green, red, purple } from "@mui/material/colors";

export const Darktheme = createTheme({
  palette: {
    primary: {
      main: red[700],
      dark: red[800],
      light: red[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: green[700],
      dark: green[800],
      light: green[500],
      contrastText: "#ffffff",
    },
    background: {
      default: "#115E73",
      paper: "#115E73",
    },
  },
});
