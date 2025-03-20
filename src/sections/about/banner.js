import useResponsive from "@/hooks/useResponsive";
import { alpha } from "@mui/material";
import { IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import VideoDilogue from "./videoDilogue";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";

const AboutBanner = ({
  data = {},
  onResumeScroll = () => { },
  onPauseScroll = () => { },
  isLanding = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const isDownMd = useResponsive("down", "md");
  const isUpMd = useResponsive("up", "md");

  return (
    <>
      <Box
        component="div"
      >
        {(isUpMd || !isLanding) && (
          <Box
            onClick={() => {
              setOpen(true);
              if (onPauseScroll) {
                onPauseScroll();
              }
            }}
            id="SliderToTop"
          >
            <NextLazyLoadImage
              src={data?.PARENT?.image_path}
              alt="cdsaas"
              width="1920"
              height="562"
              placeholder="blur"
              loading="eager"
              sx={{
                width: "100%!important",
                height: isLanding ? "100vh!important" : "100%!important",
                objectFit: "cover!important",
                backgroundSize: "cover!important",
                "&:hover": { cursor: "pointer" },
              }}
              upLgWidth={1920}
              downLgWidth={1920}
              downMdWidth={1920}
              downSmWidth={747}
              downXsWidth={578}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
            />
          </Box>
        )}
        {(isDownMd && isLanding) &&
          <Box
            sx={{
              cursor: "pointer",
              position: "relative",
              width: "100%",
              height: "100dvh",
              overflow: "hidden",
            }}
            onClick={() => setOpen(true)}
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
                gap: "10px",
                width: "100%",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: (theme) => alpha(theme.palette.common.black, 0.4),
                height: "100%",
                justifyContent: "center",
                padding: 2,
              }}
            >
              {/* Description */}
              <Typography
                component="div"
                variant="typography16"
                dangerouslySetInnerHTML={{
                  __html: data?.PARENT?.description,
                }}
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  color: theme.palette.common.white,
                  textAlign: "center",
                  width: "100%",
                  ...theme.typography.typography32,
                  letterSpacing: 0.5,
                  fontWeight: 300,
                  padding: 1,
                })}
              ></Typography>

              {/* Link Title */}
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
                {data?.PARENT?.link_title}
              </Typography>

              {/* Video Play Button BELOW description */}
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: (theme) => alpha(theme.palette.common.black, 0.5),
                  backdropFilter: "blur(5px)",
                }}
              >
                <IconButton sx={{ color: "white", fontSize: "3rem" }}>
                  <PlayArrow fontSize="large" />
                </IconButton>
              </Box>
            </Box>

            <NextLazyLoadImage
              src={data?.PARENT?.image_path_portrait}
              alt={data?.PARENT?.image_path_portrait}
              width={394}
              height={642}
              sx={{
                width: "100%!important",
                height: "100vh!important",
                objectFit: data?.PARENT?.image_path_portrait
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
              src={data?.PARENT?.image_path}
              alt={data?.PARENT?.image_path}
              width={394}
              height={642}
              sx={{
                width: "100%!important",
                height: "100vh!important",
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
        }
        <VideoDilogue
          setOpen={setOpen}
          open={open}
          onResumeScroll={onResumeScroll}
          video={
            data?.PARENT?.CHILD?.[0]?.image_path
              ? data?.PARENT?.CHILD?.[0]?.image_path
              : data?.PARENT?.image_path
          }
        />
      </Box>
    </>
  );
};

AboutBanner.propTypes = {
  data: PropTypes.object,
};

export default React.memo(AboutBanner);
