import { Stack, TextField } from "@mui/material";
import React from "react";

function ColorPickerTest() {
  return (
    <Stack
      alignContent={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100%"}
    >
      <TextField type="color" />
    </Stack>
  );
}

export default ColorPickerTest;
