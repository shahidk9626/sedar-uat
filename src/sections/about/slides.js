import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Slider from "react-slick";

export default function Slides({ data = {} }) {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const settings = {
    dots: true,
    infinite: data?.PARENT?.CHILD?.length < 3 ? false : true,
    speed: 500,
    arrows: false,
    slidesToShow: data?.PARENT?.CHILD?.length < 3 ? 2 : 3,
    slidesToScroll: 2,
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
    <Box my={8} mt={{ lg: 3, md: 3, sm: 40, xs: 40, xxs: 40 }}>
      <Slider {...settings}>
        {data?.PARENT?.CHILD?.map((elem, index) => {
          return (
            <Box
              component="div"
              pt={4}
              key={`ABOUT_SLIDES-${index}`}
              sx={{ height: "100%" }}
              textAlign="-webkit-center"
            >
              <NextLazyLoadImage
                src={elem?.image_path}
                alt="cdsaas"
                placeholder="blur"
                loading="eager"
                width={80}
                height={357}
                sx={{
                  width: "45%!important",
                  height: "100%!important",
                  objectFit: "contain!important",
                  borderRadius: 0,
                  boxShadow: "none",
                  position: "relative!important",
                  paddingBottom: "20px!important",
                }}
                upLgWidth={239}
                downLgWidth={239}
                downMdWidth={239}
                downSmWidth={164}
                downXsWidth={164}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
              />
              <Box
                component="main"
                sx={{
                  display: langName === "en" ? "none" : "block",
                  textAlign: "center",
                  justifyItems: "center",
                }}
              >
                <Typography
                  component="div"
                  variant="typography18"
                  dangerouslySetInnerHTML={{
                    __html: elem?.description,
                  }}
                  sx={(theme) => ({
                    "& strong": {
                      pl: 2,
                      letterSpacing: 0,
                      fontWeight: "600",
                      fontSize: 21,
                      ...theme.typography.typography25,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                    },
                    "& p": {
                      pl: 2,
                      ...theme.typography.typography16,
                      letterSpacing: 0,
                      fontWeight: 300,
                      lineHeight: 1.8,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      paddingRight: "20px!important",
                      marginBlockStart: "12px!important",
                      marginBlockEnd: "8px!important",
                    },
                  })}
                />
              </Box>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
