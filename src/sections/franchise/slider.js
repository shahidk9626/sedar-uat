import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { FranchiseMediaHeading } from "@/styles/franchise";
import { FranchiseCustomSlider } from "@/styles/franchise/slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

Slides.propTypes = {
  data: PropTypes.object,
};

export default function Slides({ data = {} }) {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: data?.PARENT?.CHILD?.length < 3 ? 1 : 3,
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
    <>
      <Box
        width="100%"
        py={8}
        sx={(theme) => ({ backgroundColor: theme.palette.grey[3200] })}
        pb="30px"
      >
        {data?.PARENT && (
          <FranchiseMediaHeading
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              h2: {
                position: "relative",
                paddingLeft: "25px",
                "::after": {
                  content: "''",
                  width: "100%",
                  borderLeft: {
                    lg: `2px solid ${theme.palette.primary.light}`,
                    md: `2px solid ${theme.palette.primary.light}`,
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                },
              },
              h1: {
                position: "relative",
                paddingLeft: "25px",
                "::after": {
                  content: "''",
                  width: "100%",
                  borderLeft: (theme) =>
                    `2px solid ${theme.palette.primary.light}`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                },
              },
            })}
          />
        )}

        <FranchiseCustomSlider
          {...settings}
          sx={{ borderLeft: "3px solid white" }}
        >
          {data?.PARENT?.CHILD?.map((elem, index) => {
            return (
              <Box component="div" key={`ABOUT_SLIDES-${index}`}>
                <Box
                  component="div"
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
                      width: "50%!important",
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
                    component="div"
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
                          ...theme.typography.typography21,
                          letterSpacing: 0,
                          fontWeight: 300,
                          lineHeight: 1.8,
                          fontFamily: theme.fontFaces.helveticaNeueLight,
                          paddingRight: "20px!important",
                          marginBlockStart: "12px!important",
                          marginBlockEnd: "8px!important",
                          color: theme.palette.common.white,
                        },
                      })}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </FranchiseCustomSlider>
      </Box>
    </>
  );
}
