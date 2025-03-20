import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import ReactFullpage from "@fullpage/react-fullpage";
import { alpha, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import React from "react";
import StickyBar from "../stickyBar";
import ImageMobile from "./imageMobile";


const LandingMobile = ({ data = [] }) => {
  const [open, setOpen] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [showAppBar, setShowAppBar] = React.useState(false);
  const fullpageRef = React.useRef();

  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        "& .fp-warning, .fp-watermark": {
          display: "none",
        },
      }}
    >
      <Box component="div" id="menu">
        <Slide appear={false} in={showAppBar}>
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
              data={data[0]?.PARENT?.CHILD[0]}
              HEADER_IMAGE={data?.[0]?.PARENT?.CHILD?.[1]?.image_path_portrait}
            />
          </Box>
        </Slide>
      </Box>

      <ReactFullpage
        licenseKey={""}
        beforeLeave={function (origin, destination, direction, trigger) {
          if (destination?.index >= 1) {
            setShowAppBar(true);
          } else if (direction == "up" && destination?.index == 1) {
            setShowAppBar(false);
          } else {
            setShowAppBar(false);
          }
        }}
        scrollingSpeed={1000}
        credits={{
          enabled: false,
          label: "",
          position: "unset",
        }}
        menu="#menu"
        bigSectionsDestination="top"
        interlockedSlides={true}
        offsetSections={true}
        cards={true}
        cardsOptions={{
          perspective: 100,
          fadeContent: true,
          fadeBackground: true,
        }}
        parallax={true}
        parallaxOptions={{
          type: "cover",
          percentage: 400,
          property: "translate",
        }}
        lazyLoading={true}
        ref={fullpageRef}
        render={(props) => {
          return (
            <ReactFullpage.Wrapper>
              <Box component="div" className="section">
                <Box component="div">
                  {/* <LandingPageSlider data={data} /> */}
                </Box>
              </Box>

              <Box
                component="section"
                className="section"
                sx={{
                  display: {
                    lg: "none",
                    md: "block",
                    sm: "block",
                    xs: "block",
                    xxs: "block",
                  },
                }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    width: "100%",
                    height: "100dvh",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    setOpen(true);
                    if (fullpageRef.current) {
                      fullpageRef.current.fullpageApi.setAllowScrolling(false);
                    }
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      display: {
                        lg: "none",
                        md: "flex",
                        sm: "flex",
                        xs: "flex",
                        xxs: "flex",
                      },
                      flexDirection: "column",
                      gap: "0px",
                      width: "100%",
                      alignItems: "center",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      background: (theme) =>
                        alpha(theme.palette.common.black, 0.4),
                      height: "100dvh",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      component="div"
                      variant="typography16"
                      dangerouslySetInnerHTML={{
                        __html: data[1]?.PARENT?.description,
                      }}
                      sx={(theme) => ({
                        "& h1": {
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          color: theme.palette.common.white,
                          textAlign: "center",
                          width: "100%",
                          ...theme.typography.typography32,
                          letterSpacing: 0.5,
                          fontWeight: 300,
                          padding: 1,
                        },
                      })}
                    ></Typography>
                    <Typography
                      component="div"
                      variant="typography16"
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.common.white,
                        textAlign: "center",
                        width: "max-content",
                        ...theme.typography.typography28,
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                        letterSpacing: 0.5,
                        fontWeight: 300,
                      })}
                    >
                      {data[1]?.PARENT?.link_title}
                    </Typography>
                  </Box>

                  <NextLazyLoadImage
                    src={data[1]?.PARENT?.image_path_portrait}
                    alt={data[1]?.PARENT?.image_path_portrait}
                    width={394}
                    height={642}
                    sx={{
                      width: "100%!important",
                      height: "100dvh!important",
                      objectFit: data[1]?.PARENT?.image_path_portrait
                        ? "cover!important"
                        : "contain!important",
                      display: {
                        lg: "none",
                        md: "block",
                        sm: "block",
                        xs: "block",
                        xxs: "block",
                      },
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={394}
                    downLgWidth={394}
                    downMdWidth={394}
                    downSmWidth={394}
                    downXsWidth={394}
                  />
                  <NextLazyLoadImage
                    src={data[1]?.PARENT?.image_path}
                    alt={data[1]?.PARENT?.image_path}
                    width={394}
                    height={642}
                    sx={{
                      width: "100%!important",
                      height: "100dvh!important",
                      objectFit: "cover!important",
                      display: {
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                        xxs: "none",
                      },
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={394}
                    downLgWidth={394}
                    downMdWidth={394}
                    downSmWidth={394}
                    downXsWidth={394}
                  />
                </Box>
              </Box>

              <Box
                component="section"
                className="section"
                sx={{
                  display: {
                    lg: "none",
                    md: "block",
                    sm: "block",
                    xs: "block",
                    xxs: "block",
                  },
                }}
              >
                <ImageMobile
                  data={data}
                  child={0}
                  bgColor="#be8064"
                  fullpageRef={fullpageRef}
                />
              </Box>
              <Box
                component="section"
                className="section"
                sx={{
                  display: {
                    lg: "none",
                    md: "block",
                    sm: "block",
                    xs: "block",
                    xxs: "block",
                  },
                }}
              >
                <ImageMobile
                  data={data}
                  child={1}
                  bgColor="#b4a690"
                  direction="row-reverse"
                  fullpageRef={fullpageRef}
                />
              </Box>
            </ReactFullpage.Wrapper>
          );
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          zIndex: 5,
          width: "100%",
          p: 2,
          backgroundColor: (theme) => theme.palette.common.black,
        }}
      >
        <Stack direction="row" spacing={3} justifyContent="space-around">
          {data?.length > 0 &&
            data[0]?.PARENT?.CHILD[4]?.SUB_CHILD?.map((icon, index) => {
              return (
                <Box key={`ICON_LANDING-${index}`}>
                  <CustomLink link={icon.link_url}>
                    <NextLazyLoadImage
                      src={icon?.image_path}
                      alt={icon?.image_path}
                      width={20}
                      height={20}
                      sx={{
                        width: "20px!important",
                        height: "100%!important",
                        objectFit: "cover!important",
                      }}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                      objectFit="contain"
                      upLgWidth={20}
                      downLgWidth={20}
                      downMdWidth={20}
                      downSmWidth={20}
                      downXsWidth={20}
                    />
                  </CustomLink>
                </Box>
              );
            })}
        </Stack>
      </Box>
      <Box
        sx={(theme) => ({
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
          [theme.breakpoints.down("md")]: {
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          },
        })}
      >
        <Box
          component="div"
          className="player-wrapper"
          sx={(theme) => ({
            ...(themeDirection === "rtl" && {
              direction: "ltr!important",
            }),
            width: "50%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            [theme.breakpoints.down("lg")]: {
              width: "100%",
            },
          })}
        >
          <Box
            onClick={() => {
              setOpen(false);
              if (fullpageRef.current) {
                fullpageRef.current.fullpageApi.setAllowScrolling(true);
              }
            }}
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
    </Box>
  );
};

LandingMobile.propTypes = {
  data: PropTypes.array,
};

export default LandingMobile;
