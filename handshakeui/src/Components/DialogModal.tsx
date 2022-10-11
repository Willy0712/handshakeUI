import {
  Dialog,
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
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

interface ModalProps {
  title: string;
  // children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  indexTab: number;
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
  isOpen,
  handleClose,
  indexTab,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: any) {
    let { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
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
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Sign In" />

        <Tab label="Sign Up" />
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Tabs>
      <TabPanel value={value} index={0}>
        <DialogContent>
          <Divider />
          <SignIn />
        </DialogContent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DialogContent>
          <Divider />
          <SignUp />
        </DialogContent>
      </TabPanel>
    </Dialog>
  );
};

export default DialogModal;
