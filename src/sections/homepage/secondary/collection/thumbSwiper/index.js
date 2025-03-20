import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomerSwiper } from "@/styles/homepage/collection";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

const ThumbSwiper = ({
  data = [],
  thumbsSwiper = null,
  setProgress = () => { },
}) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale } = useRouter();
  const { themeDirection } = cookies || {};
  const collectionslider = {
    loop: true,
    autoHeight: false,
    navigation: {
      nextEl: "#NewCollection #collectionNext",
      prevEl: "#NewCollection #collectionPrev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        initialSlide: 1,
      },
      992: {
        initialSlide: 1,
      },
    },
    effect: "slide",
    initialSlide: 1,
    observer: true,
    observeParents: true,
    loopAdditionalSlides: 1,
  };

  // State to track the Swiper direction
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );

  // Update the swiper direction whenever themeDirection changes
  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
  }, [themeDirection, locale]);

  return (
    <Box
      component="div"
      sx={{
        position: "relative",
      }}
    >
      <CustomerSwiper
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideNextTransitionEnd={(swiper) => {
          let currentItem = swiper.activeIndex - 2;
          let average = (currentItem / data?.length) * 100;
          setProgress(Math.abs(average));
        }}
        onSlidePrevTransitionEnd={(swiper) => {
          let currentItem = swiper.activeIndex;
          let average = (currentItem / data?.length) * 100;
          setProgress(Math.abs(average));
        }}
        {...collectionslider}
        className={
          data && data.length > 1
            ? `offerCollectionSlider multislide`
            : `offerCollectionSlider`
        }
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        key={swiperDir}
        dir={swiperDir}
      >
        {data &&
          data?.length > 0 &&
          data.map((item, index) => {
            return (
              <SwiperSlide key={`${index + 2}-CHILD-COLLECTIONS-${index}`}>
                <NextLazyLoadImage
                  //src={item?.image_path}
                  src={item && item?.image_path ? item?.image_path : 'assets/loading_image/lazyLoadImage.svg'}
                  alt={item?.link_title}
                  width={421}
                  height={584}
                  placeholder="blur"
                  loading="eager"
                  sx={{
                    width: "auto",
                    ml: "auto",
                    height: "auto",
                    objectFit: "contain!important",
                  }}
                  upLgWidth={421}
                  downLgWidth={421}
                  downMdWidth={240}
                  downSmWidth={400}
                  downXsWidth={300}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                />
              </SwiperSlide>
            );
          })}
      </CustomerSwiper>
    </Box>
  );
};

ThumbSwiper.propTypes = {
  data: PropTypes.array,
  thumbsSwiper: PropTypes.object,
  setProgress: PropTypes.func,
};

export default ThumbSwiper;
