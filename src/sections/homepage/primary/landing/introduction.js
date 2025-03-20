import { NextFillImage } from "@/components/image";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import { Helvetica_Neue_Medium } from "@/theme/typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link } from '@mui/material';
import React,{useMemo} from "react";
const Introduction = ({ data = [], findLastObject = {}, swiperInstance }) => {
  const getData =
    data?.CHILD && data?.CHILD?.length > 0
      ? data?.CHILD
      : null;
    console.log('getdata',data);
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#watch-video"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Grid container sx={{ height: "100dvh" }} columnSpacing={2}>
        <Grid item md={3.5} sm={12} xs={12} xxs={12}>
          <Box
            sx={{
              backgroundColor: "#0000007d",
              p: "1.5em",
              height: "100%",
            }}
          >
            <Stack spacing={5}>
              <Box>
                <NextLazyLoadImage
                  width={120}
                  height={60}
                  sx={{
                    width: "128px!important",
                    height: "100%!important",
                    objectFit: "contain!important",
                  }}
                  upLgWidth={400}
                  downLgWidth={400}
                  downMdWidth={400}
                  downSmWidth={400}
                  downXsWidth={400}
                  alt={getData?.[1]?.image_path}
                  sizes="(min-width: 0px) and (max-width: 1920px) 40vw"
                  objectFit="contain"
                  src={getData?.[1]?.image_path}
                />
              </Box>

              <Box component="div">
                <Typography
                  component="h1"
                  variant="typography70"
                  fontFamily={Helvetica_Neue_Medium.style.fontFamily}
                  fontWeight="normal"
                  sx={(theme) => ({
                    letterSpacing: "2px",
                    wordWrap: "break-word",
                    color: theme.palette.common.white,
                    fontWeight: "normal",
                  })}
                >
                  {getData?.[1]?.title || "N/A"}
                </Typography>
              </Box>
              <Box
                component="div"
                dangerouslySetInnerHTML={{
                  __html: getData?.[1]?.description || "",
                }}
                sx={(theme) => ({
                  "& h2": {
                    ...theme.typography.typography39,
                    color: (theme) => theme.palette.common.white,
                    letterSpacing: 1,
                    fontFamily: (theme) => theme.fontFaces.helveticaNeueLight,
                    marginBlockStart: "0px!important",
                    marginBlockEnd: "0px!important",
                  },
                })}
              />
            </Stack>
            <Box sx={{ position: "absolute", bottom: 30 }}>

              <Stack direction="row" spacing={3}>
                {getData?.[4]?.SUB_CHILD?.map((icon, index) => {
                  return (
                    <Box key={`ICON_LANDING-${index}`}>
                      <CustomLink link={icon.link_url} target="_blank">
                        <NextFillImage
                          src={icon?.image_path}
                          sx={{
                            width: "100%!important",
                            height: "100%!important",
                            objectFit: "contain",
                            backgroundSize: "contain",
                            "&.MuiCard-root": {
                              borderRadius: 0,
                              boxShadow: "none",
                              position: "relative!important",
                              width: "20px!important",
                              height: "100%!important",
                            },
                          }}
                          alt={icon?.image_path}
                          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          objectFit="contain"
                        />
                      </CustomLink>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item md={8.5} sm={12} xs={12} xxs={12}>

          <Stack height="100dvh" justifyContent="space-between">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="end"
              p={2}
              height="10%"
              mt={3}
            >
              {
                getData &&
                getData?.[0]?.SUB_CHILD &&
                getData?.[0]?.SUB_CHILD?.length > 0 &&
                getData?.[0]?.SUB_CHILD?.map((item, index) => {
                  return (
                    <Stack
                      key={`${item?.title}-${index}`}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <NextFillImage
                        src={item?.image_path}
                        className="without_hover"
                        sx={{
                          "&.MuiCard-root": {
                            borderRadius: 0,
                            boxShadow: "none",
                            position: "relative!important",
                            width: "15px!important",
                            height: "15px!important",
                          },
                        }}
                        alt='Image'
                      />
                      <Box
                        component="a"
                        href={item?.link_url}
                        sx={{ textDecoration: "none", color: "common.black" }}
                      >
                        <Typography
                          fontFamily={(theme) =>
                            theme.fontFaces.helveticaNeueMedium
                          }
                          component="div"
                        >
                          {item?.title}
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })}
            </Stack>

            <Box pb={12}>
              <Grid container spacing={2} sx={{ height: "max-content",marginLeft:"-23px!important" }}>
                <Grid item md={12}>
                  <Grid container spacing={2} pl={0}>
                    {getData?.[3]?.SUB_CHILD?.map(
                      (elem, index) => {
                        // if (findLastObject != elem) {
                          return (
                            <Grid item md={3} key={index}>
                              <CustomLink
                                link={
                                  elem?.GRAND_CHILD &&
                                    elem?.GRAND_CHILD?.length > 0 &&
                                    elem?.GRAND_CHILD?.[1]?.link_url
                                    ? elem?.GRAND_CHILD?.[1]?.link_url
                                    : "#"
                                }
                                sx={{
                                  ":focus": {
                                    "& .MuiCard-root": {
                                      backgroundColor: (theme) =>
                                        theme.palette.primary.light,
                                      "& .without_hover ": {
                                        display: "none",
                                      },

                                      "& .with_hover ": {
                                        display: "block",
                                      },
                                    },
                                  },
                                  ":focus-within": {
                                    "& .MuiCard-root": {
                                      backgroundColor: (theme) =>
                                        theme.palette.primary.light,
                                      "& .without_hover ": {
                                        display: "none",
                                      },

                                      "& .with_hover ": {
                                        display: "block",
                                      },
                                    },
                                  },
                                  ":hover": {
                                    "& .MuiCard-root": {
                                      backgroundColor: (theme) =>
                                        theme.palette.primary.light,
                                      "& .without_hover ": {
                                        display: "none",
                                      },

                                      "& .with_hover ": {
                                        display: "block",
                                      },
                                    },
                                  },
                                }}
                              >
                                <Card
                                  component="div"
                                  sx={(theme) => ({
                                    borderRadius: "0px",
                                    height: "100%",
                                    cursor: "pointer",
                                    "& .with_hover ": {
                                      display: "none",
                                    },
                                    ":hover": {
                                      "&.MuiCard-root": {
                                        backgroundColor: (theme) =>
                                          theme.palette.primary.light,
                                        "& .without_hover ": {
                                          display: "none",
                                        },

                                        "& .with_hover ": {
                                          display: "block",
                                        },
                                      },
                                    },
                                  })}
                                >
                                  <Box px={1} py={2}>
                                    <Stack
                                      direction="row"
                                      spacing={2}
                                      justifyContent="space-between"
                                      alignItems="center"
                                      sx={{ height: "100%!important" }}
                                    >
                                      <Box>
                                        <NextLazyLoadImage
                                          className="without_hover"
                                          src={elem.image_path}
                                          sx={{
                                            borderRadius: 0,
                                            boxShadow: "none",
                                            position: "relative!important",
                                            width: "50px!important",
                                            height: "50px!important",
                                          }}
                                          width={50}
                                          height={50}
                                          upLgWidth={100}
                                          downLgWidth={100}
                                          downMdWidth={100}
                                          downSmWidth={100}
                                          downXsWidth={100}
                                          alt={getData?.[0]?.image_path}
                                          sizes="(min-width: 0px) and (max-width: 1920px) 40vw"
                                          objectFit="contain"
                                        />
                                        <NextLazyLoadImage
                                          className="with_hover"
                                          src={elem.image_path_portrait}
                                          sx={{
                                            borderRadius: 0,
                                            boxShadow: "none",
                                            position: "relative!important",
                                            width: "50px!important",
                                            height: "50px!important",
                                          }}
                                          width={50}
                                          height={50}
                                          upLgWidth={100}
                                          downLgWidth={100}
                                          downMdWidth={100}
                                          downSmWidth={100}
                                          downXsWidth={100}
                                          alt={getData?.[0]?.image_path}
                                          sizes="(min-width: 0px) and (max-width: 1920px) 40vw"
                                          objectFit="contain"
                                        />
                                      </Box>
                                      <Stack
                                        direction="column"
                                        spacing={1}
                                        alignItems="center"
                                      >
                                        <Box>
                                          <CustomLink
                                            link={
                                              elem?.GRAND_CHILD &&
                                                elem?.GRAND_CHILD?.length > 0 &&
                                                elem?.GRAND_CHILD?.[1]?.link_url
                                                ? elem?.GRAND_CHILD?.[0]
                                                  ?.link_url
                                                : "#"
                                            }
                                          >
                                            <Typography
                                              sx={(theme) => ({
                                                color: (theme) =>
                                                  theme.palette.common.black,
                                                ":hover": {
                                                  color: (theme) =>
                                                    theme.palette.common.white,
                                                },
                                                ...theme.typography
                                                  .typography18,
                                                fontWeight: 800,
                                                fontFamily:
                                                  theme.fontFaces
                                                    .helveticaNeueLightArabic,
                                                mb: 0,
                                              })}
                                            >
                                              {elem?.GRAND_CHILD &&
                                                elem?.GRAND_CHILD?.length > 0 &&
                                                elem?.GRAND_CHILD?.[0]
                                                  ?.link_title}
                                            </Typography>
                                          </CustomLink>
                                        </Box>
                                        <Box>
                                          <CustomLink
                                            link={
                                              elem?.GRAND_CHILD &&
                                                elem?.GRAND_CHILD?.length > 0 &&
                                                elem?.GRAND_CHILD?.[1]?.link_url
                                                ? elem?.GRAND_CHILD?.[1]
                                                  ?.link_url
                                                : "#"
                                            }
                                          >
                                            <Typography
                                              sx={(theme) => ({
                                                color: (theme) =>
                                                  theme.palette.common.black,
                                                ":hover": {
                                                  color: (theme) =>
                                                    theme.palette.common.white,
                                                },
                                                letterSpacing: 0,
                                                ...theme.typography
                                                  .typography18,
                                                fontWeight: "normal",
                                                fontFamily:
                                                  theme.fontFaces
                                                    .helveticaNeueMedium,
                                                mb: 0,
                                              })}
                                            >
                                              {elem?.GRAND_CHILD &&
                                                elem?.GRAND_CHILD?.length > 0 &&
                                                elem?.GRAND_CHILD?.[1]
                                                  ?.link_title}
                                            </Typography>
                                          </CustomLink>
                                        </Box>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                </Card>
                              </CustomLink>
                            </Grid>
                          );
                        // }
                      }
                    )}
                  </Grid>
                </Grid>
                {/* <Grid item md={3}> */}
                  {/* <CustomLink
                    link={
                      findLastObject?.GRAND_CHILD &&
                        findLastObject?.GRAND_CHILD?.length > 0 &&
                        findLastObject?.GRAND_CHILD?.[1]?.link_url
                        ? findLastObject?.GRAND_CHILD?.[1]?.link_url
                        : "#"
                    }
                    sx={{
                      ":focus": {
                        "& .MuiCard-root": {
                          height: "100%",
                          backgroundColor: (theme) =>
                            theme.palette.primary.light,
                          "& .without_hover ": {
                            display: "none",
                          },

                          "& .with_hover ": {
                            display: "block",
                          },
                        },
                      },
                      ":focus-within": {
                        "& .MuiCard-root": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.light,
                          "& .without_hover ": {
                            display: "none",
                          },

                          "& .with_hover ": {
                            display: "block",
                          },
                        },
                      },
                      ":hover": {
                        "& .MuiCard-root": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.light,
                          "& .without_hover ": {
                            display: "none",
                          },

                          "& .with_hover ": {
                            display: "block",
                          },
                        },
                      },
                    }}
                  >
                    <Card
                      component="div"
                      sx={{
                        cursor: "pointer",
                        borderRadius: "0px",
                        height: "100%",
                        mr: 2,
                        backgroundColor: (theme) => theme.palette.grey[1100],
                        "& .with_hover ": {
                          display: "none",
                        },
                        ":hover": {
                          "&.MuiCard-root": {
                            backgroundColor: (theme) =>
                              theme.palette.primary.light,
                            "& .without_hover ": {
                              display: "none",
                            },

                            "& .with_hover ": {
                              display: "block",
                            },
                            "& .MuiLink-root p": {
                              color: (theme) => theme.palette.common.black,
                            },
                          },
                        },
                        "&:focus": {
                          "& .MuiCard-root": {
                            backgroundColor: (theme) =>
                              theme.palette.primary.light,
                            "& .without_hover ": {
                              display: "none",
                            },

                            "& .with_hover ": {
                              display: "block",
                            },
                            "& .MuiLink-root p": {
                              color: (theme) => theme.palette.common.black,
                            },
                          },
                        },
                        "&:focus-visible": {
                          "& .MuiCard-root": {
                            backgroundColor: (theme) =>
                              theme.palette.primary.light,
                            "& .without_hover ": {
                              display: "none",
                            },

                            "& .with_hover ": {
                              display: "block",
                            },
                            "& .MuiLink-root p": {
                              color: (theme) => theme.palette.common.black,
                            },
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ height: "100%" }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ height: "100%!important" }}
                        >
                          <Box>
                            <NextLazyLoadImage
                              src={findLastObject?.image_path}
                              className="without_hover"
                              sx={{
                                borderRadius: 0,
                                boxShadow: "none",
                                position: "relative!important",
                                width: "50px!important",
                                height: "50px!important",
                              }}
                              width={50}
                              height={50}
                              upLgWidth={100}
                              downLgWidth={100}
                              downMdWidth={100}
                              downSmWidth={100}
                              downXsWidth={100}
                              alt={getData?.[0]?.image_path}
                              sizes="(min-width: 0px) and (max-width: 1920px) 40vw"
                              objectFit="contain"
                            />
                            <NextLazyLoadImage
                              className="with_hover"
                              src={findLastObject?.image_path_portrait}
                              sx={{
                                borderRadius: 0,
                                boxShadow: "none",
                                position: "relative!important",
                                width: "50px!important",
                                height: "50px!important",
                              }}
                              width={50}
                              height={50}
                              upLgWidth={100}
                              downLgWidth={100}
                              downMdWidth={100}
                              downSmWidth={100}
                              downXsWidth={100}
                              alt={getData?.[0]?.image_path}
                              sizes="(min-width: 0px) and (max-width: 1920px) 40vw"
                              objectFit="contain"
                            />
                          </Box>
                          <Stack direction="column" spacing={1}>
                            {findLastObject?.GRAND_CHILD?.map(
                              (grandElem, index) => {
                                return (
                                  <Box key={`GRANDCHILD_COUNTRY-${index}`}>
                                    <CustomLink
                                      link={
                                        grandElem?.link_url != null
                                          ? grandElem?.link_url
                                          : "#"
                                      }
                                    >
                                      <Typography
                                        sx={(theme) => ({
                                          color: (theme) =>
                                            theme.palette.common.black,
                                          ":hover": {
                                            color: (theme) =>
                                              `${theme.palette.common.white} !important`,
                                          },
                                          letterSpacing: 0,
                                          ...theme.typography.typography18,
                                          fontWeight: 300,
                                          // fontFamily:
                                          //   grandElem?.class_name == "arabic"
                                          //     ? theme.fontFaces
                                          //       .helveticaNeueBoldArabic
                                          //     : theme.fontFaces
                                          //       .helveticaNeueMedium,
                                          fontFamily: theme.fontFaces.helveticaNeueBoldArabic,

                                          mb: 0,
                                        })}
                                      >
                                        {grandElem?.link_title}
                                      </Typography>
                                    </CustomLink>
                                  </Box>
                                );
                              }
                            )}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </CustomLink> */}
                {/* </Grid> */}
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

Introduction.propTypes = {
  data: PropTypes.array,
  findLastObject: PropTypes.object,
};

export default React.memo(Introduction);
