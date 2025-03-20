import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const StrengthSwiper = ({ data = {} }) => {
  const [progress, setProgress] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex); // realIndex gives the actual index of the current slide
  };

  const onAutoplayTimeLeft = (s, time, swiperProgress) => {
    setProgress(1 - swiperProgress);
  };

  return (
    <Box position="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {data?.PARENT?.CHILD.map((item, index) => (
          <SwiperSlide key={`STRENGTH-SWIPER-${index}`}>
            <NextLazyLoadImage
              src={item?.image_path}
              alt="home"
              width={1269}
              height={569}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={1269}
              downLgWidth={1269}
              downMdWidth={1269}
              downSmWidth={870}
              downXsWidth={582}
            />
          </SwiperSlide>
        ))}
        <Grid
          container
          spacing={5}
          sx={{
            position: "absolute",
            zIndex: 1,
            bottom: {
              lg: "10%",
              md: "10%",
              sm: "10%",
              xs: "10%",
              xxs: "10%",
            },
          }}
          px={12}
        >
          {data?.PARENT?.CHILD.map((item, index) => (
            <Grid
              item
              lg={3}
              md={3}
              sm={6}
              xs={6}
              xxs={12}
              key={`SLIDER_HOME_AUTO_PROGRESS-${item?.title || index}`} // Ensure a unique key
            >
              <Typography
                sx={(theme) => ({
                  mb: 2,
                  color:
                    currentSlideIndex === index
                      ? theme.palette.common.white
                      : theme.palette.grey[2000],
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                })}
              >
                {item?.title}
              </Typography>
              <LinearProgress
                color="info"
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[2000],
                  "& .MuiLinearProgress-bar1Determinate": {
                    backgroundColor: (theme) => theme.palette.common.white,
                  },
                }}
                variant="determinate"
                value={currentSlideIndex === index ? progress * 100 : 0}
              />
            </Grid>
          ))}
        </Grid>
      </Swiper>
    </Box>
  );
};

StrengthSwiper.propTypes = {
  data: PropTypes.object,
};

export default StrengthSwiper;
