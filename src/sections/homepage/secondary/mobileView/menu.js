import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import MobileMenuSkeleton from "@/components/skeleton/homepage/mobileMenu";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React,{ useEffect, useState } from "react";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CustomerMenuSwiper = styled(Swiper)(({ theme }) => ({
  "& .swiper-wrapper": {
    paddingBottom: "3rem",
  },
  "& .swiper-pagination-horizontal": {
    width: "100%",
  },
  "& .swiper-pagination-bullet": {
    width: "17px",
    borderRadius: "3px",
    height: "5px",
    background: theme.palette.grey[2100],
  },
  "& .swiper-pagination-bullet-active": {
    width: "17px",
    borderRadius: "3px",
    height: "5px",
    background: theme.palette.common.black,
  },
}));

const MobileMenu = ({ layout, index = 0 }) => {
  const { locale } = useRouter();
  const isDownMd = useResponsive("down", "md");
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const data =
    (layout?.HEADER?.CATEGORIES &&
      layout?.HEADER?.CATEGORIES?.length > 0 &&
      layout?.HEADER?.CATEGORIES) ||
    [];

  // State to track the Swiper direction
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );

  // Update the swiper direction whenever themeDirection changes
  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
  }, [themeDirection, locale]);

  return (
    <>
      <Box
        my={3}
        component="div"
        sx={{
          display: { md: "none", sm: "block", xs: "block", xxs: "block" },
          position: "relative",
        }}
      >
        {!isDownMd ? (
          <Box
            sx={{
              position: "relative",

              width: "100%",
            }}
          >
            <MobileMenuSkeleton />
          </Box>
        ) : (
          <Container maxWidth="lg">
            <CustomerMenuSwiper
              pagination={{
                clickable: true,
              }}
              spaceBetween={30}
              slidesPerView={6}
              modules={[Pagination, Mousewheel]}
              slidesPerGroup={6}
              sx={{
                ...(data &&
                  data?.length < 6 && {
                  "& .swiper-wrapper": {
                    justifyContent: "center",
                  },
                }),
              }}
              breakpoints={{
                0: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                640: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                768: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
                },
                960: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
                },
                1200: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
                },
                1400: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
                },
              }}
              key={swiperDir}
              dir={swiperDir}
            >
              {data &&
                data?.length > 0 &&
                data.map((item, childIndex) => {
                  return (
                    <SwiperSlide
                      key={`MOBILE-MENU-ITEM-${index}-${childIndex}`}
                    >
                      <Stack spacing={1} alignItems="center">
                        <CustomLink link={item?.link_url} lang={locale}>
                          <NextLazyLoadImage
                            src={item?.image_path}
                            alt={item?.title}
                            sx={{
                              width: "100px!important",
                              objectFit: "cover",
                              aspectRatio: "1 / 1",
                            }}
                            width={100}
                            height={100}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                            objectFit="contain"
                            upLgWidth={100}
                            downLgWidth={100}
                            downMdWidth={100}
                            downSmWidth={100}
                            downXsWidth={100}
                          />
                          <Typography
                            component="p"
                            variant="typography14"
                            textTransform="capitalize"
                            textAlign="center"
                            lineHeight="16px"
                            fontWeight={400}
                            color={(theme) => theme.palette.common.black}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                          >
                            {item?.content || ""}
                          </Typography>
                        </CustomLink>
                      </Stack>
                    </SwiperSlide>
                  );
                })}
            </CustomerMenuSwiper>
          </Container>
        )}
      </Box>
    </>
  );
};

MobileMenu.propTypes = {
  data: PropTypes.object || PropTypes.array,
  index: PropTypes.number,
};

export default React.memo(MobileMenu);
