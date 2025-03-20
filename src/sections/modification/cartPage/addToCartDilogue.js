import useResponsive from "@/hooks/useResponsive";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

CartDilogue.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
};


export default function CartDilogue({
  children = "",
  title = "",
  open = false,
  setOpen = false,
  fullWidth,
  maxWidth,
}) {
  const theme = useTheme();
  const fullScreen = useResponsive("down", "md");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        scroll="body"
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle sx={{ m: 0, mr: 5, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <Divider />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ py: 2 }}>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
