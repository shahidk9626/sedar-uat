import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import useResponsive from "@/hooks/useResponsive";
import { AboutDescription } from "@/styles/about";
import parse from "html-react-parser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "next-i18next";

const AboutInfo = ({
  data = {},
  isLanding,
  onResumeScroll = () => {},
  onPauseScroll = () => {},
}) => {
  const isMdDown = useResponsive("down", "md");
  const { t: translate } = useTranslation();
  const [show, setShow] = React.useState(false);
  const getData = data?.PARENT && data?.PARENT ? data?.PARENT : null;
  const maxLength = isLanding && isMdDown ? 185 : 600;
  return (
    <>
      <Box
        component="div"
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.lightPink,
          ...(isLanding && {
            height: { md: "auto", sm: "100dvh", xs: "100dvh", xxs: "100dvh" },
          }),
        }}
        pt={{
          md: isLanding ? 12 : 8,
          sm: isLanding ? 14 : 8,
          xs: isLanding ? 12 : 8,
          xxs: isLanding ? 12 : 8,
        }}
        pb={isLanding ? 10 : 0}
      >
        <Container
          maxWidth="xl"
          sx={{
            ...(isLanding && {
              height: "100%",
            }),
          }}
        >
          <Box
            mb={1}
            sx={{
              pl: 4,
              borderLeft: (theme) => `2px solid ${theme.palette.primary.light}`,
            }}
          >
            <Typography
              component="h1"
              variant="typography44"
              lineHeight={{
                lg: "53px",
                md: "53px",
                sm: "33px",
                xs: "33px",
                xxs: "33px",
              }}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              color={(theme) => theme.palette.common.black}
            >
              {data?.PARENT?.title}
            </Typography>
          </Box>
          <Grid
            rowSpacing={isLanding ? 2 : 0}
            container
            justifyContent="center"
            direction={{
              lg: "row",
              md: "row",
              sm: "column-reverse",
              xs: "column-reverse",
              xxs: "column-reverse",
            }}
          >
            <Grid item md={5} sm={12} xs={12} xxs={12}>
              <Box
                sx={{
                  mt: { lg: 2, md: 2, sm: 6, xs: 6, xxs: 6 },
                  my: { lg: 2, md: 2, sm: 0, xs: 0, xxs: 0 },
                  ...(isLanding && {
                    mt: 0,
                    my: 0,
                  }),
                }}
              >
                <NextLazyLoadImage
                  src={data?.PARENT?.image_path}
                  alt="cdsaas"
                  width="509"
                  height="519"
                  placeholder="blur"
                  loading="eager"
                  sx={{
                    width: "100%!important",
                    height: {
                      md: "100%!important",
                      sm: isLanding ? "280px!important" : "100%!important",
                      xs: isLanding ? "280px!important" : "100%!important",
                      xxs: isLanding ? "280px!important" : "100%!important",
                    },
                    objectFit: "cover!important",
                  }}
                  upLgWidth={1200}
                  downLgWidth={1200}
                  downMdWidth={464}
                  downSmWidth={826}
                  downXsWidth={522}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                />
              </Box>
            </Grid>
            <Grid item md={7} sm={12} xs={12} xxs={12}>
              <Box sx={{ px: { md: 7, sm: 4, xs: 1 } }}>
                <Box>
                  <AboutDescription
                    component="div"
                    pb={1}
                    lineHeight={1.5}
                    fontSize={18}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                    sx={{
                      "& p": {
                        marginBlockStart: "0px !important",
                        marginBlockEnd: "0px !important",
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof getData?.description === "string"
                          ? getData?.description.length > maxLength
                            ? `${getData?.description.slice(0, maxLength)}...`
                            : getData?.description
                          : "",
                    }}
                  />

                  {getData?.description?.length > maxLength && (
                    <Typography
                      component="span"
                      variant="typography16"
                      onClick={() => {
                        setShow(!show);
                        if (isLanding) {
                          onPauseScroll();
                        }
                      }}
                      display="inline-block"
                      sx={{
                        fontFamily: (theme) =>
                          theme.fontFaces.helveticaNeueMedium,
                        cursor: "pointer",
                        textDecoration: "underline",
                        letterSpacing: 0.5,
                        color: (theme) => theme.palette.primary.main,
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
                </Box>
                {data?.PARENT?.link_title && (
                  <Box
                    mt={isLanding ? 0 : { lg: 6, md: 6, sm: 5, xs: 5, xxs: 5 }}
                    mb={isLanding ? 0 : { lg: 6, md: 6, sm: 5, xs: 5, xxs: 5 }}
                    sx={{
                      justifyContent: {
                        md: "left",
                        sm: "center",
                        xs: "center",
                        xxs: "center",
                      },
                      display: "flex",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      LinkComponent={NextLink}
                      sx={{
                        width: {
                          lg: "40%",
                          md: "40%",
                          sm: "100%",
                          xs: "100%",
                          xxs: "100%",
                        },
                        ":hover": {
                          color: "common.white",
                        },
                        py: 1.5,
                        borderRadius: "0px",
                        fontSize: "15px",
                        fontFamily: (theme) =>
                          theme.fontFaces.helveticaNeueBold,
                        color: "common.black",
                      }}
                      href="/contact"
                    >
                      {translate(data?.PARENT?.link_title)}
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog
        open={show}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        onClose={() => {
          setShow(false);
          if (isLanding) {
            onResumeScroll();
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
              if (isLanding) {
                onResumeScroll();
              }
            }}
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
                ? getData?.description
                : ""
            )}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

AboutInfo.propTypes = {
  data: PropTypes.object,
};

export default React.memo(AboutInfo);
