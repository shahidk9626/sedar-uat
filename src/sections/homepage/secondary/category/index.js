/* eslint-disable jsx-a11y/alt-text */
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import CategorySkeleton from "@/components/skeleton/homepage/secondary/category";
import useResponsive from "@/hooks/useResponsive";
import { OverlayBody } from "@/styles/homepage/category";
import { TabPanel } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState ,useMemo} from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MobileCategory } from "../mobileView";
import ShortDescription from "../shortDescription";
import Tabs from "./tab";

const Category = ({ data }) => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection, langName } = cookies || {};
  const [animation, setAnimation] = React.useState("all 0.2s");
  const [progress, setProgress] = React.useState(0);
  const [value, setValue] = React.useState(1);
  const isUpMd = useResponsive("up", "md");
  const isDownMd = useResponsive("down", "md");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const swiperSlider = {
    slidesPerView: 3,
    autoHeight: true,
    spaceBetween: 20,
    navigation: {
      nextEl: "#Category #categoryNext",
      prevEl: "#Category #categoryPrev",
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20,
      },

      767: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    observer: true,
    observeParents: true,
  };
  // State to track the Swiper direction
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );

  // Update the swiper direction whenever themeDirection changes
  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
  }, [themeDirection, locale]);

  let text_section = data?.PARENT?.CHILD?.[1].SUB_CHILD ? data?.PARENT?.CHILD[1].SUB_CHILD :  data?.PARENT?.CHILD[0].SUB_CHILD ? data?.PARENT?.CHILD[0]?.SUB_CHILD : [];
  let img_section = data?.PARENT?.CHILD && data?.PARENT?.CHILD[0] && data?.PARENT?.CHILD[0]['SUB_CHILD'] ? data?.PARENT?.CHILD[0]['SUB_CHILD'] : [];
  

  return (
    <>
      <ShortDescription data={data?.PARENT && data?.PARENT?.CHILD[0] ? data?.PARENT?.CHILD[0] : data?.PARENT} />
      {isDownMd && <MobileCategory data={data?.PARENT?.CHILD || []} />}
      {isUpMd && (
        <Box
          sx={{ display: { md: "block", sm: "none", xs: "none", xxs: "none" } }}
        >
          <Tabs
            handleChange={handleChange}
            value={String(value)}
            tabData={data?.PARENT?.CHILD[1].SUB_CHILD ? data?.PARENT?.CHILD[1].SUB_CHILD : data?.PARENT?.CHILD[0].SUB_CHILD }
            keyName="Head-Category"
            animation={animation}
            progress={progress}
          >
            {text_section && 
              text_section?.length > 0 &&
              text_section?.map((item, index) => {
                return (
                  <TabPanel
                    value={String(index + 1)}
                    key={`TAB-PANELS-CHILD-CATEGORIESS-${index}`}
                    sx={{ px: 0, position: "relative" }}
                  >
                    <Box>
                      {isUpMd ? (
                        <>
                          <Box component="div" sx={{ display: "block" }}>
                            <Swiper
                              key={swiperDir}
                              {...swiperSlider}
                              className="mySwiper"
                              onSlideNextTransitionEnd={(swiper) => {
                                let currentItem = swiper.activeIndex + 3;

                                let average =
                                  (currentItem / item?.GRAND_CHILD.length) *
                                  100;
                                setProgress(Math.abs(average));
                              }}
                              onSlidePrevTransitionEnd={(swiper) => {
                                let currentItem = swiper.activeIndex;
                                let average =
                                  (currentItem / item?.GRAND_CHILD.length) *
                                  100;
                                setProgress(Math.abs(average));
                              }}
                              modules={[Navigation]}
                              dir={swiperDir}
                            >
                              {item?.GRAND_CHILD &&
                                item?.GRAND_CHILD?.length > 0 &&
                                item?.GRAND_CHILD.map(
                                  (childItem, childIndex) => {
                                    return (
                                      <SwiperSlide
                                        key={`IMAGE-CATEGORY-${index}-${childIndex}`}
                                        style={{
                                          position: "relative",
                                        }}
                                      >
                                        <CustomLink link={childItem.link_url}>
                                          <OverlayBody component="div">
                                            <Typography
                                              component="p"
                                              variant="typography19"
                                              fontWeight={400}
                                              mb="8%"
                                              color="common.white"
                                              fontFamily={(theme) =>
                                                theme.fontFaces
                                                  .helveticaNeueMedium
                                              }
                                            >
                                              {childItem?.title}
                                            </Typography>
                                          </OverlayBody>
                                          <NextLazyLoadImage
                                            src={childItem && childItem?.image_path ? childItem?.image_path : 'assets/loading_image/lazyLoadImage.svg'}
                                            alt={childItem?.image_path}
                                            width={384}
                                            height={539}
                                            placeholder="blur"
                                            loading="eager"
                                            sx={{
                                              width: "100%!important",
                                              height: "100%!important",
                                              objectFit: "cover!important",
                                              aspectRatio: "441 / 619",
                                            }}
                                            upLgWidth={415}
                                            downLgWidth={300}
                                            downMdWidth={240}
                                            downSmWidth={200}
                                            downXsWidth={180}
                                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                                          />
                                        </CustomLink>
                                      </SwiperSlide>
                                    );
                                  }
                                )}
                            </Swiper>
                          </Box>
                        </>
                      ) : (
                        <CategorySkeleton />
                      )}
                    </Box>
                  </TabPanel>
                );
              })}
          </Tabs>
        </Box>
      )}
    </>
  );
};

Category.propTypes = {
  data: PropTypes.array,
};

export default React.memo(Category);
