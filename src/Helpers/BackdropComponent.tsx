import { Backdrop, CircularProgress } from "@mui/material";

export default function BackdropComponent(props: any) {
  return (
    <>
      <Backdrop open={props.loading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
