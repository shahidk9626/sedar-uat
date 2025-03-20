import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SliderBox = ({ data = [], index = 0 }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { locale } = useRouter();

  const [swiperDir, setSwiperDir] = useState(themeDirection === "rtl" ? "rtl" : "ltr");
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);

  const BannerSlider = (
    <Box component="section">
      <Swiper
        key={`${swiperDir}-${updateKey}`} // Combine to ensure re-render
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={500}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper"
        autoHeight={true}
        dir={swiperDir}
      >
        {data?.PARENT?.CHILD &&
          data?.PARENT?.CHILD.map((childItem, childIndex) => {
            const isMP4URL = childItem.image_path
              ? childItem?.image_path.split("?")[0]
              : "";
            return (
              <SwiperSlide
                component="div"
                key={`CHILD_SLIDER_INDEX_${index}_${childIndex}`}
              >
                {isMP4URL?.split(".")[3] === "mp4" ? (
                  <Box component="div" className="player-wrapper">
                    <Box
                      component="video"
                      className="react-player"
                      src={isMP4URL ? isMP4URL : ""}
                      display={{
                        md: "block",
                        sm: "none",
                        xs: "none",
                        xxs: "none",
                      }}
                      width="100%"
                      height="100%"
                      playing={true}
                      autoPlay={true}
                      muted={true}
                      controls={false}
                    />
                    <Box
                      component="video"
                      className="react-player"
                      src={childItem.image_path_portrait}
                      display={{
                        md: "none",
                        sm: "block",
                        xs: "block",
                        xxs: "block",
                      }}
                      width="100%"
                      height="100%"
                      playing={true}
                      autoPlay={true}
                      muted={true}
                      controls={false}
                    />
                  </Box>
                ) : (
                  <CustomLink link={childItem.link_url} lang={locale}>
                    <NextLazyLoadImage
                      src={childItem?.image_path}
                      alt={childItem?.image_path}
                      sx={{
                        width: "100%!important",
                        height: "auto!important",
                        objectFit: "cover!important",
                        backgroundRepeat: "no-repeat",
                        display: {
                          md: "block",
                          sm: "none",
                          xs: "none",
                          xxs: "none",
                        },
                      }}
                      width={1000}
                      height={304}
                      placeholder="blur"
                      objectFit="cover"
                      upLgWidth={1400}
                      downLgWidth={1080}
                      downMdWidth={1080}
                      downSmWidth={0}
                      downXsWidth={0}
                    />
                    <NextLazyLoadImage
                      src={childItem?.image_path_portrait}
                      alt={childItem?.image_path_portrait}
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "cover!important",
                        backgroundRepeat: "no-repeat",
                        display: {
                          md: "none",
                          sm: "block",
                          xs: "block",
                          xxs: "block",
                        },
                      }}
                      width={1000}
                      height={304}
                      placeholder="blur"
                      objectFit="cover"
                      upLgWidth={1400}
                      downLgWidth={1400}
                      downMdWidth={1400}
                      downSmWidth={400}
                      downXsWidth={400}
                      sizes="(max-width: 430px) 20vh, (max-width: 768px) 40vh, (max-width: 900px) 60vh, (max-width: 1200px) 80vh, (max-width: 1400px) 80vh, (max-width: 1600px) 80vh, (max-width: 1920px) 80vh"
                    />
                  </CustomLink>
                )}
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
  return BannerSlider;
};

SliderBox.propTypes = {
  data: PropTypes.object || PropTypes.array,
  index: PropTypes.number,
};

export default SliderBox;
