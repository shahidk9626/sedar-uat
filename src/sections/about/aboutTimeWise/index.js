import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";
import { EffectFade, Mousewheel, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const AboutTimeWise = ({ data = {} }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  const Sliderparams = {
    navigation: false,
    observer: true,
    observeParents: true,
    loop: false,
    mousewheel: {
      releaseOnEdges: true,
    },
    direction: "horizontal",
    breakpoints: {
      576: {
        direction: "vertical",
      },

      // when window width is >= 640px
    },
  };

  const thumbsparam = {
    loop: false,
    observer: true,
    observeParents: true,
    direction: "horizontal",
    breakpoints: {
      // when window width is >= 320px
      0: {
        spaceBetween: 10,
        slidesPerView: 5,
      },
      // when window width is >= 480px
      576: {
        spaceBetween: 10,
        slidesPerView: 5,
        direction: "vertical",
      },
      767: {
        slidesPerView: 4,
        direction: "vertical",
      },
      992: {
        slidesPerView: 5,
        direction: "vertical",
      },
      // when window width is >= 640px
    },
  };

  return (
    <>
      <Box
        component="section"
        id="AboutTimeWise"
        className="AboutTimeWise max1920"
        sx={{ mb: 4, overflow: "hidden" }}
      >
        <Swiper
          {...Sliderparams}
          id="main"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Pagination, EffectFade, Mousewheel, Thumbs]}
          slidesPerView={1}
        >
          {data?.PARENT?.CHILD &&
            data?.PARENT?.CHILD?.length > 0 &&
            data?.PARENT?.CHILD.map((slideContent, index) => {
              return (
                <SwiperSlide
                  key={`TIME_WISE_PARENT_${index}`}
                  virtualIndex={index}
                >
                  <picture>
                    <source
                      media="(max-width: 575.98px)"
                      srcSet={slideContent.image_path_portrait}
                    />
                    <source
                      media="(min-width: 576px) and (max-width: 767.98px)"
                      srcSet={slideContent.image_path_landscape}
                    />
                    <source
                      media="(min-width: 768px) and (max-width: 991.98px)"
                      srcSet={slideContent.image_path_03}
                    />
                    <source
                      media="(min-width: 992px) and (max-width: 1200px)"
                      srcSet={slideContent.image_path_02}
                    />
                    <source
                      media="(min-width: 1201px) and (max-width: 1400px)"
                      srcSet={slideContent.image_path_01}
                    />
                    <img
                      src={slideContent.image_path}
                      alt={slideContent.image_alt_seo}
                      className="imsg"
                      width="auto"
                      height="auto"
                    />
                  </picture>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div id="thumbs">
          <Swiper
            {...thumbsparam}
            spaceBetween={5}
            slidesPerView={5}
            onSwiper={setThumbsSwiper}
            className="gallery-thumbs"
          >
            {data?.PARENT?.CHILD &&
              data?.PARENT?.CHILD?.length > 0 &&
              data?.PARENT?.CHILD.map((slideContent, index) => {
                return (
                  <SwiperSlide
                    width={500}
                    key={`TIME_WISE_CHILDREN-${index}`}
                    virtualIndex={index}
                  >
                    <div>{slideContent?.title}</div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div
          className="overly-color"
          style={{
            zIndex: 1,
            width: "40%",
            right: "0",
            left: "auto",
            background: "transparent",
          }}
        ></div>
      </Box>
    </>
  );
};

AboutTimeWise.propTypes = {
  data: PropTypes.object,
};


export default AboutTimeWise;
