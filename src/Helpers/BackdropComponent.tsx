import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

export default function BackdropComponent(props: any) {
  return (
    <>
      <Backdrop open={props.loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
