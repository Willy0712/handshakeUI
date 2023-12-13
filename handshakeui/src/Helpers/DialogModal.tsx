import { Dialog, DialogContent, Divider, Slide } from "@mui/material";
import classes from "../Styles/Modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import React, { Fragment } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useState } from "react";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

interface ModalProps {
  // children: React.ReactNode;
  title: string;
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
  isOpen,
  handleClose,
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
            <Typography component="span">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        transitionDuration={500}
        open={isOpen}
        onClose={handleClose}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
          className={classes.tabs}
        >
          <Tab icon={<LoginIcon />} label="Sign In" />

          <Tab icon={<LogoutIcon />} label="Sign Up" />
          {/* <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton> */}
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
    </Fragment>
  );
};

export default DialogModal;
