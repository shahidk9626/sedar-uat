import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { useScrollTrigger } from "@mui/material";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import React from "react";
import ImageTransition from "./imageTransition";
import StickyBar from "./stickyBar";

function ShowScrollHeader(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} in={trigger}>
      {children}
    </Slide>
  );
}

ShowScrollHeader.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function GsapAnimation(props) {
  const { data = [] } = props;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      component="div"
      sx={{
        position: "relative",
      }}
    >
      <Box component="div" id="menu">
        <ShowScrollHeader {...props}>
          <Box
            component="div"
            sx={(theme) => ({
              zIndex: 1200,
              transition: theme.transitions.create(["all", "position"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              display: "block",
            })}
          >
            <StickyBar
              data={data?.PARENT?.CHILD[0]}
              HEADER_IMAGE={data?.PARENT?.CHILD?.[1]?.image_path_portrait}
            />
          </Box>
        </ShowScrollHeader>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          height: "100%",
          position: "relative",
        }}
        onClick={() => setOpen(true)}
        id="watch-video"
      >
        <NextLazyLoadImage
          src={data[1]?.PARENT?.image_path}
          alt={data[1]?.PARENT?.image_path}
          width={1200}
          height={400}
          sx={{
            width: "100%!important",
            height: "100vh!important",
            objectFit: "cover!important",
            backgroundSize: "cover!important",
          }}
          objectFit="contain"
          upLgWidth={1600}
          downLgWidth={1400}
          downMdWidth={800}
          downSmWidth={400}
          downXsWidth={300}
        />
      </Box>
      <ImageTransition
        data={data}
        child={1}
        direction="row"
        bgColor="#be8064"
      />
      <ImageTransition
        data={data}
        child={2}
        bgColor="#b4a690"
        direction="row-reverse"
      />
      {open && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1200,
            display: open ? "block" : "none",
            cursor: "pointer",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            px: 0.6,
            pt: 0.5,
            width: "100%",
            height: "100%",
            backgroundColor: "#2f2f2f90",
          }}
        >
          <Box
            component="div"
            className="player-wrapper"
            sx={{
              ...(themeDirection === "rtl" && {
                direction: "ltr!important",
              }),
              width: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Box
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                zIndex: 1300,
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
              component="video"
              className="react-player"
              src={data[1]?.PARENT?.CHILD?.[0]?.image_path}
              width="100%"
              height="100%"
              playing={"true"}
              autoPlay={false}
              muted={true}
              loop={true}
              controls={true}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

GsapAnimation.propTypes = {
  data: PropTypes.array,
};

export default GsapAnimation;
