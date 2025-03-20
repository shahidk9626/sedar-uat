import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RealtySwiper = ({ data = [] }) => {
  const { state } = useAuthContext();
  const { locale } = useRouter()
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [swiperDir, setSwiperDir] = useState(themeDirection === "rtl" ? "rtl" : "ltr");
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);
  return (
    <>
      <Swiper
        key={`${swiperDir}-${updateKey}`}
        dir={swiperDir}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Box>
              <NextLazyLoadImage
                src={item?.image_path}
                alt="home"
                width={362}
                height={283}
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "cover!important",
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                objectFit="contain"
                upLgWidth={362}
                downLgWidth={362}
                downMdWidth={362}
                downSmWidth={362}
                downXsWidth={362}
              />
            </Box>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: item?.description,
              }}
              sx={(theme) => ({
                "& h2": {
                  letterSpacing: 0,
                  ...theme.typography.typography49,
                  fontWeight: "normal",
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  color: theme.palette.common.black,
                  mb: 2,
                },
                "& h1": {
                  letterSpacing: 0,
                  ...theme.typography.typography49,
                  fontWeight: "normal",
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  color: theme.palette.common.black,
                  mb: 4,
                },
                "& p": {
                  ...theme.typography.typography45,
                  fontFamily: theme.fontFaces.helveticaNeueLight,
                  letterSpacing: 0.5,
                  color: theme.palette.common.black,
                  fontWeight: 400,
                  marginBlockStart: "8px!important",
                  marginBlockEnd: "8px!important",
                },
              })}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};


RealtySwiper.propTypes = {
  data: PropTypes.array,

};


export default RealtySwiper;
