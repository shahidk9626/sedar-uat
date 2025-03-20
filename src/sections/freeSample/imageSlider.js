import { NextFillImage } from "@/components/image";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Slider from "react-slick";


Slides.propTypes = {
  data: PropTypes.array,

};

export default function Slides({ data = [] }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box component="div">
      <Slider {...settings}>
        {data?.map((elem, index) => {
          return (
            <Box component="div" key={`PRODUCT_INSIDE_SLIDES-${index}`}>
              <Box component="div" >
                <NextFillImage
                  src={elem?.SLI_IMAGE_PATH}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "100%!important",
                      height: "100%!important",
                    },
                  }}
                  alt="cdsaas"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Box>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
