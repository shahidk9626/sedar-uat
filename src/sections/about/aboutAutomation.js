import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify/Iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import { AboutGotoHomeAutomation } from "@/styles/about";
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

const AboutAutomation = ({ data = {}, isLanding = false }) => {
  const isMdDown = useResponsive("down", "md");
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const isSmallScreen = useResponsive("down", "sm");
  const [show, setShow] = React.useState(false);
  const getData =
    data?.PARENT?.CHILD && data?.PARENT?.CHILD?.length > 0
      ? data?.PARENT?.CHILD
      : data?.PARENT;
  const discription = getData?.[0]?.description || getData?.description;
  const maxLength = isLanding && isMdDown ? 195 : 500;
  return (
    <>
      <Box
        mt={isLanding ? 0 : 5}
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[7000],
          ...(isLanding && {
            height: { md: "auto", sm: "100dvh", xs: "100dvh", xxs: "100dvh" },
          }),
        })}
      >
        {data?.PARENT?.CHILD?.map((elem, index) => {
          return (
            <Box
              sx={(theme) => ({
                backgroundColor:
                  index % 2
                    ? theme.palette.grey[6900]
                    : theme.palette.grey[7000],
              })}
              component="div"
              key={`HOME_AUTOMATION-${index}`}
            >
              <Grid container>
                {index % 2 === 0 ? (
                  <>
                    <Grid
                      item
                      md={6}
                      sm={12}
                      xs={12}
                      xxs={12}
                      sx={{
                        ...(themeDirection === "ltr"
                          ? {
                            position: "relative",
                            overflow: "hidden",
                            backgroundImage:
                              index % 2
                                ? "url(/assets/landingPage/landing.avif)"
                                : "url(/assets/landingPage/landingLeft.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionX: index % 2 ? "right" : "left",
                            backgroundPositionY: "bottom",
                            backgroundAttachment: "scroll",
                          }
                          : {
                            position: "relative",
                            overflow: "hidden",
                            backgroundImage:
                              index % 2
                                ? "url(/assets/landingPage/landing.avif)"
                                : "url(/assets/landingPage/landingLeft.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionX: index % 2 ? "left" : "right",
                            backgroundPositionY: "bottom",
                            backgroundAttachment: "scroll",
                          }),
                      }}
                    >
                      <Box
                        width="100%"
                        sx={{
                          mt: 4,
                          p: 4,
                        }}
                      >
                        <Box mb={4}>
                          <Typography
                            component="p"
                            variant="typography24"
                            lineHeight={"19px"}
                            fontWeight={500}
                            color={(theme) => theme.palette.common.white}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueMedium
                            }
                            sx={(theme) => ({
                              borderLeft: `2px solid ${theme.palette.primary.light}`,
                              px: 2,
                              textTransform: "uppercase",
                            })}
                          >
                            {elem?.title}
                          </Typography>
                        </Box>
                        <Box mb={6}>
                          <Typography
                            component="div"
                            variant="typography18"
                            sx={(theme) => ({
                              "& h1,h2,h3": {
                                letterSpacing: 1,
                                ...theme.typography.typography32,
                                fontWeight: 200,
                                mt: 0,
                                fontFamily: theme.fontFaces.helveticaNeueMedium,
                                mb: 0,
                                color: theme.palette.common.white,
                              },
                              "& p": {
                                fontSize: 18,
                                lineHeight: 1.8,
                                letterSpacing: 1,
                                fontWeight: 300,
                                fontFamily: theme.fontFaces.helveticaNeueLight,
                                marginBlockStart: 4,
                                marginBlockEnd: "0px!important",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "9",
                                WebkitBoxOrient: "vertical",
                                color: theme.palette.common.white,
                              },
                            })}
                          >
                            {parse(
                              typeof getData?.[0]?.description === "string"
                                ? getData?.[0]?.description.length > maxLength
                                  ? getData?.[0]?.description.slice(
                                    0,
                                    maxLength
                                  )
                                  : getData?.[0]?.description
                                : ""
                            )}
                            {getData?.[0]?.description?.length > maxLength && (
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
                        {elem?.link_title != null && (
                          <Box>
                            <CustomLink link={elem?.link_url}>
                              <AboutGotoHomeAutomation
                                fontSize={18}
                                component="span"
                              >
                                {elem?.link_title}
                              </AboutGotoHomeAutomation>
                            </CustomLink>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} xxs={12}>
                      <NextLazyLoadImage
                        src={elem?.image_path}
                        alt="cdsaas"
                        width={1000}
                        height={563}
                        placeholder="blur"
                        loading="eager"
                        sx={{
                          objectFit: "contain!important",
                          borderRadius: 0,
                          boxShadow: "none",
                          position: "relative!important",
                          width: "100%!important",
                          height: "100%!important",
                        }}
                        upLgWidth={1000}
                        downLgWidth={1000}
                        downMdWidth={1000}
                        downSmWidth={830}
                        downXsWidth={562}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    {isSmallScreen ? (
                      <>
                        <Grid item md={6} sm={12} xs={12} xxs={12} mt={4}>
                          <Box
                            sx={{
                              px: { md: 8, sm: 4, xs: 4, xxs: 4 },
                              pb: { md: 0, sm: 4, xs: 4, xxs: 4 },
                              ...(themeDirection === "ltr"
                                ? {
                                  position: "relative",
                                  overflow: "hidden",
                                  backgroundImage:
                                    index % 2
                                      ? "url(/assets/landingPage/landing.avif)"
                                      : "url(/assets/landingPage/landingLeft.png)",
                                  backgroundRepeat: "no-repeat",
                                  backgroundPositionX:
                                    index % 2 ? "right" : "right",
                                  backgroundPositionY: "bottom",
                                  backgroundAttachment: "scroll",
                                }
                                : {
                                  position: "relative",
                                  overflow: "hidden",
                                  backgroundImage:
                                    index % 2
                                      ? "url(/assets/landingPage/landing.avif)"
                                      : "url(/assets/landingPage/landingLeft.png)",
                                  backgroundRepeat: "no-repeat",
                                  backgroundPositionX:
                                    index % 2 ? "left" : "right",
                                  backgroundPositionY: "bottom",
                                  backgroundAttachment: "scroll",
                                }),
                            }}
                          >
                            <Box mb={2}>
                              <Typography
                                component="div"
                                fontSize={16}
                                fontWeight={500}
                                fontFamily={(theme) =>
                                  theme.fontFaces.helveticaNeueMedium
                                }
                                sx={(theme) => ({
                                  borderLeft: `2px solid ${theme.palette.primary.light}`,
                                  px: { md: 4, sm: 2, xs: 2, xxs: 2 },
                                  textTransform: "uppercase",
                                  color: theme.palette.common.white,
                                })}
                              >
                                {elem?.title}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                component="div"
                                variant="typography18"
                                sx={(theme) => ({
                                  "& h1,h2,h3": {
                                    letterSpacing: 1,
                                    ...theme.typography.typography32,
                                    fontWeight: 200,
                                    mt: 0,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    mb: 0,
                                    color: theme.palette.common.white,
                                  },
                                  "& p": {
                                    fontSize: 18,
                                    letterSpacing: 1,
                                    fontWeight: 300,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueLight,
                                    marginBlockStart: "8px!important",
                                    marginBlockEnd: "0px!important",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "9",
                                    WebkitBoxOrient: "vertical",
                                    color: theme.palette.common.white,
                                  },
                                })}
                              >
                                {parse(
                                  typeof getData?.[1]?.description === "string"
                                    ? getData?.[1]?.description.length >
                                      maxLength
                                      ? getData?.[1]?.description.slice(
                                        0,
                                        maxLength
                                      )
                                      : getData?.[1]?.description
                                    : ""
                                )}
                                {getData?.[1]?.description?.length >
                                  maxLength && (
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
                            {elem?.link_title != null && (
                              <Box pl={4} mt={4}>
                                <CustomLink link={elem?.link_url}>
                                  <AboutGotoHomeAutomation
                                    fontSize={18}
                                    component="span"
                                  >
                                    {elem?.link_title}
                                  </AboutGotoHomeAutomation>
                                </CustomLink>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} xxs={12}>
                          <NextLazyLoadImage
                            src={elem?.image_path}
                            alt="cdsaas"
                            width={1000}
                            height={563}
                            placeholder="blur"
                            loading="eager"
                            sx={{
                              objectFit: "contain!important",
                              borderRadius: 0,
                              boxShadow: "none",
                              position: "relative!important",
                              width: "100%!important",
                              height: "100%!important",
                            }}
                            upLgWidth={1000}
                            downLgWidth={1000}
                            downMdWidth={1000}
                            downSmWidth={830}
                            downXsWidth={562}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item md={6} sm={12} xs={12} xxs={12}>
                          <NextLazyLoadImage
                            src={elem?.image_path}
                            alt="cdsaas"
                            width={634}
                            height={563}
                            placeholder="blur"
                            loading="eager"
                            sx={{
                              objectFit: "contain!important",
                              borderRadius: 0,
                              boxShadow: "none",
                              position: "relative!important",
                              width: "100%!important",
                              height: "100%!important",
                            }}
                            upLgWidth={634}
                            downLgWidth={634}
                            downMdWidth={634}
                            downSmWidth={830}
                            downXsWidth={562}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          sm={12}
                          xs={12}
                          xxs={12}
                          sx={{
                            ...(themeDirection === "ltr"
                              ? {
                                position: "relative",
                                overflow: "hidden",
                                backgroundImage:
                                  index % 2
                                    ? "url(/assets/landingPage/landing.avif)"
                                    : "url(/assets/landingPage/landingLeft.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundPositionX:
                                  index % 2 ? "right" : "left",
                                backgroundPositionY: "bottom",
                                backgroundAttachment: "scroll",
                              }
                              : {
                                position: "relative",
                                overflow: "hidden",
                                backgroundImage:
                                  index % 2
                                    ? "url(/assets/landingPage/landing.avif)"
                                    : "url(/assets/landingPage/landingLeft.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundPositionX:
                                  index % 2 ? "left" : "right",
                                backgroundPositionY: "bottom",
                                backgroundAttachment: "scroll",
                              }),
                          }}
                        >
                          <Box
                            component="div"
                            p={4}
                          >
                            <Box mb={4}>
                              <Typography
                                component="h5"
                                fontSize={16}
                                lineHeight={"19px"}
                                fontWeight={500}
                                fontFamily={(theme) =>
                                  theme.fontFaces.helveticaNeueMedium
                                }
                                sx={(theme) => ({
                                  borderLeft: `2px solid ${theme.palette.primary.light}`,
                                  px: 2,
                                  textTransform: "uppercase",
                                  color: theme.palette.common.white,
                                })}
                              >
                                {elem?.title}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                component="div"
                                variant="typography18"
                                sx={(theme) => ({
                                  "& h1,h2,h3": {
                                    letterSpacing: 1,
                                    ...theme.typography.typography32,
                                    fontWeight: 200,
                                    mt: 0,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    mb: 0,
                                    color: theme.palette.common.white,
                                  },
                                  "& p": {
                                    fontSize: 18,
                                    letterSpacing: 1,
                                    lineHeight: 1.8,
                                    fontWeight: 300,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueLight,
                                    marginBlockStart: 4,
                                    marginBlockEnd: "0px!important",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "9",
                                    WebkitBoxOrient: "vertical",
                                    color: theme.palette.common.white,
                                  },
                                })}
                              >
                                {parse(
                                  typeof getData?.[1]?.description === "string"
                                    ? getData?.[1]?.description.length >
                                      maxLength
                                      ? `${getData?.[1]?.description.slice(
                                        0,
                                        maxLength
                                      )}...`
                                      : getData?.[1]?.description
                                    : ""
                                )}
                                {getData?.[1]?.description?.length >
                                  maxLength && (
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
                            {elem?.link_title != null && (
                              <Box pl={4} mt={4}>
                                <CustomLink link={elem?.link_url}>
                                  <AboutGotoHomeAutomation
                                    fontSize={18}
                                    component="span"
                                  >
                                    {elem?.link_title}
                                  </AboutGotoHomeAutomation>
                                </CustomLink>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Box>
          );
        })}
        {!data?.PARENT?.CHILD && (
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[7000],
              pt: isLanding ? 10 : 0,
            })}
            component="div"
          >
            <Grid container>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                xxs={12}
                sx={{
                  ...(themeDirection === "ltr"
                    ? {
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage:
                        "url(/assets/landingPage/landingLeft.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundPositionX: "left",
                      backgroundPositionY: "bottom",
                      backgroundAttachment: "scroll",
                    }
                    : {
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage:
                        "url(/assets/landingPage/landingLeft.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundPositionX: "right",
                      backgroundPositionY: "bottom",
                      backgroundAttachment: "scroll",
                    }),
                }}
              >
                <Box
                  width="100%"
                  sx={{
                    mt: 2,
                    p: 2,
                    pt: isLanding ? 0 : 4,
                  }}
                >
                  <Box mb={2}>
                    <Typography
                      component="p"
                      variant="typography24"
                      lineHeight={"19px"}
                      fontWeight={500}
                      color={(theme) => theme.palette.common.white}
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      sx={(theme) => ({
                        borderLeft: `2px solid ${theme.palette.primary.light}`,
                        px: 2,
                        textTransform: "uppercase",
                      })}
                    >
                      {getData?.title}
                    </Typography>
                  </Box>
                  <Box mb={isLanding ? 0 : 6}>
                    <Typography
                      component="div"
                      variant="typography18"
                      sx={(theme) => ({
                        "& h1,h2,h3": {
                          letterSpacing: 1,
                          ...theme.typography.typography32,
                          fontWeight: 200,
                          mt: 0,
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          mb: 0,
                          color: theme.palette.common.white,
                        },
                        "& p": {
                          fontSize: 18,
                          letterSpacing: 1,
                          fontWeight: 300,
                          fontFamily: theme.fontFaces.helveticaNeueLight,
                          marginBlockEnd: "0px!important",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "9",
                          WebkitBoxOrient: "vertical",
                          color: theme.palette.common.white,
                          marginBlockStart: isLanding ? 0 : 4,
                        },
                      })}
                    >
                      {parse(
                        typeof getData?.description === "string"
                          ? getData?.description.length > maxLength
                            ? `${getData?.description.slice(0, maxLength)}...`
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
                  {getData?.link_title != null && (
                    <Box>
                      <CustomLink link={getData?.link_url}>
                        <AboutGotoHomeAutomation fontSize={18} component="span">
                          {getData?.link_title}
                        </AboutGotoHomeAutomation>
                      </CustomLink>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <NextLazyLoadImage
                  src={getData?.image_path}
                  alt="cdsaas"
                  width={1000}
                  height={563}
                  placeholder="blur"
                  loading="eager"
                  sx={{
                    objectFit: isLanding
                      ? "cover!important"
                      : "contain!important",
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative!important",
                    width: "100%!important",
                    height: {
                      md: "100%!important",
                      sm: isLanding ? "200px!important" : "100%!important",
                      xs: isLanding ? "200px!important" : "100%!important",
                      xxs: isLanding ? "200px!important" : "100%!important",
                    },
                  }}
                  upLgWidth={1000}
                  downLgWidth={1000}
                  downMdWidth={1000}
                  downSmWidth={830}
                  downXsWidth={562}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                />
              </Grid>
            </Grid>
          </Box>
        )}
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
            {parse(typeof discription === "string" ? discription : "")}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

AboutAutomation.propTypes = {
  data: PropTypes.object,
};

export default React.memo(AboutAutomation);
