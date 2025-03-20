import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomSwiperArrow from "./arrow";


const sliderSettings = {
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 3,
    },
  },
};

const RelatedStories = ({ data }) => {
  const isDownMd = useResponsive("down", "md");
  const isUpMd = useResponsive("up", "md");

  const memoDesktopRelatedStories = React.useMemo(() => {
    return (
      <CustomSwiperArrow>
        <Typography
          component="p"
          variant="typography28"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
          mb={2}
        >
          {data?.title}
        </Typography>
        <Swiper
          navigation={{
            nextEl: "#relatedStories #relatedStoriesNext",
            prevEl: "#relatedStories #relatedStoriesPrev",
          }}
          slidesPerView={3}
          spaceBetween={30}
          className="mySwiper"
          modules={[Navigation]}
          {...sliderSettings}
        >
          {data?.stories &&
            data?.stories?.length > 0 &&
            data?.stories.map((item, index) => {
              return (
                <SwiperSlide
                  key={`MobileRelated-story-${index}-${item?.title}`}
                >
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        mb: 2,
                      }}
                    >
                      <NextLazyLoadImage
                        src={item?.img_path}
                        alt={item?.title}
                        width={150}
                        height={150}
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "cover!important",
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={150}
                        downLgWidth={150}
                        downMdWidth={150}
                        downSmWidth={150}
                        downXsWidth={150}
                      />
                    </Box>
                    <Typography
                      component="p"
                      variant="typography20"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="typography16"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      sx={{ mb: 1 }}
                    >
                      {item?.subtitle}
                    </Typography>
                  </Box>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </CustomSwiperArrow>
    );
  }, [data?.stories, isUpMd]);

  const memoMobileRelatedStories = React.useMemo(() => {
    return (
      <>
        <Typography
          component="p"
          variant="typography28"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
          mb={2}
        >
          {data?.title}
        </Typography>
        <Grid container rowSpacing={3}>
          {data?.stories &&
            data?.stories?.length > 0 &&
            data?.stories.map((item, index) => {
              return (
                <Grid
                  item
                  sm={12}
                  xs={12}
                  xxs={12}
                  key={`DesktopRelated-story-${index}-${item?.title}`}
                >
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        mb: 2,
                      }}
                    >
                      <NextLazyLoadImage
                        src={item?.img_path}
                        alt={item?.title}
                        width={150}
                        height={150}
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "cover!important",
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={150}
                        downLgWidth={150}
                        downMdWidth={150}
                        downSmWidth={150}
                        downXsWidth={150}
                      />
                    </Box>
                    <Typography
                      component="p"
                      variant="typography20"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="typography16"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      sx={{ mb: 1 }}
                    >
                      {item?.subtitle}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </>
    );
  }, [data?.stories, isDownMd]);

  return (
    <Box sx={{ position: "relative" }} component="div" id="relatedStories">
      {isUpMd && memoDesktopRelatedStories}
      {isDownMd && memoMobileRelatedStories}
    </Box>
  );
};

export default RelatedStories;
