import useResponsive from "@/hooks/useResponsive";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

RemoveItemDilogue.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
};


export default function RemoveItemDilogue({ children = "", title = "", open = false, setOpen = false }) {
  const theme = useTheme();
  const fullScreen = useResponsive("down", "md");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        scroll="body"
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{ py: 2 }}>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
