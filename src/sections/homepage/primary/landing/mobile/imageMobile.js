import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import React from "react";

const ImageMobile = ({
  data = [],
  direction = "row",
  child = 0,
  bgColor = "",
  fullpageRef,
}) => {
  const { t: translate } = useTranslation();
  const [show, setShow] = React.useState(false);
  const maxLength = 385;
  return (
    <>
      <Box
        sx={{
          color: (theme) => theme.palette.common.white,
          height: "100%!important",
        }}
      >
        <Grid container direction={direction} height="100dvh">
          <Grid item lg={6} md={12} sm={12} xs={12} xxs={12}>
            <NextLazyLoadImage
              src={data[2]?.PARENT?.CHILD?.[child]?.image_path}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover",
                backgroundSize: "cover",
              }}
              alt='Image'
              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
              objectFit="cover"
              width={500}
              height={400}
              upLgWidth={640}
              downLgWidth={640}
              downMdWidth={640}
              downSmWidth={640}
              downXsWidth={640}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            xxs={12}
            sx={{
              backgroundColor: bgColor,
              position: "relative",
              overflow: "hidden",
              backgroundImage: "url(/assets/landingPage/landing.avif)",
              position: "relative",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: 400,
              backgroundPositionY: "bottom",
              backgroundAttachment: "scroll",
            }}
          >
            <Box
              p={2}
              sx={{
                height: "auto",
                paddingBottom: "100px",
              }}
            >
              <Box>
                <Typography
                  component="div"
                  variant="typography18"
                  dangerouslySetInnerHTML={{
                    __html: data[2]?.PARENT?.CHILD?.[child]?.title,
                  }}
                  sx={(theme) => ({
                    borderLeft: `2px solid ${theme.palette.primary.light}`,
                    pl: 1,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    mb: 1,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    fontWeight: 200,
                    "& h2": {
                      letterSpacing: 0,
                      ...theme.typography.typography31,
                      letterSpacing: 0.5,
                      fontWeight: 200,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                    },
                    "& p": {
                      ...theme.typography.typography18,
                      letterSpacing: 0.5,
                      fontWeight: 200,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      marginBlockStart: "8px!important",
                      marginBlockEnd: "8px!important",
                    },
                  })}
                />
              </Box>
              <Box>
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html:
                      data[2]?.PARENT?.CHILD?.[child]?.description?.length >
                        maxLength
                        ? data[2]?.PARENT?.CHILD?.[child]?.description.slice(
                          0,
                          maxLength
                        )
                        : data[2]?.PARENT?.CHILD?.[child]?.description,
                  }}
                  sx={(theme) => ({
                    "& h2,h3": {
                      "& strong": {
                        fontWeight: 200,
                      },
                      ...theme.typography.typography22,
                      m: 0,
                      letterSpacing: 1,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      mb: 0,
                    },
                    "& p": {
                      ...theme.typography.typography14,
                      letterSpacing: 1,
                      fontWeight: 200,
                      fontFamily: theme.fontFaces.helveticaNeue,
                      marginBlockStart: "8px!important",
                      marginBlockEnd: "8px!important",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "5",
                      WebkitBoxOrient: "vertical",
                    },
                  })}
                />
                {data[2]?.PARENT?.CHILD?.[child]?.description?.length >
                  maxLength && (
                    <Typography
                      component="p"
                      variant="typography20"
                      onClick={() => {
                        setShow(!show);
                        if (fullpageRef.current) {
                          fullpageRef.current.fullpageApi.setAllowScrolling(
                            false
                          );
                        }
                      }}
                      color="common.white"
                      display="inline-block"
                      sx={{
                        fontFamily: (theme) =>
                          theme.fontFaces.helveticaNeueMedium,
                        cursor: "pointer",
                        ":after": {
                          content: "''",
                          display: "block",
                          borderBottom: "2px solid white",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      {translate("ReadMore")}
                    </Typography>
                  )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={show}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        onClose={() => {
          setShow(false);
          if (fullpageRef.current) {
            fullpageRef.current.fullpageApi.setAllowScrolling(true);
          }
        }}
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "right" }}>
          <IconButton
            size="small"
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => {
              setShow(false);
              if (fullpageRef.current) {
                fullpageRef.current.fullpageApi.setAllowScrolling(true);
              }
            }}
          >
            <Iconify icon="gridicons:cross" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: data[2]?.PARENT?.CHILD?.[child]?.description,
            }}
            sx={(theme) => ({
              "& h2,h3": {
                "& strong": {
                  fontWeight: 200,
                },
                ...theme.typography.typography22,
                m: 0,
                letterSpacing: 1,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                mb: 0,
              },
              "& p": {
                ...theme.typography.typography14,
                letterSpacing: 1,
                fontWeight: 200,
                fontFamily: theme.fontFaces.helveticaNeue,
                marginBlockStart: "8px!important",
                marginBlockEnd: "8px!important",
              },
            })}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

ImageMobile.propTypes = {
  data: PropTypes.array,
  direction: PropTypes.string,
  child: PropTypes.number,
  bgColor: PropTypes.string,
};

export default ImageMobile;
