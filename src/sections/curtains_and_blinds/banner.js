import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = ({ data = [] }) => {
  const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 0,
    observer: true,
    observeParents: true,
  };
  return (
    <Swiper
      {...sliderSettings}
      spaceBetween={0}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {data?.CHILD?.map((item, index) => (
        <SwiperSlide key={`SWIPERSLIDE_HOVER-${index}`}>
          <Box>
            <NextLazyLoadImage
              src={item?.image_path}
              alt={item?.image_path}
              width={1269}
              height={357}
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
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Banner.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


export default Banner;
