import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import React from "react";
import { useTranslation } from "next-i18next";
import MuiCustomButton from "@/components/button/customButton";
import useResponsive from "@/hooks/useResponsive";
import { Swiper, SwiperSlide } from "swiper/react";
const AppliedProducts = ({ data }) => {
  const { t: translate } = useTranslation();
  const isDownMd = useResponsive("down", "md");
  const isUpMd = useResponsive("up", "md");

  const memoDesktopAppliedProducts = React.useMemo(() => {
    return (
      <Stack spacing={4}>
        {data?.stories &&
          data?.stories?.length > 0 &&
          data?.stories.map((item, index) => {
            return (
              <Box key={`related-story-${index}`} sx={{ mb: 3 }}>
                <Typography
                  component="p"
                  variant="typography18"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                  sx={{ mb: 1 }}
                >
                  {item?.title}
                </Typography>
                <Box
                  sx={{
                    mb: 1,
                  }}
                >
                  <NextLazyLoadImage
                    src={item?.img_path}
                    alt={item?.title}
                    width={150}
                    height={150}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={150}
                    downLgWidth={150}
                    downMdWidth={150}
                    downSmWidth={150}
                    downXsWidth={150}
                  />
                </Box>
                <Typography
                  component="p"
                  variant="typography18"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  sx={{ mb: 1 }}
                >
                  {item?.subtitle}
                </Typography>
              </Box>
            );
          })}

        <MuiCustomButton title={translate("ContactUs")} />
      </Stack>
    );
  }, [isUpMd, data?.stories]);

  const memoMobileAppliedProducts = React.useMemo(() => {
    return (
      <Box component="div">
        <Swiper slidesPerView={1.5} spaceBetween={30} className="mySwiper">
          {data?.stories &&
            data?.stories?.length > 0 &&
            data?.stories.map((item, index) => {
              return (
                <SwiperSlide key={`Applied-stories-${index}-${item?.title}`}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      component="p"
                      variant="typography18"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      sx={{ mb: 1 }}
                    >
                      {item?.title}
                    </Typography>
                    <Box
                      sx={{
                        mb: 1,
                      }}
                    >
                      <NextLazyLoadImage
                        src={item?.img_path}
                        alt={item?.title}
                        width={150}
                        height={150}
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "cover!important",
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={150}
                        downLgWidth={150}
                        downMdWidth={150}
                        downSmWidth={150}
                        downXsWidth={150}
                      />
                    </Box>
                    <Typography
                      component="p"
                      variant="typography18"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      sx={{ mb: 1 }}
                    >
                      {item?.subtitle}
                    </Typography>
                  </Box>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>
    );
  }, [isDownMd, data?.stories]);

  return (
    <Box
      my={{ md: 4, sm: 2, xs: 2, xxs: 2 }}
      sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          borderWidth: "0px",
          borderLeftWidth: "1px",
          borderColor: "divider",
          borderStyle: "solid",
          paddingLeft: "40px",
        },
      })}
    >
      <Typography
        component="p"
        variant="typography28"
        fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
        mb={2}
        color="primary"
      >
        {data?.title}
      </Typography>
      {isUpMd && memoDesktopAppliedProducts}
      {isDownMd && memoMobileAppliedProducts}
    </Box>
  );
};

export default AppliedProducts;
