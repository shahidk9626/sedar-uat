import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

VideoDilogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  video: PropTypes.string,
  onResumeScroll: PropTypes.func,
};

export default function VideoDilogue({
  open = false,
  setOpen = () => {},
  onResumeScroll = () => {},
  video = "",
}) {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [muteState, setMuteState] = useState(true); 

  const handleClose = () => {
    setOpen(false); 
    setMuteState(true); 
    onResumeScroll();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
       
        onClose={handleClose}
      >
        
        <Box
          onClick={handleClose}
          sx={{
            position: "absolute",
            zIndex: 2,
            cursor: "pointer",
            right: 20,
            top: 20,
            px: 0.6,
            pt: 0.5,
            borderRadius: "50%",
            backgroundColor: "#84848496",
          }}
        >
          <Iconify icon="gridicons:cross" />
        </Box>

        
        <Box
          component="div"
          className="player-wrapper"
          sx={{
            ...(themeDirection === "rtl" && {
              direction: "ltr!important",
            }),
          }}
        >
          <Box
            component="video"
            className="react-player"
            src={video}
            width="100%"
            height="100%"
            autoPlay={"true"}
            muted={muteState}
            loop 
            controls 
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
