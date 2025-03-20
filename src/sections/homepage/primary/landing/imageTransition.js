import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import React from "react";

const ImageTransition = ({
  data = [],
  direction = "",
  child = 0,
  bgColor = "",
}) => {
  const { t: translate } = useTranslation();
  const [show, setShow] = React.useState(false);
  const getData =
    data?.[child]?.PARENT && data[child]?.PARENT ? data[child]?.PARENT : null;
  const maxLength = 1050;

  return (
    <>
      <Box
        sx={{
          color: (theme) => theme.palette.common.white,
        }}
      >
        <Grid container direction={direction}>
          <Grid item md={6}>
            <NextLazyLoadImage
              src={getData?.image_path}
              alt="Image"
              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
              objectFit="fill"
              width={400}
              height={600}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "fill!important",
              }}
              upLgWidth={1200}
              downLgWidth={1200}
              downMdWidth={1080}
              downSmWidth={640}
              downXsWidth={640}
            />
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              backgroundColor: bgColor,
              position: "relative",
              overflow: "hidden",
              height: "100vh",
              backgroundImage: "url(/assets/landingPage/landing.avif)",
              position: "relative",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "right",
              backgroundPositionY: "bottom",
              backgroundAttachment: "scroll",
            }}
          >
            <Box p={8} mt={10}>
              <Box>
                <Typography
                  component="div"
                  variant="typography18"
                  letterSpacing={1}
                  dangerouslySetInnerHTML={{
                    __html: getData?.title,
                  }}
                  sx={(theme) => ({
                    borderLeft: `2px solid ${theme.palette.primary.light}`,
                    pl: 2,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    textTransform: "uppercase",
                    "& h2": {
                      letterSpacing: 1,
                      ...theme.typography.typography31,
                      fontWeight: "normal",

                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      mb: 0,
                    },
                    "& p": {
                      ...theme.typography.typography18,
                      letterSpacing: 1,
                      fontWeight: 400,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      marginBlockStart: "8px!important",
                      marginBlockEnd: "8px!important",
                    },
                  })}
                />
              </Box>
              <Box mt={2}>
                <Typography
                  component="div"
                  variant="typography18"
                  sx={(theme) => ({
                    "& h2,h3": {
                      letterSpacing: 1,
                      ...theme.typography.typography32,
                      fontWeight: 200,
                      mt: 0,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      mb: 0,
                    },
                    "& p": {
                      ...theme.typography.typography17,
                      letterSpacing: 1,
                      fontWeight: 300,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      marginBlockStart: "8px!important",
                      marginBlockEnd: "0px!important",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "8",
                      WebkitBoxOrient: "vertical",
                    },
                  })}
                >
                  {parse(
                    typeof getData?.description === "string"
                      ? getData?.description.length > maxLength
                        ? getData?.description.slice(0, maxLength)
                        : getData?.description
                      : ""
                  )}
                  {getData?.description?.length > maxLength && (
                    <Typography
                      component="p"
                      variant="typography20"
                      onClick={() => setShow(!show)}
                      color="common.white"
                      display="inline-block"
                      sx={{
                        fontFamily: (theme) =>
                          theme.fontFaces.helveticaNeueMedium,
                        cursor: "pointer",
                        textDecoration: "underline",
                        ":after": {
                          content: "''",
                          display: "block",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      {translate("ReadMore")}
                    </Typography>
                  )}
                </Typography>
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
        onClose={() => setShow(false)}
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "right" }}>
          <IconButton
            size="small"
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => setShow(false)}
          >
            <Iconify icon="gridicons:cross" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Typography
            component="div"
            variant="typography18"
            sx={(theme) => ({
              "& h2,h3": {
                letterSpacing: 1,
                ...theme.typography.typography32,
                fontWeight: 200,
                mt: 0,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                mb: 0,
              },
              "& p": {
                ...theme.typography.typography17,
                letterSpacing: 1,
                fontWeight: 300,

                fontFamily: theme.fontFaces.helveticaNeueLight,
                marginBlockStart: "8px!important",
                marginBlockEnd: "0px!important",
              },
            })}
          >
            {parse(
              typeof getData?.description === "string"
                ? getData.description
                : ""
            )}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

ImageTransition.propTypes = {
  data: PropTypes.array,
  direction: PropTypes.string,
  child: PropTypes.number,
  bgColor: PropTypes.string,
};

export default ImageTransition;
