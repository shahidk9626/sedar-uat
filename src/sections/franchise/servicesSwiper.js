import { useAuthContext } from "@/auth/useAuthContext";
import CircleLoader from "@/components/circleLoader";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ServicesSwiper = ({ data = [] }) => {
  const { state } = useAuthContext();
  const { locale } = useRouter();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [hoverButtons, setHoverButtons] = React.useState(false);
  const [animation, setAnimation] = React.useState("all 0.2s");
  const [progress, setProgress] = React.useState(0);

  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);
  const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    navigation: {
      nextEl: "#Category #categoryNext",
      prevEl: "#Category #categoryPrev",
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 1,
      },
      680: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      9802: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3.5,
      },
    },
  };

  return (
    <>
      <Box
        component="div"
        id="Category"
        sx={{
          ...(themeDirection === "rtl" && {
            direction: "rtl!important",
          }),
        }}
      >
        <Swiper
          key={`${swiperDir}-${updateKey}`}
          {...sliderSettings}
          dir={swiperDir}
          spaceBetween={30}
          loop={true}
          onSlideNextTransitionEnd={(swiper) => {
            let currentItem = swiper.activeIndex + 3;

            let average = (currentItem / data?.length) * 100;
            setProgress(Math.abs(average));
          }}
          onSlidePrevTransitionEnd={(swiper) => {
            let currentItem = swiper.activeIndex;
            let average = (currentItem / data?.length) * 100;
            setProgress(Math.abs(average));
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={`SWIPERSLIDE_HOVER-${index}`}>
              <Box
                sx={{ position: "relative" }}
                onMouseOver={() => setHoverButtons(index)}
                onMouseOut={() => setHoverButtons(false)}
                width="100%"
                height="100%"
              >
                <NextLazyLoadImage
                  src={item?.image_path}
                  alt="home"
                  width={283}
                  height={293}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "cover!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                  objectFit="contain"
                  upLgWidth={283}
                  downLgWidth={283}
                  downMdWidth={283}
                  downSmWidth={301}
                  downXsWidth={386}
                />

                <Box
                  p={2}
                  sx={(theme) => ({
                    display: hoverButtons === index ? "block" : "none",
                    position: "absolute",
                    cursor: "default",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.palette.primary.light,
                  })}
                >
                  <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                    sx={(theme) => ({
                      "& h4": {
                        letterSpacing: 0,
                        ...theme.typography.h4,
                        fontWeight: 400,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        m: 0,
                        color: theme.palette.common.black,
                      },
                      "& p": {
                        ...theme.typography.typography17,
                        color: theme.palette.common.black,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        letterSpacing: 0,
                        fontWeight: 200,
                        marginBlockStart: "8px!important",
                        marginBlockEnd: "8px!important",
                      },
                    })}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Stack
          direction={"row"}
          pt={4}
          spacing={2}
          width={"100%"}
          justifyContent={"end"}
          display={{
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
            xxs: "none",
          }}
        >
          <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            id="categoryPrev"
            sx={{
              cursor: "pointer",
              ...(themeDirection === "rtl" && {
                direction: "rtl!important",
                pl: 1,
              }),
            }}
          >
            <CircleLoader
              action={-1}
              animation={animation}
              progress={progress}
              activeColor="#ccc"
              color="#FDCC5D"
            />
          </Box>
          <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            id="categoryNext"
            sx={{
              cursor: "pointer",
              ...(themeDirection === "rtl" && {
                direction: "rtl!important",
              }),
            }}
          >
            <CircleLoader
              action={1}
              animation={animation}
              progress={progress}
              activeColor="#FDCC5D"
              color="#ccc"
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

ServicesSwiper.propTypes = {
  data: PropTypes.array,
};

export default ServicesSwiper;
