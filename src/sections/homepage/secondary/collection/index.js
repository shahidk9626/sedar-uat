import { useAuthContext } from "@/auth/useAuthContext";
import CircleLoader from "@/components/circleLoader";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {useMemo,useState} from "react";
import React from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MobileCollection } from "../mobileView";
import ThumbSwiper from "./thumbSwiper";

const Collection = ({ data = {} }) => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [animation, setAnimation] = useState("all 0.5s");
  const [progress, setProgress] = useState(0);
  const isDownMd = useResponsive("down", "md");
  const childData = useMemo(() => data?.PARENT?.CHILD || [], [data]);
  return (
    <>
      <MobileCollection data={childData} />
      <Box
        component="div"
        py={4}
        sx={{ display: { md: "block", sm: "none", xs: "none", xxs: "none" } }}
      >
        <Container maxWidth="xl">
          <Box
            component="div"
            width="100%"
            px={{ md: 4, sm: 2, xs: 1, xxs: 1 }}
            id="NewCollection"
          >
            <Grid
              container
              columnSpacing={{ md: 4, sm: 0, xs: 0, xxs: 0 }}
              rowSpacing={{ md: 0, sm: 4, xs: 4, xxs: 4 }}
              alignItems="center"
            >
              <Grid
                item
                lg={5}
                md={5}
                sm={12}
                xs={12}
                xxs={12}
                sx={{ position: "relative" }}
              >
                <Box
                  component="div"
                  sx={{
                    ...(themeDirection === "rtl" && {
                      direction: "rtl!important",
                    }),
                  }}
                >
                  <Swiper
                    key={themeDirection}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={1}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    loop={true}
                    simulateTouch={false}
                    allowTouchMove={false}
                    dir={themeDirection == "rtl" ? "rtl" : "ltr"}
                  >
                    {childData &&
                      childData?.length > 0 &&
                      childData.map((item, index) => {
                        return (
                          <SwiperSlide
                            key={`${index + 2}-PARENT-COLLECTIONS-${index}`}
                          >
                            <Typography
                              component="h6"
                              variant="typography14"
                              sx={{
                                letterSpacing: 1,
                                color: (theme) => theme.palette.grey[1600],
                                fontWeight: 700,
                                textTransform: "uppercase",
                                paddingLeft: "1.5rem!important",
                                borderLeft: (theme) =>
                                  `2px solid ${theme.palette.warning.light}`,
                                mb: 2.5,
                                ...(themeDirection === "rtl" && {
                                  textAlign: "left!important",
                                }),
                              }}
                              fontFamily={(theme) =>
                                theme.fontFaces.helveticaNeue
                              }
                            >
                              {item?.title}
                            </Typography>
                            <Typography
                              component="div"
                              variant="typography17"
                              p="1.5rem"
                              pt="0rem"
                              pb="0.2rem"
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                              sx={{
                                ...(themeDirection === "rtl" && {
                                  textAlign: "left!important",
                                }),
                                "& p": {
                                  fontWeight: "300",
                                  lineHeight: "32px",
                                  fontFamily: (theme) =>
                                    theme.fontFaces.helveticaNeueLight,
                                  color: (theme) => theme.palette.common.black,
                                  letterSpacing: 1,
                                },
                              }}
                            />

                            <Box
                              component="div"
                              sx={{
                                ...(themeDirection === "rtl" && {
                                  display: "grid",
                                  justifyContent: "left!important",
                                }),
                              }}
                            >
                              <CustomLink link={item?.link_url} lang={locale}>
                                <Typography
                                  component="p"
                                  sx={{
                                    borderBottom: (theme) =>
                                      `2px solid ${theme.palette.warning.light}`,
                                    width: "max-content",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "15.4px!important",
                                    letterSpacing: 1,
                                    fontFamily: (theme) =>
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: (theme) => theme.palette.grey[7200],
                                  }}
                                  fontWeight={200}
                                  m="1.5rem"
                                >
                                  {item.link_title}
                                </Typography>
                              </CustomLink>
                            </Box>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </Box>
              </Grid>
              <Grid item lg={6} md={5} sm={12} xs={12} xxs={12}>
                <Box component="div" sx={{ position: "relative", mr: 0 }}>
                  <ThumbSwiper
                    thumbsSwiper={thumbsSwiper}
                    setProgress={setProgress}
                    data={childData}
                  />
                </Box>
              </Grid>
              <Grid item lg={1} md={2} sm={12} xs={12} xxs={12}>
                {!isDownMd && (
                  <Stack spacing={2} height="100%">
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      sx={{ cursor: "pointer" }}
                      id="collectionNext"
                    >
                      <CircleLoader
                        action={1}
                        animation={animation}
                        progress={progress}
                        activeColor="#FDCC5D"
                        color="#ccc"
                      />
                    </Box>
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      id="collectionPrev"
                      sx={{ cursor: "pointer" }}
                    >
                      <CircleLoader
                        action={-1}
                        animation={animation}
                        progress={progress}
                        activeColor="#ccc"
                        color="#FDCC5D"
                      />
                    </Box>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Collection.propTypes = {
  data: PropTypes.array,
};

export default React.memo(Collection);
