import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

const Partner = ({ data = {} }) => {
  const router = useRouter();
  const [hoverButtons, setHoverButtons] = React.useState(false);
  const { locale } = useRouter();

  const isRu =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ru"
      ? true
      : false;
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.CHILD?.[1]?.SUB_CHILD?.[0]?.description,
            }}
            sx={(theme) => ({
              "& h2": {
                pl: 2,
                mb: 0,
                lineHeight: 1,
                fontWeight: "normal",
                ...theme.typography.typography32,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                color: theme.palette.common.black,
                textAlign: {
                  lg: "center",
                  md: "center",
                  sm: "start",
                  xs: "start",
                  xxs: "start",
                },
              },
              "& p": {
                mt: 0,
                pl: 2,
                textAlign: {
                  lg: "center",
                  md: "center",
                  sm: "start",
                  xs: "start",
                  xxs: "start",
                },
                lineHeight: 1.2,
                ...theme.typography.typography19,
                color: theme.palette.grey[2200],
                fontFamily: theme.fontFaces.helveticaNeueLight,
              },
            })}
          />
        </Box>
        <Grid container spacing={5} justifyContent="center">
          {data?.PARENT?.CHILD[0]?.SUB_CHILD?.map(
            (item, index) => (
              (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  xxs={12}
                  key={`PARTNER-NAMES-${index}`}
                  justifyContent={"center"}
                >
                  <Box
                    mt={5}
                    sx={{ position: "relative" }}
                    onMouseOver={() => setHoverButtons(index)}
                    onMouseOut={() => setHoverButtons(false)}
                  >
                    <NextLazyLoadImage
                      src={item?.image_path}
                      alt={item?.image_path}
                      width={556}
                      height={612}
                      sx={{
                        width: "100%!important",
                        height: "auto!important",
                        objectFit: "cover!important",
                      }}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                      objectFit="contain"
                      upLgWidth={556}
                      downLgWidth={556}
                      downMdWidth={556}
                      downSmWidth={810}
                      downXsWidth={518}
                    />
                    {isRu ? (
                      <Box
                        p={10}
                        sx={(theme) => ({
                          display: hoverButtons === index ? "block" : "none",
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: theme.palette.grey[3300],
                        })}
                      >
                        <Typography
                          component="div"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                          sx={(theme) => ({
                            "& p": {
                              mt: 0,
                              pl: 2,
                              textAlign: {
                                lg: "center",
                                md: "center",
                                sm: "start",
                                xs: "start",
                                xxs: "start",
                              },
                              letterSpacing: 0,
                              ...theme.typography.typography22,
                              fontWeight: theme.typography.fontWeightLight,
                              textAlign: "center",
                              fontFamily: theme.fontFaces.helveticaNeueMedium,
                              color: theme.palette.common.white,
                            },
                          })}
                        />
                      </Box>
                    ) : (
                      <Box
                        p={10}
                        sx={(theme) => ({
                          display: hoverButtons === index ? "block" : "none",
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: theme.palette.grey[3300],
                        })}
                      >
                        <Typography
                          pt={{ lg: 7, md: 10, sm: 10, xs: 10, xxs: 10 }}
                          sx={(theme) => ({
                            letterSpacing: 0,
                            ...theme.typography.typography22,
                            fontWeight: theme.typography.fontWeightLight,
                            textAlign: "center",
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                            color: theme.palette.common.white,
                          })}
                        >
                          {item?.title}
                        </Typography>
                        <Typography
                          pt={2}
                          sx={(theme) => ({
                            ...theme.typography.typography18,
                            fontFamily: theme.fontFaces.helveticaNeueLight,
                            letterSpacing: 0,
                            fontWeight: 400,
                            marginBlockStart: "8px!important",
                            marginBlockEnd: "8px!important",
                            lineHeight: 1.9,
                            textAlign: "center",
                            color: theme.palette.common.white,
                            display: {
                              lg: "block",
                              md: "none",
                              sm: "none",
                              xs: "none",
                              xxs: "none",
                            },
                          })}
                        >
                          <Box
                            dangerouslySetInnerHTML={{ __html: item?.description }}
                          />
                          
                        </Typography>
                        <Stack justifyContent={"center"} alignItems={"center"}>
                          <Typography
                            onClick={() => router.push(`${item?.link_url}`)}
                            sx={(theme) => ({
                              ...theme.typography.typography17,
                              fontFamily: theme.fontFaces.helveticaNeueLight,
                              letterSpacing: 0,
                              fontWeight: 400,
                              cursor: "pointer",
                              marginBlockStart: "8px!important",
                              marginBlockEnd: "8px!important",
                              lineHeight: 1.9,
                              textAlign: "center",
                              color: theme.palette.common.white,
                              fontWeight: theme.typography.fontWeightBold,
                              borderBottom: `3px solid ${theme.palette.primary.main}`,
                            })}
                          >
                            {item?.link_title}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: hoverButtons !== index ? "block" : "none",
                      }}
                    >
                      <Typography
                        sx={(theme) => ({
                          position: "absolute",
                          bottom: "45px",
                          ...theme.typography.typography22,
                          pl: { lg: 5, md: 5, sm: 1, xs: 1, xxs: 1 },
                          fontFamily: theme.fontFaces.helveticaNeueBold,
                          letterSpacing: 0,
                          fontWeight: 400,
                          marginBlockStart: "8px!important",
                          marginBlockEnd: "8px!important",
                          lineHeight: 1.9,
                          color: theme.palette.common.white,
                          fontWeight: theme.typography.fontWeightBold,
                        })}
                      >
                        {item?.title}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

Partner.propTypes = {
  data: PropTypes.object,
};

export default Partner;
