import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Slider from "react-slick";
import WhySedarCollectionMobile from "./whySedarCollectionMobile";


const AboutSedarSlider = ({ data = {} }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box component="div">
      <Box px={2} component="div" my={2}>
        <Box
          component="div"
          my={3}
          sx={{
            borderLeft: (theme) => `2px solid ${theme.palette.primary.light}`,
            pl: 3,
          }}
        >
          <Typography
            component="div"
            letterSpacing={1.5}
            fontSize={30}
            lineHeight={"30px"}
            fontWeight={400}
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            color={(theme) => theme.palette.common.black}
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.title,
            }}
          />
        </Box>
        <Box component="div">
          <Typography
            component="div"
            letterSpacing={1.5}
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            sx={{
              pl: { md: 3, sm: 3, xs: 3, xxs: 3 },
              "& p": {
                fontSize: "26px",
                lineHeight: "39px",
                fontWeight: 400,
                color: (theme) => theme.palette.common.black,
                margin: "0px",
                width: { md: "68%", sm: "100%", xs: "100%", xxs: "100%" },
              },
            }}
            variant="typography38"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
          />
        </Box>
      </Box>
      <Slider {...settings}>
        {data?.PARENT?.CHILD?.map((elem, index) => {
          return (
            <Box key={`WHY_SEDAR-${index}`} component="div">
              <WhySedarCollectionMobile
                image={elem?.image_path}
                description={elem?.description}
                title={elem?.title}
                direction={index % 2 ? "row-reverse" : ""}
              />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

AboutSedarSlider.propTypes = {
  data: PropTypes.object,
};

export default AboutSedarSlider;
