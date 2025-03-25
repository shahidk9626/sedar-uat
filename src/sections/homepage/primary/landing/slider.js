import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import Slider from "react-slick";
import CountryCard from "./countryCard";
import Introduction from "./introduction";
import React, { useMemo } from "react";

LandingPageSlider.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function LandingPageSlider({ data, swiperInstance, isLanding }) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const findLastObject = data?.PARENT?.CHILD?.[3]?.SUB_CHILD?.at(-1);
  const sliderItems = useMemo(() => data?.PARENT?.CHILD?.[2]?.SUB_CHILD || [], [data]);
  return (
    <Box position="relative">
      <Slider {...settings}>
        {sliderItems.map((elem, index) => (
          <Box
            component="div"
            key={index}
            sx={{
              width: "100vw",
              height: "100%",
              position: "relative",
              display: "block!important",
            }}
          >
            <NextLazyLoadImage
              src={elem?.image_path}
              alt={elem?.image_path}
              width={1200}
              height={400}
              sx={{
                width: "100%!important",
                height: "100dvh!important",
                objectFit: "cover!important",
                backgroundSize: "cover!important",
              }}
              objectFit="contain"
              upLgWidth={1600}
              downLgWidth={1400}
              downMdWidth={800}
              downSmWidth={800}
              downXsWidth={800}
            />
          </Box>
        ))}
      </Slider>
      <Box
        sx={{
          display: {
            lg: "none",
            md: "block",
            sm: "block",
            xs: "block",
            xxs: "block",
          },
          position: "absolute",
          top: "0",
          height: "100%",
          width: "100%",
          backgroundColor: (theme) => ({
            lg: "none",
            md: alpha(theme.palette.common.black, 0.4),
            sm: alpha(theme.palette.common.black, 0.4),
            xs: alpha(theme.palette.common.black, 0.4),
            xxs: alpha(theme.palette.common.black, 0.4),
          }),
        }}
      >
        <Stack
          px={3}
          pt={2}
          pb={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <NextLazyLoadImage
              src={data?.PARENT?.CHILD[1]?.image_path}
              alt={data?.PARENT?.CHILD[1]?.image_path}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
              objectFit="cover"
              width={100}
              height={200}
              sx={{
                width: "80px!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              upLgWidth={120}
              downLgWidth={120}
              downMdWidth={120}
              downSmWidth={120}
              downXsWidth={120}
            />
          </Box>
          <Box>
            <a
              href={
                (data?.PARENT?.CHILD?.length > 0 &&
                  data?.PARENT?.CHILD.length &&
                  data?.PARENT?.CHILD[0]?.SUB_CHILD &&
                  data?.PARENT?.CHILD[0]?.SUB_CHILD?.length > 0 &&
                  data?.PARENT?.CHILD[0]?.SUB_CHILD[0]?.link_url) ||
                ""
              }
            >
              <Iconify
                width={30}
                icon="material-symbols:call"
                sx={{ color: (theme) => theme.palette.common.white }}
              />
            </a>
          </Box>
        </Stack>

        <Box
          textAlign="center"
          my={{ sm: 8, xs: 8, xxs: 4 }}
          mb={2}
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          <Typography
            component="h1"
            sx={(theme) => ({
              letterSpacing: 0,
              color: theme.palette.common.white,
              ...theme.typography.typography32,
              fontWeight: "normal",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              mb: 0,
              lineHeight: 0.9,
            })}
          >
            {data?.PARENT?.CHILD?.[1]?.title || ""}
          </Typography>

          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.CHILD?.[1]?.description,
            }}
            sx={(theme) => ({
              "& h1": {
                letterSpacing: 0,
                color: theme.palette.common.white,
                ...theme.typography.typography32,
                fontWeight: "normal",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                mb: 0,
                lineHeight: 0.9,
              },
              "& h2": {
                ...theme.typography.typography28,
                color: theme.palette.common.white,
                letterSpacing: 1,
                lineHeight: 1.2,
                fontWeight: 400,
                fontFamily: theme.fontFaces.helveticaNeue,
                marginBlockStart: "8px!important",
                marginBlockEnd: "8px!important",
              },
            })}
          />
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: { sm: "50%", xs: "50%", xxs: "55%" },
            px: 2,
          }}
        >
          <Box component="div">
            <Grid container spacing={1.5} justifyContent="center">
              {data?.PARENT?.CHILD[3]?.SUB_CHILD?.map((elem, index) => (
                <Grid
                  item
                  sm={4}
                  xs={6}
                  xxs={6}
                  key={`${index}-${elem.image_path}`}
                >
                  <CountryCard
                    elem={elem}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            lg: "block",
            md: "none",
            sm: "none",
            xs: "none",
            xxs: "none",
          },
          position: "absolute",
          top: "0",
          height: "100%",
          width: "100%",
        }}
      >
        <Introduction
          findLastObject={findLastObject}
          data={data?.PARENT}
          swiperInstance={swiperInstance}
        />
      </Box>
    </Box>
  );
}
