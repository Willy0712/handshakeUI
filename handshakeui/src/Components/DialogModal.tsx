import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
} from "@mui/material";
import classes from "../Styles/Modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogModal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  isOpen,
  handleClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      transitionDuration={500}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle id="max-width-dialog-title">
        {title}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Divider />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
