import RightArrow from "@/assets/homepage/rightArrow";
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import MobileCategorySkeleton from "@/components/skeleton/homepage/secondary/mobile/category";
import useResponsive from "@/hooks/useResponsive";
import { OverlayBody } from "@/styles/homepage/category";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const MobileCategory = ({ data = [] }) => {
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const isDownMd = useResponsive("down", "md");
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};

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
      sx={{ display: { md: "none", sm: "block", xs: "block", xxs: "block" } }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {data?.[1] &&
            data?.[1]?.SUB_CHILD?.map((item, index) => {
              return (
                <Stack spacing={2} key={`NEW-MOBILE-CATEGORY-${index}`}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      component="p"
                      color={(theme) => theme.palette.common.black}
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      fontSize="20px"
                      fontWeight={400}
                      lineHeight="27px"
                    >
                      {item?.title}
                    </Typography>
                    <CustomLink link={item?.link_url} lang={locale}>
                      <Typography
                        component="p"
                        variant="typography20"
                        color="primary"
                        display="flex"
                        gap="5px"
                        alignItems="center"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        fontWeight={500}
                      >
                        {translate("View_All")}
                        <RightArrow />
                      </Typography>
                    </CustomLink>
                  </Stack>
                  <Box component="div">
                    {isDownMd ? (
                      <Swiper
                        spaceBetween={20}
                        slidesPerView={2}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        key={swiperDir}
                        dir={swiperDir}
                      >
                        {item?.GRAND_CHILD?.map(
                          (categoryItem, categoryIndex) => {
                            return (
                              <SwiperSlide
                                key={`SwiperSlide-MOBILE-ITEM-CATEGORY-${index + 2
                                  }-${categoryIndex}`}
                              >
                                <CustomLink link={categoryItem?.link_url}>
                                  <OverlayBody
                                    component="div"
                                    textAlign={"center"}
                                  >
                                    <Typography
                                      component="p"
                                      variant="typography26"
                                      fontWeight={400}
                                      mb="8%"
                                      color="common.white"
                                      fontFamily={(theme) =>
                                        theme.fontFaces.helveticaNeueMedium
                                      }
                                    >
                                      {categoryItem?.title}
                                    </Typography>
                                  </OverlayBody>
                                  <NextLazyLoadImage
                                    src={categoryItem?.image_path}
                                    alt={categoryItem?.image_path}
                                    sx={{
                                      width: "100%!important",
                                      height: "100%!important",
                                      objectFit: "cover",
                                      backgroundSize: "cover",
                                      aspectRatio: "187 / 263",
                                    }}
                                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                                    width={187}
                                    height={263}
                                    objectFit="cover"
                                    upLgWidth={200}
                                    downLgWidth={200}
                                    downMdWidth={200}
                                    downSmWidth={200}
                                    downXsWidth={200}
                                  />
                                </CustomLink>
                              </SwiperSlide>
                            );
                          }
                        )}
                      </Swiper>
                    ) : (
                      <MobileCategorySkeleton />
                    )}
                  </Box>
                </Stack>
              );
            })}
        </Stack>
      </Container>
    </Box>
  );
};

MobileCategory.propTypes = {
  data: PropTypes.array,
};

export default MobileCategory;
